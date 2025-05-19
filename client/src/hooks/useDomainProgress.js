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
  };

  const updateTopics = async (updatedTopics) => {
    try {
      // Update backend
      await updateDomainProgress(domainId, domainName, updatedTopics);
      setTopics(updatedTopics);
      
      // Update localStorage as fallback
      const key = `domain_${domainName.replace(/\s+/g, '_').toLowerCase()}`;
      localStorage.setItem(key, JSON.stringify(updatedTopics));

      // Calculate and update progress
      const completedCount = updatedTopics.filter(topic => topic.completed).length;
      const newProgress = Math.round((completedCount / updatedTopics.length) * 100);
      handleProgressChange(newProgress);
    } catch (error) {
      console.error('Error updating topics:', error);
      toast.error('Failed to save progress. Please try again.');
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