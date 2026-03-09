import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.98.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

async function findFaqMatch(userMessage: string): Promise<string | null> {
  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data: faqs, error } = await supabase
    .from("faq_entries")
    .select("keywords, answer");

  if (error || !faqs) return null;

  const lowerMsg = userMessage.toLowerCase();
  let bestMatch: { answer: string; score: number } | null = null;

  for (const faq of faqs) {
    const matchCount = faq.keywords.filter((kw: string) => lowerMsg.includes(kw.toLowerCase())).length;
    const score = matchCount / faq.keywords.length;

    if (matchCount >= 1 && score > (bestMatch?.score ?? 0)) {
      bestMatch = { answer: faq.answer, score };
    }
  }

  // Return match only if at least 1 keyword matched and score is decent
  return bestMatch && bestMatch.score >= 0.15 ? bestMatch.answer : null;
}

const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbymhIyzl4oI2YTxumR4lVfIN8GCqUll3d8UdW5pOmhtjtmNd7Z3IWOhBKF3tk4_zBeVCQ/exec';

async function logQuestionToSheet(question: string): Promise<void> {
  try {
    const formBody = new URLSearchParams();
    formBody.append('timestamp', new Date().toISOString());
    formBody.append('question', question);
    
    await fetch(GOOGLE_SHEETS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formBody.toString()
    });
  } catch (error) {
    console.error("Error logging question to sheet:", error);
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Get the latest user message
    const lastUserMessage = [...messages].reverse().find((m: any) => m.role === "user");

    // Log question to Google Sheets
    if (lastUserMessage) {
      logQuestionToSheet(lastUserMessage.content);
    }

    // Check FAQ table first
    if (lastUserMessage) {
      const faqAnswer = await findFaqMatch(lastUserMessage.content);
      if (faqAnswer) {
        const sseData = `data: ${JSON.stringify({
          choices: [{ delta: { content: faqAnswer }, finish_reason: "stop" }]
        })}\n\ndata: [DONE]\n\n`;

        return new Response(sseData, {
          headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
        });
      }
    }

    // No FAQ match — fall back to AI
    const systemPrompt = `You are Jeevan's AI assistant on his portfolio website. You help visitors learn about Jeevan Kumar, a passionate computer science student and developer from Telangana, India.

Key information about Jeevan:
- Email: kjeevankumar944@gmail.com
- Location: Telangana, India
- Skills: Web development, React, TypeScript, Python, and more
- Interests: Building impactful projects, learning new technologies
- Open to: Internships, full-time roles, and collaborations

Be friendly, professional, and concise. If you don't know something specific about Jeevan, suggest they contact him directly. Always be helpful and guide visitors to explore the portfolio sections.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI service unavailable. Please try again later." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat function error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
