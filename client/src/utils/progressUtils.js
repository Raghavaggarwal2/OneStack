/**
 * Calculate the progress percentage based on completed topics
 * @param {Array} topics - Array of topic objects with { id, name, completed }
 * @returns {number} - Percentage of completed topics (0-100)
 */
export const calculateProgress = (topics) => {
  if (!topics || topics.length === 0) return 0;
  
  const completedCount = topics.filter(topic => topic.completed).length;
  return Math.round((completedCount / topics.length) * 100);
};

/**
 * Save domain progress to localStorage
 * @param {string} domainName - Name of the domain
 * @param {Array} topics - Array of topic objects with completed status
 */
export const saveDomainProgress = (domainName, topics) => {
  try {
    const key = `domain_${domainName.replace(/\s+/g, '_').toLowerCase()}`;
    localStorage.setItem(key, JSON.stringify(topics));
  } catch (error) {
    console.error('Error saving progress to localStorage:', error);
  }
};

/**
 * Load domain progress from localStorage
 * @param {string} domainName - Name of the domain
 * @param {Array} defaultTopics - Default topics if none are saved
 * @returns {Array} - Array of topics with completed status
 */
export const loadDomainProgress = (domainName, defaultTopics) => {
  try {
    const key = `domain_${domainName.replace(/\s+/g, '_').toLowerCase()}`;
    const saved = localStorage.getItem(key);
    
    if (!saved) {
      return defaultTopics;
    }

    const savedTopics = JSON.parse(saved);
    
    // Merge saved completion status with default topics to ensure structure is up to date
    return defaultTopics.map(defaultTopic => {
      const savedTopic = savedTopics.find(t => t.id === defaultTopic.id);
      return {
        ...defaultTopic,
        completed: savedTopic ? savedTopic.completed : false,
        completedAt: savedTopic ? savedTopic.completedAt : null
      };
    });
  } catch (error) {
    console.error('Error loading progress from localStorage:', error);
    return defaultTopics;
  }
};