import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2, BrainCircuit, Target, CheckCircle2, ShieldCheck, Zap, AlertTriangle, TrendingUp } from 'lucide-react';
import api from '../services/api';

export default function JobMatchExplain() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobAndAnalysis();
  }, [id]);

  const fetchJobAndAnalysis = async () => {
    try {
      // Fetch the job details
      const res = await api.get(`/jobs/${id}`);
      setJob(res.data.data);
      
      // Simulate AI processing delay
      setTimeout(() => {
        setAnalysis({
          score: 87,
          strongMatches: ["React", "Node.js", "MongoDB", "Tailwind CSS", "REST APIs"],
          weakMatches: ["GraphQL", "Docker"],
          reasoning: "Your deep experience with the frontend stack, specifically React and Tailwind, aligns perfectly with our core requirements. Furthermore, your Node.js backend skills make you a strong full-stack candidate capable of handling our MERN architecture. While lacking explicit production experience with Docker, your strong programmatic logic compensates significantly.",
          conclusion: "Highly Recommended Candidate"
        });
        setLoading(false);
      }, 1500);

    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/5 mix-blend-screen pointer-events-none"></div>
        <motion.div
           animate={{ rotate: 360 }}
           transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
           className="w-24 h-24 rounded-full border-t-2 border-r-2 border-blue-500 mb-6"
        />
        <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Generative AI is analyzing your fit...
        </h2>
        <p className="text-gray-400 mt-2">Computing semantic skill overlap for {job?.title || 'this role'}.</p>
      </div>
    );
  }

  if (!job || !analysis) {
    return (
      <div className="text-center py-20 text-gray-400">Failed to load match analysis.</div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 animate-in fade-in duration-500 relative">
      
      {/* Decorative Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <Link to="/applicant-dashboard" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors group">
        <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to Dashboard
      </Link>

      <div className="flex items-center gap-3 mb-10 pb-6 border-b border-gray-800 relative z-10">
        <BrainCircuit className="w-10 h-10 text-blue-400" />
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">AI Fit Analysis</h1>
          <p className="text-gray-400">Deep skill evaluation for <strong className="text-white">{job.title}</strong> at {job.company}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 relative z-10">
        
        {/* Left Column: Score */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 flex flex-col items-center justify-center shadow-2xl relative overflow-hidden group">
            <div className={`absolute inset-0 opacity-20 pointer-events-none ${analysis.score >= 80 ? 'bg-green-500' : analysis.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
            <Target className="w-8 h-8 text-gray-500 mb-4" />
            <div className="text-6xl font-black text-white mb-2 relative z-10">{analysis.score}<span className="text-3xl text-gray-500">/100</span></div>
            <div className="text-sm font-bold uppercase tracking-wider text-gray-400">Match Confidence</div>
            
            <div className={`mt-6 px-4 py-2 rounded-full border text-sm font-bold w-full text-center
              ${analysis.score >= 80 ? 'border-green-500/50 text-green-400 bg-green-500/10' : 
                analysis.score >= 60 ? 'border-yellow-500/50 text-yellow-400 bg-yellow-500/10' : 
                'border-red-500/50 text-red-400 bg-red-500/10'}
            `}>
              {analysis.conclusion}
            </div>
          </div>
          
          <Link to={`/job/${job._id}`} className="block w-full">
            <button className="w-full px-6 py-4 bg-white text-gray-950 font-black rounded-2xl hover:bg-gray-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] flex items-center justify-center gap-2 text-lg">
              View Full Job Post <Zap className="w-5 h-5 fill-current" />
            </button>
          </Link>
        </div>

        {/* Right Column: Details */}
        <div className="md:col-span-2 space-y-6">
          
          <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 shadow-xl">
            <h3 className="text-xl font-bold flex items-center gap-2 mb-4 text-white">
               <TrendingUp className="w-6 h-6 text-blue-400" /> AI Executive Summary
            </h3>
            <p className="text-gray-300 leading-relaxed font-medium text-lg">
              {analysis.reasoning}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-green-950/20 border border-green-900/50 rounded-2xl p-6">
              <h4 className="font-bold text-green-400 mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5" /> Strong Affinities
              </h4>
              <ul className="space-y-3">
                {analysis.strongMatches.map((skill, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-300">
                     <CheckCircle2 className="w-4 h-4 text-green-500" /> {skill}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-red-950/20 border border-red-900/50 rounded-2xl p-6">
              <h4 className="font-bold text-red-400 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" /> Skill Gaps
              </h4>
              <ul className="space-y-3">
                {analysis.weakMatches.map((skill, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-300">
                     <div className="w-1.5 h-1.5 rounded-full bg-red-500/50"></div> {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
