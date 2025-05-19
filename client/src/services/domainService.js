import { API_URL } from '../constants/api';

export const updateDomainProgress = async (domainId, domainName, topics) => {
  try {
    const userData = localStorage.getItem('user');
    if (!userData) throw new Error('User data not found');
    
    const { token } = JSON.parse(userData);
    if (!token) throw new Error('No authentication token found');
    
    // Validate topics array
    if (!Array.isArray(topics)) throw new Error('Invalid topics data');

    const response = await fetch(`${API_URL}/domains/progress`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        domainId,
        domainName,
        topics: topics.map(topic => ({
          ...topic,
          completedAt: topic.completed && !topic.completedAt ? new Date().toISOString() : topic.completedAt
        }))
      })
    });    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to update progress');
    }

    console.log('Domain progress updated successfully:', data);
    return data;
  } catch (error) {
    console.error('Error updating domain progress:', error);
    throw error;
  }
};

export const getDomainProgress = async (domainId) => {
  try {
    // Get user data from localStorage
    const userData = localStorage.getItem('user');
    if (!userData) {
      console.warn('User data not found in localStorage');
      return null;
    }
    
    const { token } = JSON.parse(userData);
    if (!token) {
      console.warn('Token not found in user data');
      return null;
    }

    const response = await fetch(`${API_URL}/domains/progress/${domainId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();
    if (!data.success) throw new Error(data.error);
    
    return data.domainProgress;
  } catch (error) {
    console.error('Error fetching domain progress:', error);
    throw error;
  }
};

export const getAllDomainsProgress = async () => {
  try {
    const userData = localStorage.getItem('user');
    if (!userData) {
      throw new Error('Please log in to view your progress');
    }

    const parsedUserData = JSON.parse(userData);
    if (!parsedUserData?.token) {
      // Clear invalid user data
      localStorage.removeItem('user');
      throw new Error('Session expired. Please log in again');
    }

    const response = await fetch(`${API_URL}/domains/progress`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${parsedUserData.token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });

    const data = await response.json();
    if (!data.success) throw new Error(data.error);
    
    return {
      domainsProgress: data.domainsProgress,
      totalTopicsCompleted: data.totalTopicsCompleted
    };
  } catch (error) {
    console.error('Error fetching all domains progress:', error);
    throw error;
  }
};

export const getRecentActivity = async () => {
  try {
    const token = JSON.parse(localStorage.getItem('user'))?.token;
    if (!token) throw new Error('No authentication token found');

    const response = await fetch(`${API_URL}/domains/recent-activity`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();
    if (!data.success) throw new Error(data.error);
    
    return data.recentActivity;
  } catch (error) {
    console.error('Error fetching recent activity:', error);
    throw error;
  }
};