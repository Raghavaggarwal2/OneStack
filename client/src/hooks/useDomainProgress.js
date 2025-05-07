import { useState, useEffect } from 'react';
import { getDomainProgress, updateDomainProgress } from '../services/domainService';
import { toast } from 'react-hot-toast';

export const useDomainProgress = (domainName, defaultTopics) => {
  const [topics, setTopics] = useState(defaultTopics);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [previousProgress, setPreviousProgress] = useState(0);

  const domainId = domainName.toLowerCase().replace(/\s+/g, '-');

  useEffect(() => {
    const loadProgress = async () => {
      try {
        const domainProgress = await getDomainProgress(domainId);
        if (domainProgress?.topics) {
          setTopics(domainProgress.topics);
          const calculatedProgress = Math.round(
            (domainProgress.completedTopics / domainProgress.totalTopics) * 100
          );
          setProgress(calculatedProgress);
          setPreviousProgress(calculatedProgress);
        }
      } catch (error) {
        console.error('Error loading domain progress:', error);
        // Fallback to localStorage
        try {
          const key = `domain_${domainName.replace(/\s+/g, '_').toLowerCase()}`;
          const savedData = localStorage.getItem(key);
          if (savedData) {
            const savedTopics = JSON.parse(savedData);
            setTopics(savedTopics);
            const completedCount = savedTopics.filter(topic => topic.completed).length;
            const calculatedProgress = Math.round((completedCount / savedTopics.length) * 100);
            setProgress(calculatedProgress);
            setPreviousProgress(calculatedProgress);
          }
        } catch (localError) {
          console.error('Error loading from localStorage:', localError);
        }
      } finally {
        setLoading(false);
      }
    };

    loadProgress();
  }, [domainId, domainName]);

  const handleProgressChange = async (newProgress) => {
    setProgress(newProgress);

    // Show completion toast if just reached 100%
    if (newProgress === 100 && previousProgress < 100) {
      toast.success('🎉 Congratulations! You\'ve completed this domain!', {
        duration: 5000,
        position: 'top-center',
      });
    }

    // Show milestone toasts
    const milestones = [25, 50, 75];
    for (const milestone of milestones) {
      if (newProgress >= milestone && previousProgress < milestone) {
        toast.success(`🌟 You've reached ${milestone}% completion!`, {
          duration: 3000,
          position: 'top-center',
        });
        break;
      }
    }

    setPreviousProgress(newProgress);
  };

  const updateTopics = async (updatedTopics) => {
    try {
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