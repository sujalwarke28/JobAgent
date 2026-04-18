import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Sparkles, BrainCircuit, Rocket, Target, Users, ArrowRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export default function Landing() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const heroY = useTransform(smoothProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);

  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-hidden selection:bg-blue-500/30">
      
      {/* ─── NATIVE SCROLL PROGRESS BAR ─── */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-left z-50"
        style={{ scaleX: smoothProgress }}
      />

      {/* ─── DECORATIVE BACKGROUND ─── */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/10 blur-[150px]" />
        <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[60%] rounded-full bg-blue-900/10 blur-[150px]" />
      </div>

      {/* ─── HERO SECTION ─── */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-20 pb-32 px-4 z-10">
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="text-center max-w-4xl mx-auto flex flex-col items-center"
        >
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/50 border border-gray-700/50 backdrop-blur-md mb-8 shadow-xl"
          >
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Welcome to the Future of Hiring
            </span>
          </motion.div>

          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-tight"
          >
            Find The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-blue-500">Perfect Match</span> <br /> 
            Without The Guesswork.
          </motion.h1>

          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed font-medium"
          >
            JobCopilot leverages cutting-edge generative AI to bridge the gap between brilliant candidates and visionary companies by focusing purely on what matters: <strong className="text-gray-200">skills.</strong>
          </motion.p>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link to="/login">
              <button className="px-8 py-4 bg-white text-gray-950 hover:bg-gray-100 rounded-2xl font-black transition-all shadow-[0_0_40px_rgba(255,255,255,0.15)] flex items-center justify-center gap-2 group text-lg w-full sm:w-auto">
                <Rocket className="w-5 h-5" /> Get Started Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Dashboard Mockup Preview */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5, type: "spring" }}
          className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-full max-w-5xl px-4 hidden md:block"
        >
          <div className="rounded-t-3xl bg-gray-900/80 border-t border-l border-r border-gray-700/50 backdrop-blur-xl shadow-2xl p-4">
            <div className="flex items-center gap-2 mb-4 px-2">
               <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
               <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
               <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <div className="grid grid-cols-3 gap-6 opacity-60 pointer-events-none">
              {[1,2,3].map((i) => (
                <div key={i} className="h-40 rounded-2xl bg-gray-800/50 border border-gray-700/50 p-6">
                   <div className="w-10 h-10 rounded bg-blue-500/20 mb-4"></div>
                   <div className="w-3/4 h-4 rounded bg-gray-700 mb-2"></div>
                   <div className="w-1/2 h-3 rounded bg-gray-700/50"></div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ─── THE PROBLEM SECTION ─── */}
      <section className="relative z-10 py-32 px-4 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <SectionHeader 
             badge="The Flawed Reality" 
             title="The hiring process is broken." 
             subtitle="Traditional recruiting relies on bias, endless scrolling, and vague job descriptions. Both candidates and companies suffer from a massive disconnect."
          />

          <div className="grid md:grid-cols-2 gap-12 mt-16">
            <RevealCard delay={0.1}>
              <div className="p-8 rounded-3xl bg-gray-900 border border-gray-800 h-full">
                <Target className="w-12 h-12 text-rose-400 mb-6" />
                <h3 className="text-2xl font-bold mb-4">For Candidates</h3>
                <ul className="space-y-4">
                  {[
                    "Sending hundreds of applications into the void.",
                    "Getting rejected before a human even reads the resume.",
                    "Struggling to articulate how their exact skills match a role."
                  ].map((text, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-400">
                      <XIcon /> <span>{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealCard>

            <RevealCard delay={0.2}>
              <div className="p-8 rounded-3xl bg-gray-900 border border-gray-800 h-full">
                <Users className="w-12 h-12 text-rose-400 mb-6" />
                <h3 className="text-2xl font-bold mb-4">For Companies</h3>
                <ul className="space-y-4">
                  {[
                    "Drowning in completely unqualified applications.",
                    "Spending hours manually screening candidates.",
                    "Missing hidden gems because of poor keyword filtering."
                  ].map((text, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-400">
                      <XIcon /> <span>{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealCard>
          </div>
        </div>
      </section>

      {/* ─── THE SOLUTION / FEATURES SECTION ─── */}
      <section className="relative z-10 py-32 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-gray-950 pointer-events-none" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <SectionHeader 
             badge="Our Solution" 
             title="AI-Powered Skill Matching" 
             subtitle="We removed the friction. The AI analyzes the candidate's core stack against the company's explicit requirements, creating a perfect symbiosis."
          />

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <FeatureCard 
              icon={<BrainCircuit className="w-8 h-8 text-blue-400" />}
              title="Intelligent Scoring"
              desc="Generative AI grades your exact proficiency against the role in real-time, providing immediate feedback."
              delay={0.1}
            />
            <FeatureCard 
              icon={<ShieldCheck className="w-8 h-8 text-emerald-400" />}
              title="Agnostic Hiring"
              desc="Names and backgrounds come second. Skill logic and exact fit come first, eliminating preliminary bias."
              delay={0.2}
            />
            <FeatureCard 
              icon={<Zap className="w-8 h-8 text-purple-400" />}
              title="Automated Outreach"
              desc="The AI generates personalized, perfect-fit cover letters based on exactly why you match the job."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* ─── CALL TO ACTION ─── */}
      <section className="relative z-10 py-32 px-4 bg-gray-950 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[800px] h-[800px] bg-gradient-to-tr from-blue-600/20 to-purple-600/20 rounded-full blur-[100px]" />
        </div>
        
        <RevealCard delay={0.1}>
          <div className="max-w-4xl mx-auto bg-gray-900/80 border border-gray-700/50 backdrop-blur-xl rounded-[3rem] p-12 md:p-20 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
            <h2 className="text-4xl md:text-5xl font-black mb-6 relative z-10 tracking-tight">
              Ready to reshape your <br/> professional journey?
            </h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto relative z-10 font-medium">
              Join thousands of professionals and forward-thinking companies already using JobCopilot.
            </p>
            <Link to="/login">
              <button className="relative z-10 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-2xl font-bold transition-all shadow-[0_10px_40px_-10px_rgba(59,130,246,0.5)] flex items-center justify-center gap-2 group mx-auto text-lg hover:-translate-y-1">
                Start Your Journey <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </button>
            </Link>
          </div>
        </RevealCard>
      </section>
      
      {/* ─── FOOTER ─── */}
      <footer className="border-t border-gray-800 py-12 px-4 relative z-10 bg-gray-950 text-center text-gray-500 font-medium">
        <p>© {new Date().getFullYear()} JobCopilot AI. Designed for a smarter world.</p>
      </footer>

    </div>
  );
}

// ─── REUSABLE COMPONENTS ─── //

function SectionHeader({ badge, title, subtitle }) {
  return (
    <div className="text-center max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="inline-block px-4 py-1.5 rounded-full bg-gray-800/80 border border-gray-700 text-blue-400 font-bold text-xs uppercase tracking-widest mb-6"
      >
        {badge}
      </motion.div>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ delay: 0.1 }}
        className="text-4xl md:text-5xl font-black mb-6 tracking-tight"
      >
        {title}
      </motion.h2>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ delay: 0.2 }}
        className="text-lg text-gray-400 leading-relaxed font-medium"
      >
        {subtitle}
      </motion.p>
    </div>
  )
}

function RevealCard({ children, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay, type: "spring", bounce: 0.3 }}
      className="h-full"
    >
      {children}
    </motion.div>
  );
}

function FeatureCard({ icon, title, desc, delay }) {
  return (
    <RevealCard delay={delay}>
      <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 hover:border-gray-600 transition-colors h-full flex flex-col items-center text-center group">
        <div className="w-16 h-16 rounded-2xl bg-gray-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
        <p className="text-gray-400 leading-relaxed font-medium">{desc}</p>
      </div>
    </RevealCard>
  )
}

function XIcon() {
  return (
    <div className="bg-rose-500/10 p-1 rounded mt-0.5 shrink-0">
      <XCircleIcon className="w-4 h-4 text-rose-400" />
    </div>
  )
}

function XCircleIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
    </svg>
  )
}
