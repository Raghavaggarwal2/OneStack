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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Toaster />
      
      {/* Back button */}
      <div className="mb-4">
        <Link 
          to="/domains" 
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Domains
        </Link>
      </div>
      
      {/* Domain header with progress */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{domainName}</h1>
        
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600 dark:text-gray-300">Your Progress</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <ProgressBar value={progress} color={domainColor} />
        </div>
        
        {/* Technology stack section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm">HTML</span>
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm">CSS</span>
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm">JavaScript</span>
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm">React</span>
          </div>
        </div>
        
        {/* Domain description */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">About</h2>
          <p className="text-gray-700 dark:text-gray-300">
            Web Development involves building and maintaining websites. It encompasses front-end development (client-side) and back-end development (server-side) to create dynamic web applications. From simple static websites to complex web applications, web developers use a variety of programming languages, frameworks, and tools to deliver responsive, accessible, and high-performance web experiences.
          </p>
        </div>
      </div>
      
      {/* Topics checklist */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <TopicChecklist 
          topics={topics} 
          domainName={domainName} 
          onProgressChange={handleProgressChange} 
          onTopicsUpdate={updateTopics}
        />
      </div>
      
      {/* Resources section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Resources</h2>
        
        {/* Documentation */}
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2">Documentation</h3>
          <a 
            href="https://developer.mozilla.org/en-US/docs/Web" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.25 2A2.25 2.25 0 002 4.25v11.5A2.25 2.25 0 004.25 18h11.5A2.25 2.25 0 0015.75 2H4.25zM6 13.25V7h8v6.25a.75.75 0 01-1.5 0V8.5h-5v4.75a.75.75 0 01-1.5 0z" clipRule="evenodd" />
            </svg>
            MDN Web Docs
          </a>
        </div>
      </div>
    </div>
  );
};

export default WebDev;