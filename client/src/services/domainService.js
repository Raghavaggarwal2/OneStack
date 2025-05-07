import { API_URL } from '../constants/api';

export const updateDomainProgress = async (domainId, domainName, topics) => {
  try {
    const token = JSON.parse(localStorage.getItem('user'))?.token;
    if (!token) throw new Error('No authentication token found');

    const response = await fetch(`${API_URL}/domains/progress`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ domainId, domainName, topics })
    });

    const data = await response.json();
    if (!data.success) throw new Error(data.error);
    
    return data;
  } catch (error) {
    console.error('Error updating domain progress:', error);
    throw error;
  }
};

export const getDomainProgress = async (domainId) => {
  try {
    const token = JSON.parse(localStorage.getItem('user'))?.token;
    if (!token) throw new Error('No authentication token found');

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
    const token = JSON.parse(localStorage.getItem('user'))?.token;
    if (!token) throw new Error('No authentication token found');

    const response = await fetch(`${API_URL}/domains/progress`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
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