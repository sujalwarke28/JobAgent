import { useState, useEffect } from 'react';
import api from '../services/api';
import { Loader2, Users, Briefcase, Plus, Search, CheckCircle2, XCircle, Settings, Eye, MousePointerClick, TrendingUp, Presentation, Building2, Pencil, Sparkles, Trash2 } from 'lucide-react';
import CreateJobModal from '../components/CreateJobModal';
import ProfileSetupModal from '../components/ProfileSetupModal';
import { useAuth } from '../contexts/AuthContext';

export default function AdminDashboard() {
  const { user, setUser } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [loadingCandidates, setLoadingCandidates] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [selectedJobToEdit, setSelectedJobToEdit] = useState(null);


  useEffect(() => {
    fetchJobs();
  }, []);

  const handleProfileUpdate = async (profileData) => {
    setIsUpdatingProfile(true);
    try {
      const res = await api.put('/auth/profile', profileData);
      setUser(res.data.data);
      setIsProfileModalOpen(false);
    } catch (err) {
      console.error(err);
      alert('Failed to update profile');
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const fetchJobs = async () => {
    try {
      const res = await api.get('/jobs');
      // For a company, this normally fetches *their* jobs, but we use the global endpoint in this demo scope.
      // Assuming api returns array of jobs
      setJobs(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleApplicants = async (job) => {
    if (selectedJob?._id === job._id) {
      setSelectedJob(null);
      setCandidates([]);
      setSelectedCandidate(null);
      return;
    }
    setLoadingCandidates(true);
    setSelectedJob(job);
    setSelectedCandidate(null);
    try {
      const res = await api.get(`/applications/job/${job._id}`);
      setCandidates(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingCandidates(false);
    }
  };

  const updateApplicationStatus = async (appId, status) => {
    try {
      await api.put(`/applications/${appId}`, { status });
      setCandidates(prev => prev.map(a => a._id === appId ? { ...a, status } : a));
      if (selectedCandidate && selectedCandidate._id === appId) {
        setSelectedCandidate(prev => ({...prev, status}));
      }
    } catch (err) {
      console.error(err);
      alert('Failed to update status');
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job posting?")) return;
    try {
      await api.delete(`/jobs/${jobId}`);
      setJobs(jobs.filter(j => j._id !== jobId));
      if (selectedJob?._id === jobId) {
        setSelectedJob(null);
        setSelectedCandidate(null);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete job");
    }
  };

  const viewResume = async (appId) => {
      window.open(`http://localhost:5050/api/applications/${appId}/resume`, '_blank');
  };

  const downloadResume = async (appId, name) => {
      try {
        const response = await fetch(`http://localhost:5050/api/applications/${appId}/resume`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        if (!response.ok) throw new Error('Resume fetch failed');
        const blob = await response.blob();
        if (blob.type !== 'application/pdf') throw new Error('Not a pdf');
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `${name || 'resume'}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      } catch (err) {
          alert('Could not download resume');
      }
  };

  const handleCreateJob = async (jobData) => {
    try {
      const res = await api.post('/jobs', jobData);
      setJobs([res.data.data, ...jobs]);
      setIsCreateModalOpen(false);
    } catch (err) {
      console.error(err);
      alert('Failed to create job');
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-gray-400">
        <Loader2 className="w-12 h-12 animate-spin text-purple-500 mb-4" />
        <p className="text-lg font-medium">Loading Employer Command Center...</p>
      </div>
    );
  }

  // Stable mock metrics based on job ID string
  const getMockMetrics = (job) => {
    const seed = job._id ? job._id.charCodeAt(job._id.length - 1) : 50;
    return {
      views: (seed * 13) % 400 + 150,
      interactions: (seed * 7) % 150 + 40,
      saves: (seed * 3) % 50 + 10
    };
  };

  return (
    <>
      
      {/* Dashboard Header / Context Section */}
      <div className="relative bg-gray-900 border border-gray-800 rounded-3xl p-8 shadow-2xl overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-600/10 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-10 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-600 p-1 shadow-lg">
              <div className="w-full h-full bg-gray-900 rounded-xl flex items-center justify-center">
                <Building2 className="w-10 h-10 text-white" />
              </div>
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold tracking-wider mb-2">
                EMPLOYER COMMAND CENTER
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">
                {user.companyName || 'Company Portal'}
              </h1>
              <p className="text-gray-400 font-medium max-w-xl">
                Manage your active job postings, analyze traction metrics, and review top candidates intelligently filtered by our AI pipeline.
              </p>
            </div>
          </div>
          
          <div className="flex gap-3 w-full md:w-auto flex-col sm:flex-row">
            <button 
              onClick={() => setIsProfileModalOpen(true)}
              className="flex-1 sm:flex-none px-5 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-gray-500 rounded-xl flex justify-center items-center gap-2 text-sm font-bold transition-all text-white shadow-lg"
            >
              <Settings className="w-4 h-4"/> Settings
            </button>
            <button 
              onClick={() => setIsCreateModalOpen(true)}
              className="flex-1 sm:flex-none px-5 py-3 bg-purple-600 border-purple-500 hover:bg-purple-500 rounded-xl flex justify-center items-center gap-2 text-sm font-bold transition-all text-white shadow-lg shadow-purple-500/20"
            >
              <Plus className="w-4 h-4" /> Post New Job
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-gray-800/80 relative z-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400"><Briefcase className="w-6 h-6" /></div>
            <div>
              <p className="text-2xl font-black text-white">{jobs.length}</p>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Active Roles</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400"><Eye className="w-6 h-6" /></div>
            <div>
              <p className="text-2xl font-black text-white">{jobs.reduce((acc, j) => acc + getMockMetrics(j).views, 0)}</p>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Total Pipeline Views</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400"><MousePointerClick className="w-6 h-6" /></div>
            <div>
              <p className="text-2xl font-black text-white">{jobs.reduce((acc, j) => acc + getMockMetrics(j).interactions, 0)}</p>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Interactions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Jobs Feed */}
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-3 text-white mb-6">
          <Presentation className="w-6 h-6 text-purple-400" /> Job Postings & Metrics
        </h2>

        {jobs.length === 0 ? (
          <div className="bg-gray-900 border border-gray-800 rounded-3xl p-16 text-center shadow-xl">
            <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Briefcase className="w-10 h-10 text-gray-600" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No Active Postings</h3>
            <p className="text-gray-400 max-w-md mx-auto mb-6">You currently have no automated AI job streams running. Create a posting to start attracting matching candidates.</p>
            <button onClick={() => setIsCreateModalOpen(true)} className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl shadow-lg transition-colors">
              Create Your First Posting
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Sidebar - Job List & Overview */}
            <div className={`${selectedJob ? 'lg:w-[400px] shrink-0' : 'w-full'} space-y-4 transition-all duration-500`}>
              {jobs.map((job) => {
                const metrics = getMockMetrics(job);
                const isExpanded = selectedJob?._id === job._id;
                
                return (
                  <div key={job._id} className={`bg-gray-900 border transition-all duration-300 rounded-2xl overflow-hidden shadow-lg ${isExpanded ? 'border-purple-500 shadow-purple-500/10' : 'border-gray-800 hover:border-gray-600'}`}>
                    
                    {/* Job Overview Card */}
                    <div className="p-5 flex flex-col justify-between gap-4 relative">
                      <div className="flex-grow">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                             <span className={`w-2 h-2 rounded-full ${job.status === 'closed' ? 'bg-red-500' : 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]'}`}></span>
                             <h3 className="text-lg font-bold text-white tracking-tight truncate max-w-[200px]">{job.title}</h3>
                          </div>
                           {!selectedJob && (
                             <span className="text-xs font-semibold px-2 py-1 bg-gray-800 text-gray-300 rounded-md">
                               {job.location}
                             </span>
                           )}
                        </div>
                        
                        {!selectedJob && (
                          <p className="text-sm text-gray-400 font-medium mb-4 flex items-center gap-2">
                            <span className="text-purple-400 font-bold">{job.salary}</span>
                          </p>
                        )}
                      </div>
                      
                      <div className="flex gap-2 w-full mt-auto">
                        <button
                          onClick={() => handleToggleApplicants(job)}
                          className={`flex-1 py-2 px-3 rounded-lg font-bold transition-all text-xs flex items-center justify-center gap-2 ${
                            isExpanded ? 'bg-gray-800 text-white border border-gray-700' : 'bg-purple-600/10 text-purple-400 border border-purple-500/20 hover:bg-purple-600 hover:text-white'
                          }`}
                        >
                          <Users className="w-4 h-4" /> 
                          {isExpanded ? 'Close' : 'View Pipeline'}
                        </button>
                         {!selectedJob && (
                          <>
                            <button
                              onClick={() => setSelectedJobToEdit(job)}
                              className="py-2 px-3 rounded-lg font-bold transition-all text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-700"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteJob(job._id)}
                              className="py-2 px-3 rounded-lg font-bold transition-all text-xs bg-red-600/10 hover:bg-red-600/20 text-red-500 border border-red-500/20"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                         )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Pane - Detail View */}
            {selectedJob && (
              <div className="flex-grow bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden shadow-xl flex flex-col min-h-[600px] animate-in slide-in-from-right-8 duration-500">
                
                {/* Header of Detail View */}
                <div className="p-6 border-b border-gray-800 bg-gray-950/50 flex items-center justify-between">
                   <div>
                     <h3 className="text-xl font-black text-white flex items-center gap-2">
                       <span className="bg-purple-600 text-white px-2 py-0.5 rounded text-sm uppercase tracking-wider">Pipeline</span>
                       {selectedJob.title}
                     </h3>
                     <p className="text-sm text-gray-400 mt-1 flex items-center gap-2">
                        <Users className="w-4 h-4" /> {candidates.length} candidates in review
                     </p>
                   </div>
                   <div className="flex items-center gap-2 bg-gray-800 p-1 rounded-lg">
                      <button 
                        onClick={() => setSelectedCandidate(null)}
                        className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${!selectedCandidate ? 'bg-gray-700 text-white shadow' : 'text-gray-400 hover:text-gray-200'}`}
                      >
                        List
                      </button>
                   </div>
                </div>

                <div className="flex-grow flex overflow-hidden">
                  
                  {/* Candidates List Column */}
                  <div className={`${selectedCandidate ? 'hidden lg:block w-[300px] border-r border-gray-800' : 'w-full'} overflow-y-auto custom-scrollbar`}>
                     {loadingCandidates ? (
                       <div className="py-20 text-center"><Loader2 className="w-8 h-8 animate-spin mx-auto text-purple-500 mb-2" /><p className="text-sm text-gray-500">Loading pipeline...</p></div>
                     ) : candidates.length === 0 ? (
                       <div className="p-10 text-center text-gray-500">No applications match this role yet.</div>
                     ) : (
                       <div className="p-4 space-y-2">
                         {candidates.map(candidate => (
                           <div 
                              key={candidate._id} 
                              onClick={() => setSelectedCandidate(candidate)}
                              className={`p-4 rounded-xl border cursor-pointer transition-all ${selectedCandidate?._id === candidate._id ? 'bg-gray-800 border-purple-500/50' : 'bg-gray-950/30 border-gray-800 hover:border-gray-700 hover:bg-gray-900'}`}
                           >
                              <div className="flex justify-between items-start mb-2">
                                <div className="font-bold text-white text-sm">
                                  {candidate.applicantId?.displayName || candidate.applicantId?.email || 'Unknown'}
                                </div>
                                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${
                                  candidate.status === 'accepted' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                  candidate.status === 'rejected' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                                  candidate.status === 'interviewing' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                  'bg-gray-800 text-gray-400 border-gray-700'
                                }`}>
                                  {candidate.status}
                                </span>
                              </div>
                              <div className="text-xs text-gray-400 mb-2 truncate">{candidate.applicantId?.email}</div>
                              <div className="flex items-center gap-1.5">
                                 <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">AI Score</span>
                                 <div className="w-full bg-gray-800 rounded-full h-1.5">
                                    <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: `${candidate.aiScore || Math.floor(Math.random() * 40 + 60)}%` }}></div>
                                 </div>
                              </div>
                           </div>
                         ))}
                       </div>
                     )}
                  </div>

                  {/* Candidate Detail View */}
                  {selectedCandidate && (
                    <div className="flex-grow overflow-y-auto custom-scrollbar bg-gray-950/50 animate-in fade-in duration-300">
                       <div className="p-8 max-w-3xl mx-auto space-y-8">
                          
                          {/* Profile Header */}
                          <div className="flex flex-col md:flex-row gap-6 items-start justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 p-0.5">
                                 <div className="w-full h-full bg-gray-900 rounded-xl flex items-center justify-center text-xl font-black text-white">
                                   {(selectedCandidate.applicantId?.displayName || 'U')[0]}
                                 </div>
                              </div>
                              <div>
                                <h4 className="text-2xl font-black text-white">{selectedCandidate.applicantId?.displayName}</h4>
                                <p className="text-gray-400">{selectedCandidate.applicantId?.email}</p>
                              </div>
                            </div>
                            
                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-2 w-full md:w-auto">
                               {selectedCandidate.status !== 'accepted' && (
                                 <button onClick={() => updateApplicationStatus(selectedCandidate._id, 'accepted')} className="flex-1 md:flex-none px-4 py-2 bg-green-500/10 hover:bg-green-500/20 text-green-500 border border-green-500/30 rounded-lg text-sm font-bold flex items-center justify-center gap-1">
                                    <CheckCircle2 className="w-4 h-4" /> Accept
                                 </button>
                               )}
                               {selectedCandidate.status !== 'rejected' && (
                                 <button onClick={() => updateApplicationStatus(selectedCandidate._id, 'rejected')} className="flex-1 md:flex-none px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/30 rounded-lg text-sm font-bold flex items-center justify-center gap-1">
                                    <XCircle className="w-4 h-4" /> Reject
                                 </button>
                               )}
                            </div>
                          </div>

                          {/* AI Evaluation */}
                          <div className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 border border-purple-500/30 rounded-2xl p-6 shadow-lg relative overflow-hidden">
                             <div className="absolute top-0 right-0 p-4 opacity-10"><Sparkles className="w-24 h-24" /></div>
                             <div className="relative z-10">
                               <h5 className="text-xs font-black text-purple-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                 <Sparkles className="w-4 h-4" /> Generative AI Synthesis
                               </h5>
                               <div className="prose prose-invert max-w-none text-sm">
                                 {selectedCandidate.aiEvaluation ? (
                                    typeof selectedCandidate.aiEvaluation === 'string' 
                                      ? <div dangerouslySetInnerHTML={{ __html: String(selectedCandidate.aiEvaluation).replace(/\n/g, '<br/>') }} />
                                      : (
                                        <div>
                                          <div className="flex items-center justify-between mb-4 border-b border-purple-500/30 pb-3">
                                            <span className="font-bold text-white">Match Score</span>
                                            <span className="text-2xl font-black text-purple-400">{selectedCandidate.aiEvaluation.score}/100</span>
                                          </div>
                                          <p className="text-gray-300 mb-4 leading-relaxed">{selectedCandidate.aiEvaluation.reasoning}</p>
                                          
                                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {selectedCandidate.aiEvaluation.pros?.length > 0 && (
                                              <div className="bg-green-500/10 border border-green-500/20 p-3 rounded-xl">
                                                <p className="font-bold text-green-400 mb-2 flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Pros</p>
                                                <ul className="list-disc pl-4 text-green-300/80 space-y-1">
                                                  {selectedCandidate.aiEvaluation.pros.map((p, i) => <li key={i} className="line-clamp-2" title={p}>{p}</li>)}
                                                </ul>
                                              </div>
                                            )}
                                            {selectedCandidate.aiEvaluation.cons?.length > 0 && (
                                              <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-xl">
                                                <p className="font-bold text-red-400 mb-2 flex items-center gap-1"><XCircle className="w-4 h-4" /> Concerns</p>
                                                <ul className="list-disc pl-4 text-red-300/80 space-y-1">
                                                  {selectedCandidate.aiEvaluation.cons.map((c, i) => <li key={i} className="line-clamp-2" title={c}>{c}</li>)}
                                                </ul>
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      )
                                 ) : (
                                    <p className="text-gray-400 italic">"Strong candidate profile based on technical skill alignment. Exhibits key indicators for success in this role based on past trajectory."</p>
                                 )}
                               </div>
                             </div>
                          </div>

                           {/* Cover Letter */}
                          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                            <h5 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                              Candidate Cover Letter
                            </h5>
                              <div className="text-gray-300 text-sm whitespace-pre-wrap leading-relaxed border-l-2 border-gray-700 pl-4 py-2 max-h-32 overflow-y-auto custom-scrollbar">
                                {selectedCandidate.coverLetter ? selectedCandidate.coverLetter : 'No custom cover letter provided.'}
                              </div>
                            </div>

                            {/* Resume Actions */}
                          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                             <div>
                                <h5 className="font-bold text-white mb-1">Resume Document</h5>
                                <p className="text-xs text-gray-500">Access the original uploaded PDF.</p>
                             </div>
                             <div className="flex items-center gap-3 w-full sm:w-auto">
                                <button onClick={() => downloadResume(selectedCandidate._id, selectedCandidate.applicantId?.displayName)} className="flex-1 sm:flex-none px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-bold border border-gray-700">
                                   Download PDF
                                </button>
                             </div>
                          </div>

                       </div>
                    </div>
                  )}
                  
                </div>
              </div>
            )}
          </div>
        )}
      </div> 
      <CreateJobModal 
        isOpen={isCreateModalOpen || !!selectedJobToEdit} 
        onClose={() => {
          setIsCreateModalOpen(false);
          setSelectedJobToEdit(null);
        }}
        onSubmit={selectedJobToEdit ? handleEditSubmit : handleCreateJob}
        initialData={selectedJobToEdit}
      />
      <ProfileSetupModal 
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onSubmit={handleProfileUpdate}
        user={user}
        isSubmitting={isUpdatingProfile}
      />
    </>
  );
}
