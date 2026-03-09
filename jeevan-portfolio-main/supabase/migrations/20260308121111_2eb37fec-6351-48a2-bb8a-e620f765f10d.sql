
CREATE TABLE public.faq_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  keywords TEXT[] NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Allow public read access (no auth needed for portfolio visitors)
ALTER TABLE public.faq_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read FAQ entries"
  ON public.faq_entries
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Seed common questions
INSERT INTO public.faq_entries (keywords, question, answer) VALUES
(ARRAY['name', 'who', 'about', 'jeevan', 'yourself', 'introduce'], 
 'Who is Jeevan?', 
 'K. Jeevan Kumar is a passionate AI Engineer and Computer Vision enthusiast from Telangana, India. He is currently in his final year of B.Tech in AI & Machine Learning at Malla Reddy Institute of Engineering and Technology (MRIET), Hyderabad, with a CGPA of 8.43.'),

(ARRAY['skills', 'technologies', 'tech stack', 'programming', 'languages'], 
 'What are his skills?', 
 'Jeevan is skilled in Python, Machine Learning, Deep Learning, Computer Vision, LLMs, React, TypeScript, and web development. He specializes in AI/ML model development, predictive modeling, and building intelligent systems.'),

(ARRAY['education', 'college', 'university', 'degree', 'study', 'cgpa'], 
 'What is his education?', 
 'Jeevan is pursuing B.Tech in AI & Machine Learning (2022-2026) at MRIET Hyderabad with a CGPA of 8.43/10. He completed his Intermediate MPC at Viswasanthi Junior College and SSC at ZPHS Bhairapuram, both in Telangana, India.'),

(ARRAY['project', 'projects', 'work', 'portfolio', 'built'], 
 'What projects has he built?', 
 'Jeevan has built 3+ AI/ML projects including computer vision applications, security systems, and predictive models. You can explore them in the Projects section of this portfolio!'),

(ARRAY['contact', 'email', 'reach', 'hire', 'connect', 'phone'], 
 'How to contact him?', 
 'You can reach Jeevan at kjeevankumar944@gmail.com, connect on LinkedIn (linkedin.com/in/k-jeevan-kumar-5333b32b8), or check his GitHub (github.com/kjeevankumar). He is open to internships, full-time roles, and collaborations!'),

(ARRAY['internship', 'experience', 'work experience', 'job'], 
 'What is his experience?', 
 'Jeevan has completed AI internships through AICTE and gained hands-on experience in machine learning, deep learning, and computer vision projects. He is actively seeking internship and full-time opportunities.'),

(ARRAY['certification', 'certifications', 'certificate', 'courses'], 
 'What certifications does he have?', 
 'Jeevan holds 6+ certifications including Python Full Course (GeeksforGeeks), Intro to AI (IBM/Coursera), Fundamental AI Concepts (Microsoft), Intro to Data Science (Cisco), Mastering Python (Infosys Springboard), and Project Management Job Simulation (Accenture/Forage).'),

(ARRAY['achievement', 'achievements', 'accomplishment'], 
 'What are his achievements?', 
 'Key achievements include completing multiple AICTE internships, building 3+ AI/ML projects, earning 6+ certifications, teaching 20+ students, and maintaining a strong academic standing with CGPA 8.43.'),

(ARRAY['location', 'where', 'city', 'country', 'place'], 
 'Where is he located?', 
 'Jeevan is based in Telangana, India. He is currently studying in Hyderabad at MRIET.'),

(ARRAY['resume', 'cv', 'download'], 
 'Can I see his resume?', 
 'Yes! You can view or download Jeevan''s resume from the hero section of this portfolio. Look for the resume button at the top of the page.');
