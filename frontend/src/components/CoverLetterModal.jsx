import { useState } from 'react';
import { Sparkles, X, Send, Loader2 } from 'lucide-react';

export default function CoverLetterModal({ coverLetter, setCoverLetter, onClose, onApply, isApplying }) {
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-slate-100 border border-slate-300 rounded-xl w-full max-w-2xl shadow-2xl flex flex-col overflow-hidden max-h-[90vh]">
        <div className="flex items-center justify-between p-4 border-b border-slate-300 bg-white/50">
          <h3 className="text-lg font-semibold flex items-center gap-2 text-slate-900">
            <Sparkles className="w-5 h-5 text-blue-400" />
            AI Generated Cover Letter
          </h3>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-900 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4 flex-grow overflow-y-auto">
          <p className="text-sm text-slate-500 mb-2">Feel free to edit this AI-generated draft before submitting your application.</p>
          <textarea 
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            className="w-full h-64 sm:h-96 bg-white border border-slate-300 rounded-lg p-4 text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-sans leading-relaxed resize-none shadow-inner"
          />
        </div>
        
        <div className="p-4 border-t border-slate-300 bg-white/50 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors text-sm font-medium"
          >
            Cancel
          </button>
          <button 
            onClick={onApply}
            disabled={isApplying || !coverLetter.trim()}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-slate-900 rounded-lg text-sm font-medium transition-all shadow-lg flex items-center gap-2 disabled:opacity-50"
          >
            {isApplying ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            Apply with this letter
          </button>
        </div>
      </div>
    </div>
  );
}
