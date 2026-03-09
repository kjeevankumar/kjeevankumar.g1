import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import ReactMarkdown from 'react-markdown';
import jeevanAvatar from '@/assets/jeevan-avatar.jpg';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

interface AIChatbotProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const AIChatbot: React.FC<AIChatbotProps> = ({ isOpen, setIsOpen }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi! I'm Jeevan's AI assistant. Ask me anything about his skills, projects, or experience!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const streamChat = async (userMessages: Message[]) => {
    const resp = await fetch(CHAT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ messages: userMessages }),
    });

    if (!resp.ok || !resp.body) {
      throw new Error('Failed to connect to AI');
    }

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let textBuffer = '';
    let assistantContent = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      textBuffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = textBuffer.indexOf('\n')) !== -1) {
        let line = textBuffer.slice(0, newlineIndex);
        textBuffer = textBuffer.slice(newlineIndex + 1);

        if (line.endsWith('\r')) line = line.slice(0, -1);
        if (line.startsWith(':') || line.trim() === '') continue;
        if (!line.startsWith('data: ')) continue;

        const jsonStr = line.slice(6).trim();
        if (jsonStr === '[DONE]') break;

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) {
            assistantContent += content;
            setMessages(prev => {
              const last = prev[prev.length - 1];
              if (last?.role === 'assistant' && prev.length > 1) {
                return prev.map((m, i) => 
                  i === prev.length - 1 ? { ...m, content: assistantContent } : m
                );
              }
              return [...prev, { role: 'assistant', content: assistantContent }];
            });
          }
        } catch {
          textBuffer = line + '\n' + textBuffer;
          break;
        }
      }
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      await streamChat(newMessages.slice(1)); // Skip initial greeting
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "Sorry, I'm having trouble connecting. Please try again or contact Jeevan directly at kjeevankumar944@gmail.com" 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center ${isOpen ? 'scale-0' : 'scale-100'}`}
        aria-label="Open AI Chat"
      >
        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
        <span className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-accent rounded-full animate-pulse" />
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-50 w-full sm:w-[380px] sm:max-w-[calc(100vw-3rem)] h-[100dvh] sm:h-auto bg-background border border-border sm:rounded-2xl shadow-2xl transition-all duration-300 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-3 sm:p-4 border-b border-border bg-gradient-to-r from-primary/10 to-accent/10 sm:rounded-t-2xl">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/30">
              <img src={jeevanAvatar} alt="Jeevan" className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">AI Assistant</h3>
              <p className="text-xs text-muted-foreground">Ask me about Jeevan</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-10 h-10 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors"
            aria-label="Close chat"
          >
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Messages */}
        <ScrollArea className="h-[calc(100dvh-140px)] sm:h-[350px] p-3 sm:p-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex-shrink-0 overflow-hidden ${msg.role === 'user' ? 'bg-primary flex items-center justify-center' : 'border border-primary/30'}`}>
                  {msg.role === 'user' ? <User className="w-4 h-4 text-primary-foreground" /> : <img src={jeevanAvatar} alt="Jeevan" className="w-full h-full object-cover" />}
                </div>
                <div className={`max-w-[75%] p-3 rounded-2xl ${msg.role === 'user' ? 'bg-primary text-primary-foreground rounded-tr-sm' : 'bg-secondary text-foreground rounded-tl-sm'}`}>
                  <div className="text-sm prose prose-sm dark:prose-invert max-w-none [&>p]:m-0"><ReactMarkdown>{msg.content}</ReactMarkdown></div>
                </div>
              </div>
            ))}
            {isLoading && messages[messages.length - 1]?.role === 'user' && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-primary/30">
                  <img src={jeevanAvatar} alt="Jeevan" className="w-full h-full object-cover" />
                </div>
                <div className="bg-secondary p-3 rounded-2xl rounded-tl-sm">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="p-3 sm:p-4 border-t border-border">
          <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Jeevan..."
              className="flex-1 rounded-full bg-secondary/50 border-0 focus-visible:ring-1"
              disabled={isLoading}
            />
            <Button type="submit" size="icon" disabled={isLoading || !input.trim()} className="rounded-full bg-primary hover:bg-primary/90">
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AIChatbot;
