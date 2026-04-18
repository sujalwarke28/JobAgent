import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NudgeBanner({ nudgeData }) {
  if (!nudgeData || !nudgeData.showNudge) return null;

  return (
    <div className="mb-8 relative overflow-hidden rounded-xl border border-blue-500/30 bg-gradient-to-r from-blue-900/40 via-gray-900 to-purple-900/40 p-1 shadow-[0_0_30px_rgba(59,130,246,0.15)]">
      {/* Animated glow */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-blue-500/20 blur-[100px] rounded-full animate-pulse"></div>
      
      <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-6 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">AI Match Alert</h3>
            <p className="text-slate-600 text-sm">
              🎯 We found <strong className="text-blue-400">{nudgeData.count} strong matches</strong> perfectly aligned with your skills! Apply now to boost your chances.
            </p>
          </div>
        </div>
        <Link 
          to={`/jobs/${nudgeData.jobs[0]?._id}`}
          className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:scale-105 hover:bg-blue-600 transition-all duration-300 text-slate-900 rounded-lg text-sm font-medium transition-colors shadow-[0_0_15px_rgba(59,130,246,0.4)] whitespace-nowrap"
        >
          View Top Match <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
