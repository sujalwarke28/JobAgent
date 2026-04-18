import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, BrainCircuit, Rocket, Target, Users, ArrowRight, FileText, CheckCircle2, Search } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-500/20 font-sans overflow-x-hidden">
      
      {/* ─── NATIVE HERO BACKGROUND ─── */}
      <div className="absolute top-0 inset-x-0 h-[80vh] bg-gradient-to-b from-blue-50/50 to-transparent pointer-events-none -z-10" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[120px] pointer-events-none -z-10 mix-blend-multiply" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-purple-400/10 rounded-full blur-[100px] pointer-events-none -z-10 mix-blend-multiply" />

      {/* ─── HERO SECTION ─── */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/50 border border-blue-200/50 text-blue-700 text-sm font-semibold mb-8 backdrop-blur-sm"
        >
          <Sparkles className="w-4 h-4" />
          Powered by Google Gemini AI
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="max-w-4xl text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 mb-6 drop-shadow-sm leading-[1.1]"
        >
          Stop Searching. Let AI Find Your{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Perfect Job Match.
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="max-w-2xl text-lg md:text-xl text-slate-600 mb-10 leading-relaxed font-medium"
        >
          Upload your resume once. Our built-in Gemini AI reads your profile, understands your skills, and instantly matches you with companies looking for exactly what you do.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <Link 
            to="/login" 
            className="group w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/20 flex items-center justify-center gap-2"
          >
             Upload Resume & Match <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a 
            href="#how-it-works"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 font-bold transition-all hover:shadow-sm flex items-center justify-center"
          >
            See How it Works
          </a>
        </motion.div>
      </section>

      {/* ─── HOW IT WORKS (THE WORKFLOW) ─── */}
      <section id="how-it-works" className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">How Jobice Works</h2>
            <p className="text-slate-500 font-medium text-lg max-w-xl mx-auto">Three simple steps to connect you with the right opportunities. No manual form filling required.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative z-10">
             
             {/* Step 1 */}
             <div className="group p-8 rounded-3xl bg-slate-50 border border-slate-200 hover:border-blue-200 hover:bg-blue-50/50 transition-all duration-300 relative overflow-hidden flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <FileText className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">1. Upload Resume</h3>
                <p className="text-slate-600 font-medium leading-relaxed">
                  Sign in securely and drop your PDF resume. Skip the tedious process of typing out your full work history and skills into clunky forms.
                </p>
                <div className="absolute top-4 right-6 text-8xl font-black text-slate-900/5 group-hover:text-blue-600/5 transition-colors -z-10 select-none">1</div>
             </div>

             {/* Step 2 */}
             <div className="group p-8 rounded-3xl bg-slate-50 border border-slate-200 hover:border-purple-200 hover:bg-purple-50/50 transition-all duration-300 relative overflow-hidden flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <BrainCircuit className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">2. AI Skill Extraction</h3>
                <p className="text-slate-600 font-medium leading-relaxed">
                  Our Gemini AI reads your document instantly, automatically understanding and formatting your specific technical stack and experience level.
                </p>
                <div className="absolute top-4 right-6 text-8xl font-black text-slate-900/5 group-hover:text-purple-600/5 transition-colors -z-10 select-none">2</div>
             </div>

             {/* Step 3 */}
             <div className="group p-8 rounded-3xl bg-slate-50 border border-slate-200 hover:border-emerald-200 hover:bg-emerald-50/50 transition-all duration-300 relative overflow-hidden flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">3. Instant Job Matches</h3>
                <p className="text-slate-600 font-medium leading-relaxed">
                  Your personalized dashboard algorithmically curates open job roles, ranking them based on how perfectly they match your AI-extracted profile.
                </p>
                <div className="absolute top-4 right-6 text-8xl font-black text-slate-900/5 group-hover:text-emerald-600/5 transition-colors -z-10 select-none">3</div>
             </div>

          </div>
        </div>
      </section>

      {/* ─── DUAL PORTAL SECTION ─── */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="bg-slate-900 rounded-[3rem] p-8 md:p-16 lg:p-20 relative overflow-hidden shadow-2xl shadow-slate-900/30">
           
           {/* Background Accents */}
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-blue-500/20 to-purple-500/20 rounded-full blur-[100px] pointer-events-none"></div>

           <div className="relative z-10 flex flex-col lg:flex-row gap-16 items-center">
              <div className="flex-1 text-center lg:text-left">
                 <h2 className="text-3xl md:text-4xl font-black text-white mb-6 tracking-tight leading-tight">
                    Hiring? Let AI filter the noise.
                 </h2>
                 <p className="text-slate-300 text-lg font-medium mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                    Jobice provides a dedicated dashboard for employers. Post a job with your required skills, and our AI automatically surfaces candidates who match your exact stack, ranked by percentage.
                 </p>
                 <ul className="space-y-4 mb-10 text-left max-w-md mx-auto lg:mx-0">
                    <li className="flex items-center gap-3 text-slate-200 font-medium bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
                       <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" /> Auto-score candidates percentage-wise.
                    </li>
                    <li className="flex items-center gap-3 text-slate-200 font-medium bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
                       <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" /> Track engagement and views in real-time.
                    </li>
                 </ul>
                 <Link 
                    to="/login"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-lg shadow-blue-600/30"
                  >
                    Login to Post Jobs <Rocket className="w-4 h-4" />
                 </Link>
              </div>

              {/* Decorative Mockup */}
              <div className="flex-1 w-full max-w-md mx-auto relative hidden sm:block">
                 <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl"></div>
                 <div className="relative bg-slate-800 rounded-3xl border border-slate-700 shadow-2xl p-6 flex flex-col gap-4">
                    <div className="h-6 w-1/3 bg-slate-700 rounded-md"></div>
                    <div className="h-4 w-1/4 bg-slate-700 rounded-md mb-2"></div>
                    
                    <div className="flex items-center gap-4 bg-slate-900 p-4 rounded-xl border border-slate-700/50 relative overflow-hidden group">
                       <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 shrink-0"><Search className="w-5 h-5"/></div>
                       <div className="flex-1">
                          <div className="h-4 w-3/4 bg-slate-700 rounded mb-2"></div>
                          <div className="h-3 w-1/2 bg-slate-700 rounded"></div>
                       </div>
                       <div className="px-3 py-1 rounded bg-emerald-500/20 text-emerald-400 text-sm font-black text-right min-w-[80px]">98%</div>
                    </div>
                    
                    <div className="flex items-center gap-4 bg-slate-900 p-4 rounded-xl border border-slate-700/50 relative overflow-hidden group">
                       <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 shrink-0"><Users className="w-5 h-5"/></div>
                       <div className="flex-1">
                          <div className="h-4 w-2/3 bg-slate-700 rounded mb-2"></div>
                          <div className="h-3 w-1/3 bg-slate-700 rounded"></div>
                       </div>
                       <div className="px-3 py-1 rounded bg-emerald-500/20 text-emerald-400 text-sm font-black text-right min-w-[80px]">92%</div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-slate-200 py-12 px-6 bg-slate-50 text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <BrainCircuit className="w-6 h-6 text-blue-600" />
          <span className="text-xl font-black tracking-tight text-slate-900">Jobice.</span>
        </div>
        <p className="text-slate-500 font-medium text-sm">
          Built to make recruiting intelligent, effortless, and fast.
        </p>
      </footer>

    </div>
  );
}
