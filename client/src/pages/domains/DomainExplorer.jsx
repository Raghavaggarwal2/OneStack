import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProgressBar from '../../components/ProgressBar';
import useDomainProgress from '../../hooks/useDomainProgress';

// Domain-specific data
const domainName = "Domain Explorer";
const domainColor = "bg-gray-500";

const defaultTopics = [
  { id: 1, name: 'Introduction to Web Development', completed: false },
  { id: 2, name: 'HTML & CSS Basics', completed: false },
  { id: 3, name: 'JavaScript Essentials', completed: false },
  { id: 4, name: 'Responsive Web Design', completed: false },
  { id: 5, name: 'Introduction to Data Science', completed: false },
  { id: 6, name: 'Python for Data Analysis', completed: false },
  { id: 7, name: 'Data Visualization with Python', completed: false },
  { id: 8, name: 'Machine Learning Basics', completed: false },
  { id: 9, name: 'Introduction to Mobile Development', completed: false },
  { id: 10, name: 'React Native Basics', completed: false },
  { id: 11, name: 'DevOps Fundamentals', completed: false },
  { id: 12, name: 'Continuous Integration & Deployment', completed: false },
  { id: 13, name: 'Docker for Beginners', completed: false },
  { id: 14, name: 'Kubernetes Basics', completed: false },
  { id: 15, name: 'Machine Learning with TensorFlow', completed: false },
  { id: 16, name: 'Deep Learning Fundamentals', completed: false },
  { id: 17, name: 'Cloud Computing Basics', completed: false },
  { id: 18, name: 'AWS for Beginners', completed: false },
  { id: 19, name: 'Azure Fundamentals', completed: false },
  { id: 20, name: 'Google Cloud Platform Basics', completed: false },
];

const DomainExplorer = () => {
  const [progress, setProgress] = useState(0);
  const { topics, updateTopics, isLoading } = useDomainProgress(domainName, defaultTopics);
  
  useEffect(() => {
    // Calculate progress whenever topics change
    const completedCount = topics.filter(topic => topic.completed).length;
    setProgress(Math.round((completedCount / topics.length) * 100));
  }, [topics]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Domain Explorer</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search domains..."
            className="pl-10 pr-4 py-2 dark:bg-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg
            className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic, index) => (
          <div
            key={topic.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-100 p-6 hover:shadow-lg transition duration-300"
          >
            <div className={`w-12 h-12 rounded-lg bg-${domainColor}-100 flex items-center justify-center mb-4`}>
              <svg
                className={`w-6 h-6 text-${domainColor}-600`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">{topic.name}</h3>
            <p className="text-gray-600 mb-4">{topic.topics} Topics</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">4.8 ★★★★★</span>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                Explore
              </button>
            </div>
            <div className="mt-4">
              <label className="flex items-center">
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
                  className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-700 dark:text-gray-300">{topic.completed ? 'Completed' : 'Mark as complete'}</span>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DomainExplorer;