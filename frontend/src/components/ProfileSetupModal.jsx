import { useState, useEffect } from 'react';
import { X, Code2, User as UserIcon, Briefcase, Building2, FileText, Target, MapPin, Banknote, Users } from 'lucide-react';
import ResumeUpload from './ResumeUpload';

export default function ProfileSetupModal({ isOpen, onClose, onSubmit, user, isSubmitting }) {
  
  const [formData, setFormData] = useState({
    displayName: '',
    preferredRoles: '',
    skills: '',
    experienceLevel: 'Entry',
    expectedSalary: '',
    location: '',

    companyName: '',
    companyDetails: '',
    companySize: '1-10',
    industry: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        displayName: user.displayName || '',
        preferredRoles: user.preferredRoles?.join(', ') || '',
        skills: user.skills?.join(', ') || '',
        experienceLevel: user.experienceLevel || 'Entry',
        expectedSalary: user.expectedSalary || '',
        location: user.location || '',
        
        companyName: user.companyName || '',
        companyDetails: user.companyDetails || '',
        companySize: user.companySize || '1-10',
        industry: user.industry || ''
      });
    }
  }, [user, isOpen]);

  if (!isOpen || !user) return null;

  const roleMode = user.role; // 'admin' or 'applicant'

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedData = {
      displayName: formData.displayName.trim(),
      location: formData.location.trim(),
    };

    if (roleMode === 'applicant') {
      formattedData.preferredRoles = formData.preferredRoles.split(',').map(s => s.trim()).filter(Boolean);
      formattedData.skills = formData.skills.split(',').map(s => s.trim()).filter(Boolean);
      formattedData.experienceLevel = formData.experienceLevel;
      formattedData.expectedSalary = formData.expectedSalary.trim();
    }

    if (roleMode === 'admin') {
      formattedData.companyName = formData.companyName.trim();
      formattedData.companyDetails = formData.companyDetails.trim();
      formattedData.companySize = formData.companySize;
      formattedData.industry = formData.industry.trim();
    }

    onSubmit(formattedData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-gray-950 border border-gray-800 rounded-3xl w-full max-w-3xl shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden relative max-h-[90vh]">
        
        <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-[100px] pointer-events-none opacity-20 ${roleMode === 'admin' ? 'bg-purple-500' : 'bg-blue-500'}`}></div>

        {/* Header */}
        <div className="p-8 border-b border-gray-800/80 flex items-center justify-between relative z-10 bg-gray-900/50 backdrop-blur-sm">
          <div>
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border ${roleMode === 'admin' ? 'bg-purple-500/10 border-purple-500/20 text-purple-400' : 'bg-blue-500/10 border-blue-500/20 text-blue-400'}`}>
              {roleMode === 'admin' ? <Building2 className="w-3.5 h-3.5" /> : <UserIcon className="w-3.5 h-3.5" />}
              {roleMode === 'admin' ? 'Company Onboarding' : 'Applicant Setup'}
            </div>
            <h2 className="text-3xl font-black text-white tracking-tight">
               Complete Your Profile
            </h2>
            <p className="text-gray-400 mt-2 font-medium">The more detail you provide, the better the AI can establish perfect synergies.</p>
          </div>
          <button onClick={onClose} className="p-3 text-gray-500 hover:text-white rounded-xl hover:bg-gray-800 transition-colors bg-gray-900 border border-gray-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-8 relative z-10 overflow-y-auto custom-scrollbar flex-grow bg-gray-900/20">
          <form id="profile-setup-form" onSubmit={handleSubmit} className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            
            {/* Common block for everyone */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300 flex items-center gap-2">
                  <UserIcon className="w-4 h-4 text-gray-500" /> Full Representative Name
                </label>
                <input 
                  type="text" 
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" /> Primary Location
                </label>
                <input 
                  type="text" 
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. San Francisco, CA or Remote"
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium"
                />
              </div>
            </div>

            {/* Applicant Specific Fields */}
            {roleMode === 'applicant' && (
              <>
                <div className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800/80 space-y-6">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4 border-b border-gray-800 pb-4"><Target className="w-5 h-5 text-blue-400" /> Career Preferences</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-300">Target Roles <span className="text-gray-500 font-normal">(comma separated)</span></label>
                      <input 
                        type="text" 
                        name="preferredRoles"
                        value={formData.preferredRoles}
                        onChange={handleChange}
                        placeholder="Frontend Engineer, UI/UX"
                        className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-blue-500 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-300">Experience Level</label>
                      <select 
                        name="experienceLevel" 
                        value={formData.experienceLevel} 
                        onChange={handleChange}
                        className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-blue-500 transition-all appearance-none"
                      >
                        <option value="Entry">Entry Level (0-2 years)</option>
                        <option value="Mid">Mid Level (3-5 years)</option>
                        <option value="Senior">Senior (6+ years)</option>
                        <option value="Executive">Executive / Lead</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-300 flex items-center gap-2"><Banknote className="w-4 h-4 text-emerald-500" /> Expected Salary Range</label>
                    <input 
                      type="text" 
                      name="expectedSalary"
                      value={formData.expectedSalary}
                      onChange={handleChange}
                      placeholder="e.g. $90,000 - $120,000"
                      className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-300 flex items-center justify-between">
                    <span className="flex items-center gap-2"><Code2 className="w-4 h-4 text-green-400" /> Technical Arsenal</span>
                    <span className="text-xs bg-gray-800 px-2 py-1 rounded text-gray-400">Comma separated tools, languages, frameworks</span>
                  </label>
                  <textarea 
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    placeholder="React, Node.js, Python, Docker, AWS, Figma, Agile..."
                    className="w-full h-32 bg-gray-900 border border-gray-700 rounded-xl p-4 text-white resize-none focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-mono text-sm leading-relaxed"
                  />
                </div>

                <div className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800/80 space-y-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2"><FileText className="w-5 h-5 text-indigo-400" /> Resume / CV</h3>
                  <p className="text-sm text-gray-400">Upload a new PDF to automatically update your skills and experience.</p>
                  <ResumeUpload onUploadSuccess={() => { window.location.reload(); }} />
                </div>
              </>
            )}

            {/* Admin Specific Fields */}
            {roleMode === 'admin' && (
              <>
                <div className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800/80 space-y-6">
                   <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4 border-b border-gray-800 pb-4"><Building2 className="w-5 h-5 text-purple-400" /> Organization Data</h3>
                   
                   <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-300">Company / Startup Name</label>
                        <input 
                          type="text" 
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleChange}
                          placeholder="TechCorp Inc."
                          className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-purple-500 transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-300">Company Size</label>
                        <select 
                          name="companySize" 
                          value={formData.companySize} 
                          onChange={handleChange}
                          className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-purple-500 transition-all appearance-none"
                        >
                          <option value="1-10">1-10 Employees (Seed/Pre-seed)</option>
                          <option value="11-50">11-50 Employees (Series A)</option>
                          <option value="51-200">51-200 Employees (Series B/C)</option>
                          <option value="200+">200+ Employees (Enterprise)</option>
                        </select>
                      </div>
                   </div>

                   <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-300">Industry / Sector</label>
                      <input 
                        type="text" 
                        name="industry"
                        value={formData.industry}
                        onChange={handleChange}
                        placeholder="e.g. Fintech, EdTech, Artificial Intelligence"
                        className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-purple-500 transition-all"
                      />
                    </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-300 flex items-center justify-between">
                    <span className="flex items-center gap-2"><FileText className="w-4 h-4 text-purple-400" /> Company Bio & Mission</span>
                  </label>
                  <textarea 
                    name="companyDetails"
                    value={formData.companyDetails}
                    onChange={handleChange}
                    placeholder="Tell us about the company's mission, values, funding stage, and what you do..."
                    className="w-full h-32 bg-gray-900 border border-gray-700 rounded-xl p-4 text-white resize-none focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all leading-relaxed"
                  />
                </div>
              </>
            )}

          </form>
        </div>

        {/* Footer */}
        <div className="p-8 border-t border-gray-800/80 bg-gray-900/80 backdrop-blur-md flex justify-between items-center relative z-10">
          <p className="text-gray-500 text-sm font-medium hidden md:block">Settings mapped to <strong className="text-gray-300">{user.email}</strong></p>
          <div className="flex gap-4 w-full md:w-auto">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 md:flex-none px-6 py-3.5 rounded-xl text-sm font-bold text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 border border-gray-700 transition-all"
            >
              Skip
            </button>
            <button 
              type="submit" 
              form="profile-setup-form"
              disabled={isSubmitting}
              className={`flex-1 md:flex-none px-8 py-3.5 rounded-xl text-sm font-black text-white transition-all shadow-xl disabled:opacity-50 flex justify-center items-center gap-2 ${
                roleMode === 'admin' 
                  ? 'bg-purple-600 hover:bg-purple-500 shadow-purple-500/20' 
                  : 'bg-blue-600 hover:bg-blue-500 shadow-blue-500/20'
              }`}
            >
              {isSubmitting ? (
                <> <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div> Saving... </>
              ) : 'Initialize Profile'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
