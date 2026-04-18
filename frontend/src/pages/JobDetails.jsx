import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import CoverLetterModal from '../components/CoverLetterModal';
import { MapPin, DollarSign, Building, Sparkles, Wand2, CheckCircle2, ArrowLeft } from 'lucide-react';

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  const fetchJobDetails = async () => {
    try {
      // 1. Fetch job with AI insights
      const res = await api.get(`/jobs/${id}?userId=${user._id}`);
      setJob(res.data.data);
      
      // 2. Check if already applied
      const appsRes = await api.get('/applications');
      const alreadyApplied = appsRes.data.data.some(app => app.jobId._id === id);
      setHasApplied(alreadyApplied);
      
    } catch (err) {
      console.error(err);
      alert('Error loading job details');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateCoverLetter = async () => {
    setIsGenerating(true);
    setIsModalOpen(true);
    setCoverLetter('Generating your personalized cover letter via Google Gemini AI...\n\nPlease stand by.');
    
    try {
      const res = await api.post('/applications/generate-cover-letter', { jobId: id });
      setCoverLetter(res.data.data.coverLetter);
    } catch (err) {
      console.error(err);
      setCoverLetter("Sorry, we encountered an error generating your cover letter. You can write it manually here.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleApply = async () => {
    setIsApplying(true);
    try {
      await api.post('/applications', {
        jobId: id,
        coverLetter: coverLetter,
        matchScore: job.matchScore,
        matchReason: job.matchReason
      });
      setIsModalOpen(false);
      setHasApplied(true);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to apply');
    } finally {
      setIsApplying(false);
    }
  };

  if (loading) return <div className="text-center py-20 text-gray-400">Loading job details...</div>;
  if (!job) return <div className="text-center py-20 text-gray-400">Job not found</div>;

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden shadow-2xl relative">
        {/* Header gradient bg */}
        <div className="h-32 bg-gradient-to-r from-blue-900/60 to-purple-900/60 relative">
          <div className="absolute inset-0 bg-gray-900/40"></div>
        </div>
        
        <div className="px-8 pb-8 relative -mt-16">
          <div className="flex justify-between items-end mb-6">
            <div className="bg-gray-900 border-4 border-gray-800 rounded-xl p-4 inline-block">
              <Building className="w-12 h-12 text-blue-400" />
            </div>
            
            {hasApplied ? (
              <div className="px-6 py-2.5 bg-green-500/20 text-green-400 border border-green-500/50 rounded-lg font-medium flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" /> Application Submitted
              </div>
            ) : (
              <button
                onClick={handleGenerateCoverLetter}
                disabled={isGenerating}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg font-medium transition-all shadow-lg flex items-center gap-2 relative group overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform"></div>
                <Wand2 className="w-5 h-5 relative z-10" /> 
                <span className="relative z-10">Apply with AI Cover Letter</span>
              </button>
            )}
          </div>

          <h1 className="text-3xl font-bold text-white mb-2">{job.title}</h1>
          <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-8 border-b border-gray-700 pb-8">
            <span className="flex items-center gap-2 font-medium text-gray-300">
              <Building className="w-5 h-5" /> {job.company}
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="w-5 h-5" /> {job.location}
            </span>
            <span className="flex items-center gap-2 text-green-400">
              <DollarSign className="w-5 h-5" /> {job.salary}
            </span>
            <span className="bg-gray-900 px-3 py-1 rounded-full text-xs border border-gray-700">
              Posted {new Date(job.createdAt).toLocaleDateString()}
            </span>
          </div>

          {job.matchScore !== undefined && (
            <div className="mb-8 bg-blue-900/20 border border-blue-500/30 rounded-xl p-6 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                 <Sparkles className="w-24 h-24 text-blue-500" />
               </div>
               <h3 className="text-lg font-semibold text-blue-400 flex items-center gap-2 mb-2">
                 <Sparkles className="w-5 h-5" /> AI Match Analysis
               </h3>
               <div className="flex items-end gap-3 mb-3 relative z-10">
                 <span className="text-4xl font-bold text-white">{job.matchScore}</span>
                 <span className="text-gray-400 pb-1">matching skills found</span>
               </div>
               <p className="text-gray-300 relative z-10 leading-relaxed bg-gray-900/30 p-4 rounded-lg border border-gray-700">
                 {job.matchReason || "We've analyzed your profile and found strong alignment with this role based on your core skills."}
               </p>
            </div>
          )}

          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">Required Skills</h3>
            <div className="flex flex-wrap gap-2">
              {job.requiredSkills?.map(skill => {
                const isMatch = user.skills?.map(s=>s.toLowerCase()).includes(skill.toLowerCase());
                return (
                  <span 
                    key={skill} 
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium border ${
                      isMatch 
                        ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' 
                        : 'bg-gray-900 text-gray-400 border-gray-700'
                    }`}
                  >
                    {skill} {isMatch && '✓'}
                  </span>
                )
              })}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Job Description</h3>
            <div className="text-gray-300 leading-relaxed whitespace-pre-wrap bg-gray-900 rounded-xl p-6 border border-gray-700">
              {job.description}
            </div>
          </div>

        </div>
      </div>

      {isModalOpen && (
        <CoverLetterModal 
          coverLetter={coverLetter}
          setCoverLetter={setCoverLetter}
          onClose={() => setIsModalOpen(false)}
          onApply={handleApply}
          isApplying={isApplying || isGenerating}
        />
      )}
    </div>
  );
}
