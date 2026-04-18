import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import JobCard from '../components/JobCard';
import NudgeBanner from '../components/NudgeBanner';
import { Loader2, Briefcase, Target } from 'lucide-react';

export default function ApplicantDashboard() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [nudgeData, setNudgeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const suggestionsRes = await api.get('/jobs/suggestions');
      setJobs(suggestionsRes.data.data);
      
      const nudgeRes = await api.get('/jobs/nudge');
      setNudgeData(nudgeRes.data.data);
      
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && jobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-slate-500">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full"></div>
          <Loader2 className="w-12 h-12 animate-spin text-blue-500 relative z-10" />
        </div>
        <p className="text-lg font-medium">Crunching your skills and finding matches...</p>
      </div>
    );
  }

  const needsSetup = !user.skills || user.skills.length === 0;

  return (
    <div className="animate-in fade-in duration-500 max-w-7xl mx-auto py-8 px-4">
      {needsSetup && (
        <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-blue-500/30 p-8 rounded-3xl mb-10 shadow-[0_0_30px_rgba(59,130,246,0.15)] relative text-center">
          <h2 className="text-2xl font-black mb-3 text-slate-900">Unlock AI-Driven Opportunities</h2>
          <p className="text-slate-600 leading-relaxed max-w-2xl mx-auto">
            We need to know what you're good at! Go to your Profile page, configure your details, or simply upload your Resume so our AI can extract your skills automatically.
          </p>
        </div>
      )}

      {nudgeData && nudgeData.count >= 2 && !needsSetup && (
        <div className="mb-10">
          <NudgeBanner nudgeData={nudgeData} />
        </div>
      )}

      {!needsSetup && (
        <>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Briefcase className="w-6 h-6 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Top AI Recommendations</h2>
            </div>
            <div className="text-sm font-medium text-slate-400 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
              Auto-refreshes based on your skills
            </div>
          </div>
          
          {jobs.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-3xl p-16 text-center shadow-xl">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-10 h-10 text-gray-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">No strong matches yet</h3>
              <p className="text-slate-500 max-w-md mx-auto">We couldn't find roles that perfectly align with your exact skill stack right now. Try updating your profile or check back later as new roles are posted continuously.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map(job => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
