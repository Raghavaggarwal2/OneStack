import { useState, useEffect } from 'react';
import { getDomainProgress, updateDomainProgress } from '../services/domainService';
import { toast } from 'react-hot-toast';

const useDomainProgress = (domainName, defaultTopics) => {
  const [topics, setTopics] = useState(defaultTopics);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [previousProgress, setPreviousProgress] = useState(0);

  const domainId = domainName.toLowerCase().replace(/[\/\s]+/g, '-').trim();

  // Load progress when component mounts
  useEffect(() => {
    const loadProgress = async () => {
      try {
        const domainProgress = await getDomainProgress(domainId);
        
        // Clear localStorage data for this domain if no server data exists
        if (!domainProgress) {
          const key = `domain_${domainName.replace(/\s+/g, '_').toLowerCase()}`;
          localStorage.removeItem(key);
          setTopics(defaultTopics.map(topic => ({ ...topic, completed: false })));
          setProgress(0);
          setPreviousProgress(0);
          return;
        }

        if (domainProgress?.topics) {
          // Merge existing completion status with default topics
          const mergedTopics = defaultTopics.map(defaultTopic => {
            const existingTopic = domainProgress.topics.find(t => t.id === defaultTopic.id);
            return existingTopic || { ...defaultTopic, completed: false };
          });
          setTopics(mergedTopics);
          
          // Calculate progress based on completed topics
          const completedCount = mergedTopics.filter(topic => topic.completed).length;
          const calculatedProgress = Math.round((completedCount / mergedTopics.length) * 100);
          setProgress(calculatedProgress);
          setPreviousProgress(calculatedProgress);
        } else {
          // No topics data, reset to defaults
          setTopics(defaultTopics.map(topic => ({ ...topic, completed: false })));
          setProgress(0);
          setPreviousProgress(0);
        }
      } catch (error) {
        console.error('Error loading domain progress:', error);
        // For errors, reset to defaults instead of using localStorage
        setTopics(defaultTopics.map(topic => ({ ...topic, completed: false })));
        setProgress(0);
        setPreviousProgress(0);
      } finally {
        setLoading(false);
      }
    };

    loadProgress();
  }, [domainId, domainName, defaultTopics]);

  const handleProgressChange = async (newProgress) => {
    setProgress(newProgress);
    setPreviousProgress(progress);

    if (newProgress === 100 && progress < 100) {
      toast.success('🎉 Congratulations! You\'ve completed this domain!', {
        duration: 5000,
        position: 'top-center',
      });
    }

    // Show milestone toasts
    const milestones = [25, 50, 75];
    for (const milestone of milestones) {
      if (newProgress >= milestone && progress < milestone) {
        toast.success(`🌟 You've reached ${milestone}% completion!`, {
          duration: 3000,
          position: 'top-center',
        });
        break;
      }
    }
  };  const updateTopics = async (updatedTopics) => {
    try {
      // Save current state for rollback if needed
      const previousTopics = [...topics];
      
      // Calculate progress
      const completedCount = updatedTopics.filter(topic => topic.completed).length;
      const newProgress = Math.round((completedCount / updatedTopics.length) * 100);

      // Optimistically update UI
      setTopics(updatedTopics);
      handleProgressChange(newProgress);

      // Update backend first
      console.log('Updating backend with:', {domainId, domainName, topicsCount: updatedTopics.length});
      const response = await updateDomainProgress(domainId, domainName, updatedTopics);
      
      if (!response || !response.domainProgress) {
        console.error('Failed to update progress:', response);
        // Rollback on failure
        setTopics(previousTopics);
        handleProgressChange(previousProgress);
        throw new Error('Failed to update progress on server');
      }

      // If backend update succeeds, update local state
      setTopics(response.domainProgress.topics);
      handleProgressChange(Math.round((response.domainProgress.completedTopics / response.domainProgress.totalTopics) * 100));
      
      // Then update localStorage as fallback for offline access
      const key = `domain_${domainName.replace(/\s+/g, '_').toLowerCase()}`;
      localStorage.setItem(key, JSON.stringify(updatedTopics));

      // Show success message for completion
      if (newProgress > progress) {
        if (newProgress === 100) {
          toast.success('🎉 Congratulations! You\'ve completed this domain!', {
            duration: 5000
          });
        } else {
          const milestones = [25, 50, 75];
          const achievedMilestone = milestones.find(m => progress < m && newProgress >= m);
          if (achievedMilestone) {
            toast.success(`🌟 You've reached ${achievedMilestone}% in ${domainName}!`, {
              duration: 3000
            });
          }
        }
      }    } catch (error) {
      console.error('Error updating topics:', error);
      
      // Show specific error message if available
      const errorMessage = error.message === 'No authentication token found' 
        ? 'Please log in to save your progress'
        : 'Failed to save progress. Please try again.';
      
      toast.error(errorMessage, {
        duration: 4000,
        position: 'top-center'
      });
      
      if (error.message !== 'No authentication token found') {
        // Only try to load from localStorage if it's not an auth error
        const savedTopics = loadDomainProgress(domainName, defaultTopics);
        setTopics(savedTopics);
      }
    }
  };

  return {
    topics,
    progress,
    loading,
    updateTopics,
    handleProgressChange
  };
};

export default useDomainProgress;