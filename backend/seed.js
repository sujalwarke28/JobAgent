const mongoose = require('mongoose');
const User = require('./models/User');
const Job = require('./models/Job');
const db = require('./config/db');
require('dotenv').config({ path: './.env' }); // Adjust if script run from root vs backend

const seedDatabase = async () => {
  try {
    const sampleJobs = [
      {
        title: 'Senior Frontend Engineer',
        company: 'TechCorp',
        description: 'We are looking for a Senior Frontend Engineer to build modern UI architectures.',
        requiredSkills: ['JavaScript', 'React', 'TypeScript', 'Tailwind CSS'],
        location: 'Remote',
        salary: '$120k - $150k'
      },
      {
        title: 'Backend Node.js Developer',
        company: 'DataFlow Systems',
        description: 'Join our backend team to build scalable microservices.',
        requiredSkills: ['Node.js', 'Express', 'MongoDB', 'AWS', 'Docker'],
        location: 'New York, NY',
        salary: '$110k - $140k'
      },
      {
        title: 'Full Stack Engineer (MERN)',
        company: 'StartupX',
        description: 'Fast-paced startup looking for a full stack ninja.',
        requiredSkills: ['MongoDB', 'Express', 'React', 'Node.js', 'JavaScript'],
        location: 'San Francisco, CA',
        salary: '$130k - $160k'
      },
      {
        title: 'AI Integration Specialist',
        company: 'FutureWorks',
        description: 'Help us integrate LLMs into our existing products.',
        requiredSkills: ['Python', 'JavaScript', 'Node.js', 'Machine Learning', 'Gemini API'],
        location: 'Remote',
        salary: '$140k - $180k'
      },
      {
        title: 'DevOps Engineer',
        company: 'CloudScale',
        description: 'Manage our infrastructure and CI/CD pipelines.',
        requiredSkills: ['Docker', 'AWS', 'Kubernetes', 'CI/CD', 'Linux'],
        location: 'Austin, TX',
        salary: '$115k - $145k'
      },
      {
        title: 'Junior Web Developer',
        company: 'Digital Agency',
        description: 'Great opportunity for a junior developer to learn and grow.',
        requiredSkills: ['HTML', 'CSS', 'JavaScript', 'React'],
        location: 'Chicago, IL',
        salary: '$70k - $90k'
      },
      {
        title: 'Database Administrator',
        company: 'SecureData',
        description: 'Maintain and optimize our large scale databases.',
        requiredSkills: ['MongoDB', 'SQL', 'PostgreSQL', 'AWS'],
        location: 'Remote',
        salary: '$100k - $130k'
      },
      {
        title: 'React Native Developer',
        company: 'MobileFirst',
        description: 'Build our next generation cross-platform mobile app.',
        requiredSkills: ['JavaScript', 'React', 'React Native', 'TypeScript'],
        location: 'Seattle, WA',
        salary: '$125k - $155k'
      },
      {
        title: 'Security Engineer',
        company: 'CyberSafe',
        description: 'Ensure our applications are secure and compliant.',
        requiredSkills: ['Security', 'Python', 'AWS', 'Networking'],
        location: 'Remote',
        salary: '$135k - $165k'
      },
      {
        title: 'Engineering Manager',
        company: 'TechCorp',
        description: 'Lead a team of highly skilled engineers.',
        requiredSkills: ['Leadership', 'Agile', 'System Design', 'JavaScript'],
        location: 'Remote',
        salary: '$160k - $200k'
      }
    ];

    // Try to connect if not already connected
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI);
    }

    console.log('Clearing existing jobs...');
    await Job.deleteMany({});
    
    // Create an Admin user if needed
    const adminUser = await User.findOneAndUpdate(
      { email: 'admin@system.local' },
      {
        firebaseUid: 'dev_admin_123',
        email: 'admin@system.local',
        displayName: 'System Admin',
        role: 'admin',
        skills: ['Management']
      },
      { upsert: true, new: true }
    );

    console.log('Inserting seed jobs...');
    const jobsToInsert = sampleJobs.map(job => ({ ...job, postedBy: adminUser._id }));
    await Job.insertMany(jobsToInsert);

    console.log('✅ Database seeded successfully with 10 sample jobs.');
    
    // Only exit if this was run directly (not auto-seeded from server)
    if (require.main === module) {
      process.exit(0);
    }

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    if (require.main === module) {
      process.exit(1);
    }
  }
};

if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;
