import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProgressBar from '../../components/ProgressBar';
import TopicChecklist from '../../components/TopicChecklist';
import { loadDomainProgress, saveDomainProgress } from '../../utils/progressUtils';

// Domain-specific data
const domainName = "Aptitude";
const domainColor = "bg-yellow-500"; // From domainColors in domainList.js

// Sample topics for this domain
const defaultTopics = [
  { id: 1, name: "Quantitative Aptitude", completed: false },
  { id: 2, name: "Logical Reasoning", completed: false },
  { id: 3, name: "Verbal Ability", completed: false },
  { id: 4, name: "Time and Work", completed: false },
  { id: 5, name: "Ratio and Proportion", completed: false },
  { id: 6, name: "Percentage", completed: false },
  { id: 7, name: "Profit and Loss", completed: false },
  { id: 8, name: "Simple and Compound Interest", completed: false },
  { id: 9, name: "Number Systems", completed: false },
  { id: 10, name: "Data Interpretation", completed: false },
  { id: 11, name: "Permutation and Combination", completed: false },
  { id: 12, name: "Probability", completed: false },
];

const Aptitude = () => {
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
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm">Mathematics</span>
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm">Logical Reasoning</span>
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm">Problem Solving</span>
          </div>
        </div>
        
        {/* Domain description */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">About</h2>
          <p className="text-gray-700 dark:text-gray-300">
            Aptitude tests assess logical reasoning and problem-solving abilities. They are commonly used in placement exams and competitive tests to evaluate a candidate's suitability for a role. These tests measure various aspects of cognitive abilities including numerical reasoning, logical thinking, and verbal comprehension.
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
            href="https://www.indiabix.com/aptitude/questions-and-answers/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
            </svg>
            Indiabix Aptitude - Comprehensive Aptitude Questions and Answers
          </a>
        </div>
        
        {/* YouTube resources */}
        <div>
          <h3 className="text-lg font-medium mb-2">Video Tutorials</h3>
          <div className="space-y-2">
            <a 
              href="https://www.youtube.com/watch?v=9JUDzpWX-Zw" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-1 text-red-600">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
              </svg>
              Aptitude Tricks - Quick Math Techniques for Competitive Exams
            </a>
            <a 
              href="https://www.youtube.com/watch?v=Yk1HiulLs-Y" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-1 text-red-600">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
              </svg>
              Logical Reasoning Complete Course for Placement Tests
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aptitude; 