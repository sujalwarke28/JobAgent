import { Link } from 'react-router-dom';
import { MapPin, DollarSign, Building, Sparkles } from 'lucide-react';

export default function JobCard({ job, showMatchScore = true }) {
  
  const getScoreBadge = (score) => {
    if (score >= 4) return "bg-green-500/20 text-green-400 border border-green-500/50";
    if (score === 3) return "bg-yellow-500/20 text-yellow-400 border border-yellow-500/50";
    if (score === 2) return "bg-blue-500/20 text-blue-400 border border-blue-500/50";
    return "bg-slate-200 text-slate-600";
  };

  return (
    <div className="bg-slate-100 rounded-xl p-6 border border-slate-300 hover:border-gray-500 transition-colors shadow-lg flex flex-col h-full relative overflow-hidden group">
      {/* Decorative gradient blob */}
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-2xl group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all"></div>
      
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div>
          <h3 className="text-xl font-semibold text-slate-900 mb-1">{job.title}</h3>
          <div className="flex items-center text-slate-500 gap-4 text-sm mt-2">
            <span className="flex items-center gap-1"><Building className="w-4 h-4"/> Confidential Company</span>
            <span className="flex items-center gap-1"><MapPin className="w-4 h-4"/> {job.location}</span>
          </div>
        </div>
        {showMatchScore && job.matchScore !== undefined && (
          <div className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${getScoreBadge(job.matchScore)}`}>
            <Sparkles className="w-3 h-3" />
            {job.matchScore} / {job.requiredSkills?.length || 5} Match
          </div>
        )}
      </div>
      
      <div className="mt-4 flex-grow relative z-10">
        <p className="text-slate-500 text-sm line-clamp-2">{job.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {job.requiredSkills?.slice(0,4).map(skill => (
            <span key={skill} className="px-2 py-1 bg-white text-slate-600 rounded text-xs border border-slate-300">
              {skill}
            </span>
          ))}
          {job.requiredSkills?.length > 4 && (
            <span className="px-2 py-1 bg-white/50 text-slate-400 rounded text-xs">+{job.requiredSkills.length - 4}</span>
          )}
        </div>
      </div>
      
      <div className="mt-6 flex items-center justify-between relative z-10 border-t border-slate-300 pt-4">
        <span className="flex items-center text-slate-600 font-medium gap-1">
          <DollarSign className="w-4 h-4 text-green-400" />
          {job.salary}
        </span>
        <Link 
          to={`/job/${job._id}`}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-slate-900 rounded-lg text-sm font-medium transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
