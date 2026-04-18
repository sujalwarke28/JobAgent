const fs = require('fs');
const filePath = '/Users/sujalwarke/Desktop/PersonalOPS/ai-job-copilot/frontend/src/pages/ApplicantDashboard.jsx';
let content = fs.readFileSync(filePath, 'utf8');

const newUI = `      {/* Profile Section Start */}
      <div className="bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden mb-10 shadow-2xl relative">
        {/* Banner */}
        <div className="h-48 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[80px] pointer-events-none"></div>
           <button 
              onClick={() => setIsProfileModalOpen(true)} 
              className="absolute top-4 right-4 bg-black/30 hover:bg-black/50 text-white p-2.5 rounded-full backdrop-blur-md transition-all opacity-0 group-hover:opacity-100"
            >
             <Settings className="w-5 h-5" />
           </button>
        </div>
        
        {/* Content */}
        <div className="px-6 md:px-10 pb-8 relative">
          {/* Avatar Overlapping */}
          <div className="absolute -top-16 left-6 md:left-10">
            <div className="w-32 h-32 rounded-full border-4 border-gray-900 bg-gradient-to-br from-gray-800 to-gray-700 overflow-hidden flex items-center justify-center text-4xl font-black text-white shadow-xl relative group">
              <div dangerouslySetInnerHTML={{ __html: \`\${(user.displayName || user.email || 'A')[0].toUpperCase()}\` }} />
              <div 
                className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity"
                onClick={() => setIsProfileModalOpen(true)}
              >
                <Settings className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="pt-20 flex flex-col md:flex-row justify-between items-start gap-4">
            <div>
              <h1 className="text-3xl font-black text-white">{user.displayName || 'Future Professional'}</h1>
              <p className="text-xl text-gray-300 mt-1">{user.preferredRoles?.join(', ') || 'Dream Role Hunter'}</p>
              <p className="text-gray-400 text-sm mt-2 flex items-center gap-2">
                 <Compass className="w-4 h-4"/> {user.location || 'Remote'} &bull; <span className="text-blue-400 font-medium cursor-pointer hover:underline">500+ Connections</span>
              </p>
            </div>
            {needsSetup && (
              <button 
                onClick={() => setIsProfileModalOpen(true)}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold text-white text-sm transition-all shadow-lg shadow-blue-500/25 shrink-0"
              >
                Complete Profile
              </button>
            )}
          </div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
               
               {/* Analytics simulated */}
               <div className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700/50">
                  <h3 className="text-sm font-bold text-gray-400 mb-5 uppercase tracking-wider">Analytics</h3>
                  <div className="flex gap-8">
                    <div>
                      <div className="flex items-end gap-2 mb-1">
                        <p className="text-3xl font-black text-white leading-none">342</p>
                        <p className="text-xs font-bold text-green-400 mb-1">+12%</p>
                      </div>
                      <p className="text-sm text-gray-400">Profile views</p>
                    </div>
                    <div className="w-px bg-gray-700/50"></div>
                    <div>
                      <div className="flex items-end gap-2 mb-1">
                        <p className="text-3xl font-black text-white leading-none">15</p>
                        <p className="text-xs font-bold text-gray-500 mb-1">-</p>
                      </div>
                      <p className="text-sm text-gray-400">Search appearances</p>
                    </div>
                    <div className="w-px bg-gray-700/50 hidden sm:block"></div>
                    <div className="hidden sm:block">
                      <div className="flex items-end gap-2 mb-1">
                         <p className="text-3xl font-black text-white leading-none">52</p>
                      </div>
                      <p className="text-sm text-gray-400">AI Match Score</p>
                    </div>
                  </div>
               </div>

               {/* About */}
               <div className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700/50">
                  <h3 className="text-lg font-bold text-white mb-3">About</h3>
                  <p className="text-gray-300 leading-relaxed text-sm">
                    {user.companyDetails || "Passionate and detail-oriented professional exploring new opportunities. Known for quick learning, teamwork, and driving results. I am constantly upgrading my skills to meet the latest industry standards."}
                  </p>
               </div>

               {/* Experience */}
               <div className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700/50">
                  <h3 className="text-lg font-bold text-white mb-5">Experience</h3>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex flex-shrink-0 items-center justify-center shrink-0">
                         <Briefcase className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white">{user.preferredRoles?.[0] || 'Previous Role'}</h4>
                        <p className="text-sm font-medium text-gray-300 mt-0.5">{user.companyName || 'Previous Company'}</p>
                        <p className="text-xs text-gray-500 mt-1">Jan 2021 - Present &bull; 3 yrs 5 mos &bull; {user.location || 'Remote'}</p>
                        <p className="text-sm text-gray-400 mt-3 leading-relaxed">Demonstrated an ability to optimize workflows and increase productivity. Consistently engaged in continuous improvement and delivered projects on time.</p>
                      </div>
                    </div>
                  </div>
               </div>
            </div>
            
            {/* Right Column */}
            <div className="space-y-6">
              
              {/* Education */}
              <div className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700/50">
                  <h3 className="text-lg font-bold text-white mb-5">Education</h3>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex flex-shrink-0 items-center justify-center shrink-0">
                        <span className="text-purple-400 font-bold">U</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">University Of Excellence</h4>
                      <p className="text-xs text-gray-300 mt-1">Bachelor's Degree</p>
                      <p className="text-xs text-gray-500 mt-1">2016 - 2020</p>
                    </div>
                  </div>
               </div>

               {/* Skills */}
               <div className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700/50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-white">Skills</h3>
                    <button 
                      onClick={() => setIsProfileModalOpen(true)}
                      className="text-gray-500 hover:text-white transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {user.skills?.length > 0 ? (
                      user.skills.map((s, i) => (
                        <span key={i} className="px-3 py-1.5 bg-gray-900 border border-gray-700 text-gray-300 text-xs font-medium rounded-lg">
                          {s}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-gray-500 italic">No skills added yet. Let AI extract them by uploading a resume!</span>
                    )}
                  </div>
               </div>

               {/* Projects */}
               <div className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700/50">
                  <h3 className="text-lg font-bold text-white mb-4">Projects</h3>
                  <div className="space-y-3">
                    <div className="border border-gray-700/50 hover:border-gray-600 transition-colors rounded-xl p-4 bg-gray-900/50 cursor-pointer group">
                      <h4 className="text-sm font-bold text-blue-400 group-hover:text-blue-300 transition-colors mb-1">AI Job Matcher Core</h4>
                      <p className="text-xs text-gray-400">An intelligently designed system optimizing personal skills into real-world job postings.</p>
                    </div>
                    <div className="border border-gray-700/50 hover:border-gray-600 transition-colors rounded-xl p-4 bg-gray-900/50 cursor-pointer group">
                      <h4 className="text-sm font-bold text-emerald-400 group-hover:text-emerald-300 transition-colors mb-1">Portfolio Concept</h4>
                      <p className="text-xs text-gray-400">A clean, responsive display of skills and experiences using React & Tailwind CSS.</p>
                    </div>
                  </div>
               </div>
               
            </div>
          </div>
        </div>
      </div>
      {/* Profile Section End */}`;

const searchRegex = /\{\/\* Dynamic Header Section \*\/\}([\s\S]*?)(?=\{\/\* Setup Prompt \*\/\})/g;
content = content.replace(searchRegex, newUI + '\n\n      ');

fs.writeFileSync(filePath, content);
console.log('Updated UI in ApplicantDashboard.jsx');
