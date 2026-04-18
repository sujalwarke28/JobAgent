import { useState, useEffect } from 'react';
import { X, Search, Building2, MapPin, DollarSign, Plus, Briefcase, Sparkles, Edit2 } from 'lucide-react';

export default function CreateJobModal({ isOpen, onClose, onSubmit, isSubmitting, user, initialData }) {
  const isEditing = !!initialData;
  const [formData, setFormData] = useState({
    title: '',
    company: user?.companyName || '',
    description: '',
    location: '',
    salary: '',
    requiredSkills: '',
    status: 'active',
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          ...initialData,
          requiredSkills: initialData.requiredSkills ? initialData.requiredSkills.join(', ') : '',
        });
      } else {
        setFormData({
          title: '',
          company: user?.companyName || '',
          description: '',
          location: '',
          salary: '',
          requiredSkills: '',
          status: 'active',
        });
      }
    }
  }, [isOpen, initialData, user]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedData = {
      ...formData,
      requiredSkills: formData.requiredSkills.split(',').map(s => s.trim()).filter(Boolean)
    };
    onSubmit(formattedData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white border border-slate-300 rounded-2xl w-full max-w-2xl shadow-[0_0_40px_rgba(0,0,0,0.5)] flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-100/30">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2 text-slate-900">
              {isEditing ? <Edit2 className="w-5 h-5 text-blue-400" /> : <Plus className="w-5 h-5 text-blue-400" />} 
              {isEditing ? 'Edit Job Posting' : 'Post New Role'}
            </h2>
            <p className="text-sm text-slate-500 mt-1">{isEditing ? 'Update the details of your job.' : 'Fill in the company and job details below.'}</p>
          </div>
          <button onClick={onClose} className="p-2 text-slate-500 hover:text-slate-900 rounded-full hover:bg-slate-100 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-grow">
          <form id="create-job-form" onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-blue-400" /> Job Title
                </label>
                <input 
                  required
                  type="text" 
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Senior React Developer"
                  className="w-full bg-slate-100 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-purple-400" /> Company Name
                </label>
                <input 
                  required
                  type="text" 
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="e.g. TechCorp Inc."
                  className="w-full bg-slate-100 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-600">Job Description</label>
              <textarea 
                required
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the responsibilities, expectations, and role..."
                className="w-full h-32 bg-slate-100 border border-slate-300 rounded-xl p-4 text-slate-900 resize-none focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-red-400" /> Location
                </label>
                <input 
                  type="text" 
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Remote, New York, NY"
                  className="w-full bg-slate-100 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-green-400" /> Salary Range
                </label>
                <input 
                  type="text" 
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  placeholder="e.g. $120,000 - $150,000"
                  className="w-full bg-slate-100 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-600 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-yellow-400" /> Required Skills 
                <span className="text-slate-400 text-xs font-normal">(comma separated)</span>
              </label>
              <input 
                required
                type="text" 
                name="requiredSkills"
                value={formData.requiredSkills}
                onChange={handleChange}
                placeholder="React, Node.js, TypeScript, AWS..."
                className="w-full bg-slate-100 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>
            
            {isEditing && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600 flex items-center gap-2">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full bg-slate-100 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                >
                  <option value="active">Active</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            )}
          </form>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-200 bg-slate-100/30 flex justify-end gap-3">
          <button 
            type="button" 
            onClick={onClose}
            className="px-6 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            form="create-job-form"
            disabled={isSubmitting}
            className="px-6 py-2.5 rounded-lg text-sm font-medium bg-blue-600 hover:scale-105 hover:bg-blue-600 transition-all duration-300 text-slate-900 transition-colors shadow-[0_0_15px_rgba(37,99,235,0.3)] disabled:opacity-50"
          >
            {isSubmitting ? (isEditing ? 'Updating...' : 'Creating...') : (isEditing ? 'Update Job' : 'Post Job')}
          </button>
        </div>

      </div>
    </div>
  );
}
