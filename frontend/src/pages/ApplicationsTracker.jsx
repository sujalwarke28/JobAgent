import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { Loader2, FileText, ExternalLink, Calendar, MapPin, DollarSign, Sparkles, Building, ChevronRight } from 'lucide-react';

export default function ApplicationsTracker() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await api.get('/applications');
      setApplications(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusVisuals = (status) => {
    switch(status) {
      case 'accepted': 
        return { 
          bg: 'bg-emerald-500/10', 
          text: 'text-emerald-400', 
          border: 'border-emerald-500/20',
          glow: 'shadow-[0_0_15px_rgba(16,185,129,0.15)]'
        };
      case 'rejected': 
        return { 
          bg: 'bg-rose-500/10', 
          text: 'text-rose-400', 
          border: 'border-rose-500/20',
          glow: 'shadow-[0_0_15px_rgba(244,63,94,0.15)]'
        };
      case 'interview': 
        return { 
          bg: 'bg-purple-500/10', 
          text: 'text-purple-400', 
          border: 'border-purple-500/20',
          glow: 'shadow-[0_0_15px_rgba(168,85,247,0.15)]'
        };
      default: 
        return { 
          bg: 'bg-amber-500/10', 
          text: 'text-amber-400', 
          border: 'border-amber-500/20',
          glow: 'shadow-[0_0_15px_rgba(245,158,11,0.15)]'
        };
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-500">
        <Loader2 className="w-12 h-12 animate-spin text-blue-500 mb-6" />
        <p className="animate-pulse tracking-wide font-medium">Fetching your applications...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto pb-12 animate-in fade-in duration-700 slide-in-from-bottom-4">
      <div className="mb-10 text-center md:text-left relative">
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-[80px] pointer-events-none"></div>
        <h1 className="text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">Application <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Journey</span></h1>
        <p className="text-slate-500 text-lg">Track and manage your AI-assisted career opportunities</p>
      </div>

      {applications.length === 0 ? (
        <div className="relative overflow-hidden bg-slate-100/40 backdrop-blur-sm border border-slate-300/50 rounded-3xl p-16 text-center shadow-2xl transition-transform hover:scale-[1.01] duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
          <FileText strokeWidth={1} className="w-24 h-24 text-gray-600 mx-auto mb-6 relative z-10" />
          <h3 className="text-2xl font-semibold text-slate-900 mb-3 relative z-10">No adventures started</h3>
          <p className="text-slate-500 mb-8 max-w-md mx-auto relative z-10 text-lg">Your next great opportunity is out there. Let AI find your perfect match.</p>
          <Link to="/dashboard" className="relative z-10 inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-slate-900 rounded-xl transition-all shadow-lg hover:shadow-blue-500/25 font-medium group text-lg">
            Explore Opportunities <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {applications.map((app, idx) => {
            const visual = getStatusVisuals(app.status);
            return (
              <div 
                key={app._id} 
                className="group relative bg-slate-100/40 backdrop-blur-md border border-slate-300/50 rounded-2xl p-1 md:p-1.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-gray-600/50"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="bg-white rounded-xl p-6 relative overflow-hidden h-full flex flex-col md:flex-row gap-6 items-start md:items-center">
                  
                  {/* Decorative faint glow */}
                  <div className={`absolute top-0 right-0 w-64 h-64 opacity-5 bg-gradient-to-br from-white to-transparent rounded-full blur-3xl pointer-events-none group-hover:opacity-10 transition-opacity`}></div>
                  
                  <div className="flex-grow z-10">
                    <div className="flex items-center justify-between md:justify-start gap-4 mb-3">
                      <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{app.jobId.title}</h3>
                      <span className={`px-4 py-1.5 rounded-full text-xs font-bold border tracking-wider uppercase backdrop-blur-md transition-all ${visual.bg} ${visual.text} ${visual.border} ${visual.glow}`}>
                        {app.status === 'interview' ? 'Interviewing' : app.status}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-blue-400/90 font-medium mb-5 text-lg">
                      <Building className="w-5 h-5" /> {app.jobId.company}
                    </div>
                    
                    <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-500 font-medium">
                      <span className="flex items-center gap-1.5 bg-slate-100/80 px-3 py-1.5 rounded-lg border border-slate-300/50"><Calendar className="w-4 h-4 text-slate-400"/> {new Date(app.appliedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      <span className="flex items-center gap-1.5 bg-slate-100/80 px-3 py-1.5 rounded-lg border border-slate-300/50"><MapPin className="w-4 h-4 text-slate-400"/> {app.jobId.location}</span>
                      <span className="flex items-center gap-1.5 bg-green-900/10 text-green-400/90 px-3 py-1.5 rounded-lg border border-green-500/20"><DollarSign className="w-4 h-4"/> {app.jobId.salary}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto mt-2 md:mt-0 z-10 Shrink-0">
                    <div className="bg-blue-950/20 border border-blue-500/20 px-5 py-3 rounded-xl flex flex-col justify-center relative overflow-hidden group-hover:bg-blue-900/30 transition-colors">
                      <div className="absolute top-0 right-0 p-1 opacity-20"><Sparkles className="w-8 h-8 text-blue-400"/></div>
                      <span className="block text-blue-400/60 text-xs uppercase tracking-wider font-semibold mb-1">AI Alignment</span>
                      <div className="flex items-end gap-1">
                        <span className="text-2xl font-black text-blue-400 leading-none">{app.matchScore}</span>
                        <span className="text-blue-400/80 text-sm font-medium pb-0.5">skills</span>
                      </div>
                    </div>
                    
                    <Link 
                      to={`/job/${app.jobId._id}`}
                      className="px-6 py-3 bg-slate-100 hover:bg-slate-200 border border-gray-600 text-slate-900 rounded-xl flex items-center justify-center gap-2 text-sm font-bold transition-all hover:border-gray-500 hover:shadow-lg"
                    >
                      <span>Full Details</span> <ExternalLink className="w-4 h-4 text-slate-500" />
                    </Link>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
