import { useState } from 'react';
import { Upload, FileText, Loader2, CheckCircle2 } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';

export default function ResumeUpload({ onUploadSuccess }) {
  const { setUser } = useAuth();
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setSuccess(false);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setUploading(true);
    const formData = new FormData();
    formData.append('resume', file);

    try {
      const res = await api.post('/resume/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUser(res.data.data);
      setSuccess(true);
      if (onUploadSuccess) onUploadSuccess(res.data.data);
    } catch (err) {
      console.error(err);
      alert('Failed to upload and parse resume');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-lg">
      <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
        <FileText className="text-blue-400" /> Resume AI Processing
      </h3>
      <p className="text-sm text-slate-500 mb-6">
        Upload your PDF resume. Our Gemini AI will parse your experience, skills, and roles automatically to build your profile.
      </p>

      <div className="flex items-center gap-4">
        <label className="flex-1 flex items-center justify-center p-4 border-2 border-dashed border-slate-300 bg-slate-100/50 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-slate-100 transition-all">
          <input 
            type="file" 
            accept="application/pdf"
            onChange={handleFileChange} 
            className="hidden" 
          />
          {file ? (
            <span className="text-sm text-blue-400 font-medium truncate px-4">{file.name}</span>
          ) : (
            <span className="text-sm text-slate-500 flex items-center gap-2">
              <Upload className="w-4 h-4" /> Click to select PDF
            </span>
          )}
        </label>

        <button 
          onClick={handleUpload}
          disabled={!file || uploading || success}
          className={`px-6 py-4 rounded-xl font-bold transition-all shadow-lg flex items-center gap-2 ${
            success 
              ? 'bg-green-600 text-slate-900' 
              : !file 
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:scale-105 hover:bg-blue-600 transition-all duration-300 text-slate-900'
          }`}
        >
          {uploading ? (
            <><Loader2 className="w-5 h-5 animate-spin" /> Parsing...</>
          ) : success ? (
            <><CheckCircle2 className="w-5 h-5" /> Done</>
          ) : (
            'Process Resume'
          )}
        </button>
      </div>
    </div>
  );
}
