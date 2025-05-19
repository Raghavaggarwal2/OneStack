import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProgressBar from '../../components/ProgressBar';
import TopicChecklist from '../../components/TopicChecklist';
import { loadDomainProgress, saveDomainProgress } from '../../utils/progressUtils';
import useDomainProgress from '../../hooks/useDomainProgress';

// Domain-specific data
const domainName = "iOS Dev";
const domainColor = "bg-orange-500"; // From domainColors in domainList.js

// Sample topics for this domain
const defaultTopics = [
  { id: 1, name: "Storyboards", completed: false },
  { id: 2, name: "Auto Layout", completed: false },
  { id: 3, name: "Core Data", completed: false },
  { id: 4, name: "App Store Deployment", completed: false },
  { id: 5, name: "Swift Fundamentals", completed: false },
  { id: 6, name: "UIKit Components", completed: false },
  { id: 7, name: "SwiftUI", completed: false },
  { id: 8, name: "Networking & APIs", completed: false },
  { id: 9, name: "TableViews & CollectionViews", completed: false },
  { id: 10, name: "Push Notifications", completed: false },
  { id: 11, name: "User Authentication", completed: false },
  { id: 12, name: "App Lifecycle", completed: false },
];

const IOSDev = () => {
  const [progress, setProgress] = useState(0);
  const { topics, updateTopics, isLoading } = useDomainProgress(domainName, defaultTopics);
  
  // Load saved progress on component mount
  useEffect(() => {
    const savedTopics = loadDomainProgress(domainName, defaultTopics);
    // Calculate initial progress
    const completedCount = savedTopics.filter(topic => topic.completed).length;
    setProgress(Math.round((completedCount / savedTopics.length) * 100));
  }, []);
  
  // Handler for progress updates from TopicChecklist
  const handleProgressChange = (newProgress) => {
    setProgress(newProgress);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="relative mb-8">
          <Link 
            to="/domains" 
            className="absolute top-0 left-0 flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            <span>Back to Domains</span>
          </Link>

          <div className="text-center pt-12">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">{domainName}</h1>
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Develop beautiful and performant iOS applications
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Progress Overview */}
            <div className="bg-white dark:bg-black rounded-2xl shadow-lg p-6 backdrop-blur-sm bg-opacity-80 dark:bg-opacity-40">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Progress</h2>
                <span className="text-3xl font-bold text-orange-600 dark:text-orange-400">{progress}%</span>
              </div>
              <ProgressBar 
                value={progress} 
                color={domainColor} 
                className="h-3 rounded-full"
              />
              
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{topics.length}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Total Topics</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {topics.filter(t => t.completed).length}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Completed</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {topics.length - topics.filter(t => t.completed).length}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Remaining</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {Math.round((topics.filter(t => t.completed).length / topics.length) * 100)}%
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Success Rate</div>
                </div>
              </div>
            </div>

            {/* Topics Checklist */}
            <div className="bg-white dark:bg-black rounded-2xl shadow-lg p-6 backdrop-blur-sm bg-opacity-80 dark:bg-opacity-40">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Learning Path</h2>
              <div className="grid gap-4">
                {topics.map((topic, index) => (
                  <div 
                    key={topic.id}
                    className={`relative flex items-center p-4 rounded-lg transition-all duration-200
                      ${topic.completed 
                        ? 'bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800' 
                        : 'bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800'}
                    `}
                  >
                    <div className="flex-1">
                      <div className="flex items-center">
                        <span className={`flex items-center justify-center w-8 h-8 rounded-full mr-4 text-sm font-medium
                          ${topic.completed 
                            ? 'bg-orange-200 dark:bg-orange-800 text-orange-800 dark:text-orange-200' 
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}
                        `}>
                          {index + 1}
                        </span>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                          {topic.name}
                        </h3>
                      </div>
                    </div>
                    <div className="ml-4">
                      <input
                        type="checkbox"
                        checked={topic.completed}
                        onChange={() => {
                          const newTopics = [...topics];
                          newTopics[index].completed = !newTopics[index].completed;
                          updateTopics(newTopics)
                            .then(() => {
                              const completedCount = newTopics.filter(t => t.completed).length;
                              setProgress(Math.round((completedCount / newTopics.length) * 100));
                            })
                            .catch((error) => {
                              console.error('Failed to update progress:', error);
                            });
                        }}
                        className="w-5 h-5 text-orange-600 rounded border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 dark:bg-gray-900 dark:border-gray-600"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Tech Stack */}
            <div className="bg-white dark:bg-black rounded-2xl shadow-lg p-6 backdrop-blur-sm bg-opacity-80 dark:bg-opacity-40">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Tech Stack</h2>
              <div className="flex flex-wrap gap-2">
                <span className="px-4 py-2 rounded-full text-sm font-medium bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200">Swift</span>
                <span className="px-4 py-2 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">UIKit</span>
                <span className="px-4 py-2 rounded-full text-sm font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200">SwiftUI</span>
                <span className="px-4 py-2 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">Xcode</span>
              </div>
            </div>

            {/* Resources */}
            <div className="bg-white dark:bg-black rounded-2xl shadow-lg p-6 backdrop-blur-sm bg-opacity-80 dark:bg-opacity-40">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Learning Resources</h2>
              
              {/* Documentation */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Documentation</h3>
                <a 
                  href="https://developer.apple.com/documentation/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center p-4 rounded-lg bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-600 dark:text-orange-400 mr-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Apple Developer Docs</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Official iOS Development Guide</div>
                  </div>
                </a>
              </div>

              {/* Video Tutorials */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Video Tutorials</h3>
                <div className="grid gap-4">
                  <a 
                    href="https://www.youtube.com/watch?v=comQ1-x2a1Q" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group relative overflow-hidden rounded-lg aspect-video"
                  >
                    <img 
                      src={`https://img.youtube.com/vi/comQ1-x2a1Q/maxresdefault.jpg`}
                      alt="iOS Development Course"
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                      <div className="text-white text-sm font-medium">FreeCodeCamp - iOS Development Course</div>
                    </div>
                  </a>

                  <a 
                    href="https://www.youtube.com/watch?v=F2ojC6TNwws" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group relative overflow-hidden rounded-lg aspect-video"
                  >
                    <img 
                      src={`https://img.youtube.com/vi/F2ojC6TNwws/maxresdefault.jpg`}
                      alt="SwiftUI Tutorial"
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                      <div className="text-white text-sm font-medium">Design+Code - SwiftUI Course</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IOSDev;