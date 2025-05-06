import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProgressBar from '../../components/ProgressBar';
import TopicChecklist from '../../components/TopicChecklist';
import { loadDomainProgress, saveDomainProgress } from '../../utils/progressUtils';

// Domain-specific data
const domainName = "UI/UX";
const domainColor = "bg-blue-500"; // From domainColors in domainList.js

// Sample topics for this domain
const defaultTopics = [
  { id: 1, name: "User Research", completed: false },
  { id: 2, name: "Wireframing", completed: false },
  { id: 3, name: "Prototyping", completed: false },
  { id: 4, name: "Interaction Design", completed: false },
  { id: 5, name: "Visual Design", completed: false },
  { id: 6, name: "Usability Testing", completed: false },
  { id: 7, name: "Design Systems", completed: false },
  { id: 8, name: "Information Architecture", completed: false },
  { id: 9, name: "Accessibility", completed: false },
  { id: 10, name: "User Flows", completed: false },
  { id: 11, name: "Design Thinking", completed: false },
  { id: 12, name: "A/B Testing", completed: false },
];

const UIUX = () => {
  const [progress, setProgress] = useState(0);
  const [topics, setTopics] = useState(defaultTopics);
  
  // Load saved progress on component mount
  useEffect(() => {
    const savedTopics = loadDomainProgress(domainName, defaultTopics);
    setTopics(savedTopics);
    
    // Calculate initial progress
    const completedCount = savedTopics.filter(topic => topic.completed).length;
    setProgress(Math.round((completedCount / savedTopics.length) * 100));
  }, []);
  
  // Handler for progress updates from TopicChecklist
  const handleProgressChange = (newProgress) => {
    setProgress(newProgress);
  };

  return (
    <div className="container mx-auto px-4 py-8">
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
            {/* Tech stack tags */}
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm">Figma</span>
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm">Adobe XD</span>
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm">Sketch</span>
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm">InVision</span>
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm">Photoshop</span>
          </div>
        </div>
        
        {/* Domain description */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">About</h2>
          <p className="text-gray-700 dark:text-gray-300">
            UI/UX combines User Interface and User Experience design to create products that provide meaningful and relevant experiences to users. UI focuses on the visual elements and interactions, while UX encompasses the entire journey and satisfaction of users with a product. Together, they aim to enhance user satisfaction by improving the usability, accessibility, and pleasure provided in the interaction between the user and the product.
          </p>
        </div>
      </div>
      
      {/* Topics checklist */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <TopicChecklist 
          topics={topics} 
          domainName={domainName} 
          onProgressChange={handleProgressChange} 
        />
      </div>
      
      {/* Resources section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Resources</h2>
        
        {/* Documentation */}
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2">Documentation</h3>
          <a 
            href="https://www.nngroup.com/articles/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
            </svg>
            Nielsen Norman Group - UX Research & Design Articles
          </a>
        </div>
        
        {/* YouTube resources */}
        <div>
          <h3 className="text-lg font-medium mb-2">Video Tutorials</h3>
          <div className="space-y-2">
            <a 
              href="https://www.youtube.com/watch?v=c9Wg6Cb_YlU" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-1 text-red-600">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
              </svg>
              UI/UX Design Course - Complete Figma Tutorial
            </a>
            <a 
              href="https://www.youtube.com/watch?v=vltaGI-FeQM" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-1 text-red-600">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
              </svg>
              UX Design Principles - Fundamentals for Beginners
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UIUX; 