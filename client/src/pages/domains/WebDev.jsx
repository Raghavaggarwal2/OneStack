import React from 'react';
import { Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ProgressBar from '../../components/ProgressBar';
import TopicChecklist from '../../components/TopicChecklist';
import useDomainProgress from '../../hooks/useDomainProgress';

// Domain-specific data
const domainName = "Web Dev";
const domainColor = "bg-teal-500";

// Default topics for this domain
const defaultTopics = [
  { id: 1, name: "Responsive Design", completed: false },
  { id: 2, name: "RESTful APIs", completed: false },
  { id: 3, name: "Authentication", completed: false },
  { id: 4, name: "Deployment", completed: false },
  { id: 5, name: "Frontend Frameworks", completed: false },
  { id: 6, name: "Backend Development", completed: false },
  { id: 7, name: "Database Integration", completed: false },
  { id: 8, name: "State Management", completed: false },
  { id: 9, name: "Web Performance", completed: false },
  { id: 10, name: "Web Security", completed: false },
  { id: 11, name: "Testing Strategies", completed: false },
  { id: 12, name: "Progressive Web Apps", completed: false },
];

const WebDev = () => {
  const {
    topics,
    progress,
    loading,
    updateTopics,
    handleProgressChange
  } = useDomainProgress(domainName, defaultTopics);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100 dark:from-gray-900 dark:to-gray-800 py-8">
      <Toaster />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link 
          to="/domains" 
          className="inline-flex items-center space-x-2 text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors mb-8"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          <span>Back to Domains</span>
        </Link>

        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">{domainName}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Master modern web development from frontend to backend
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Progress Overview */}
            <div className="bg-white dark:bg-black rounded-2xl shadow-lg p-8 backdrop-blur-sm bg-opacity-80 dark:bg-opacity-40">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Progress</h2>
                <span className="text-teal-600 dark:text-teal-400 font-medium">{progress}%</span>
              </div>
              <ProgressBar value={progress} color={domainColor} />

              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {topics.filter(t => t.completed).length}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Completed</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {topics.length - topics.filter(t => t.completed).length}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Remaining</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">12</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Hours Est.</div>
                </div>
              </div>
            </div>

            {/* Learning Path */}
            <div className="bg-white dark:bg-black rounded-2xl shadow-lg p-8 backdrop-blur-sm bg-opacity-80 dark:bg-opacity-40">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Learning Path</h2>
              <TopicChecklist 
                topics={topics} 
                domainName={domainName} 
                onProgressChange={handleProgressChange}
                onTopicsUpdate={updateTopics}
              />
            </div>

            {/* Resources */}
            <div className="bg-white dark:bg-black rounded-2xl shadow-lg p-8 backdrop-blur-sm bg-opacity-80 dark:bg-opacity-40">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Learning Resources</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Documentation */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Documentation</h3>
                  <div className="space-y-3">
                    <a href="https://developer.mozilla.org" target="_blank" rel="noopener noreferrer" 
                      className="flex items-center text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 005.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
                      </svg>
                      MDN Web Docs
                    </a>
                  </div>
                </div>

                {/* Video Resources */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Video Tutorials</h3>
                  <div className="space-y-3">
                    <a href="https://youtube.com/webdev" target="_blank" rel="noopener noreferrer" 
                      className="flex items-center text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                      </svg>
                      Modern Web Development
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Tech Stack */}
            <div className="bg-white dark:bg-black rounded-2xl shadow-lg p-8 backdrop-blur-sm bg-opacity-80 dark:bg-opacity-40">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Tech Stack</h2>
              <div className="flex flex-wrap gap-2">
                <span className="px-4 py-2 rounded-full text-sm font-medium bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200">HTML</span>
                <span className="px-4 py-2 rounded-full text-sm font-medium bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200">CSS</span>
                <span className="px-4 py-2 rounded-full text-sm font-medium bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200">JavaScript</span>
                <span className="px-4 py-2 rounded-full text-sm font-medium bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200">React</span>
                <span className="px-4 py-2 rounded-full text-sm font-medium bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200">Node.js</span>
                <span className="px-4 py-2 rounded-full text-sm font-medium bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200">MongoDB</span>
              </div>
            </div>

            {/* Domain Description */}
            <div className="bg-white dark:bg-black rounded-2xl shadow-lg p-8 backdrop-blur-sm bg-opacity-80 dark:bg-opacity-40">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">About This Domain</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Web Development involves building and maintaining websites. It encompasses front-end development (client-side) and back-end development (server-side) to create dynamic web applications. From simple static websites to complex web applications, web developers use a variety of programming languages, frameworks, and tools to deliver responsive, accessible, and high-performance web experiences.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebDev;