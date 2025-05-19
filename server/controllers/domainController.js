const User = require('../models/User');

// Update domain progress for a user
const updateDomainProgress = async (req, res) => {
  try {
    const { domainId, domainName, topics } = req.body;
    const userId = req.user._id;

    // Enhanced input validation
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'User not authenticated'
      });
    }

    if (!Array.isArray(topics)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid topics data'
      });
    }

    // Validate topics array content
    const isValidTopics = topics.every(topic => 
      typeof topic.id === 'number' && 
      typeof topic.name === 'string' && 
      typeof topic.completed === 'boolean'
    );

    if (!isValidTopics) {
      return res.status(400).json({
        success: false,
        error: 'Invalid topic format in topics array'
      });
    }

    // Validate all required fields are present
    if (!domainId || !domainName) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }

    const now = new Date();
    const updatedTopics = topics.map(topic => ({
      ...topic,
      completedAt: topic.completed ? (topic.completedAt || now) : null
    }));

    const completedTopics = updatedTopics.filter(topic => topic.completed).length;

    // Prepare update with validation
    const domainUpdate = {
      domainId,
      domainName,
      totalTopics: updatedTopics.length,
      completedTopics,
      lastUpdated: now,
      topics: updatedTopics
    };

    // Validate the update object
    if (completedTopics > domainUpdate.totalTopics) {
      return res.status(400).json({
        success: false,
        error: 'Completed topics cannot exceed total topics'
      });
    }

    // Try to update existing domain progress with upsert
    let user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    const existingDomainIndex = user.domainProgress.findIndex(d => d.domainId === domainId);

    if (existingDomainIndex === -1) {
      // Domain progress doesn't exist, push new entry
      user.domainProgress.push(domainUpdate);
    } else {
      // Update existing domain progress
      user.domainProgress[existingDomainIndex] = domainUpdate;
    }

    // Update total completed topics
    const totalCompleted = user.domainProgress.reduce(
      (sum, domain) => sum + domain.completedTopics,
      0
    );
    user.totalTopicsCompleted = totalCompleted;

    // Save the updated user document
    await user.save();

    // Get the updated domain progress for verification
    const updatedDomainProgress = user.domainProgress.find(d => d.domainId === domainId);

    // Verify the update was successful
    if (!updatedDomainProgress) {
      console.error('Domain progress not found after update:', { userId, domainId });
      return res.status(500).json({
        success: false,
        error: 'Failed to verify domain progress update'
      });
    }

    // Log successful update
    console.log('Domain progress updated successfully:', {
      userId,
      domainId,
      completedTopics: updatedDomainProgress.completedTopics,
      totalTopics: updatedDomainProgress.totalTopics
    });

    res.json({
      success: true,
      domainProgress: updatedDomainProgress,
      totalTopicsCompleted: user.totalTopicsCompleted
    });

  } catch (error) {
    console.error('Error updating domain progress:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update domain progress'
    });
  }
};

// Get domain progress for a user
const getDomainProgress = async (req, res) => {
  try {
    const userId = req.user._id; // Fix: Use _id instead of id
    const { domainId } = req.params;

    const user = await User.findById(userId);
    const domainProgress = user.domainProgress.find(
      d => d.domainId === domainId
    );

    // For new users or domains without progress, return null
    if (!domainProgress) {
      return res.json({
        success: true,
        domainProgress: null
      });
    }

    res.json({
      success: true,
      domainProgress
    });

  } catch (error) {
    console.error('Error fetching domain progress:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch domain progress' 
    });
  }
};

// Get all domains progress for a user
const getAllDomainsProgress = async (req, res) => {
  try {
    const userId = req.user._id; // Fix: Use _id instead of id
    const user = await User.findById(userId);

    res.json({
      success: true,
      domainsProgress: user.domainProgress,
      totalTopicsCompleted: user.totalTopicsCompleted
    });

  } catch (error) {
    console.error('Error fetching all domains progress:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch domains progress' 
    });
  }
};

// Get recent domain activity for a user
const getRecentActivity = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);    // Get all domain progress entries and flatten topics
    const recentActivity = user.domainProgress.reduce((activities, domain) => {
        const domainTopics = domain.topics
          .filter(topic => topic.completed)
          .map(topic => ({
            type: 'completed',
            title: `Completed ${topic.name}`,
            time: topic.completedAt || new Date(),
            domainId: domain.domainId,
            domainName: domain.domainName,
            topicId: topic.id
          }));
        return [...activities, ...domainTopics];
      }, [])
      // Sort by completion time, most recent first
      .sort((a, b) => new Date(b.time) - new Date(a.time))
      // Take the last 35 completed topics
      .slice(0, 35);

    res.json({
      success: true,
      recentActivity
    });

  } catch (error) {
    console.error('Error fetching recent activity:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch recent activity' 
    });
  }
};

module.exports = {
  updateDomainProgress,
  getDomainProgress,
  getAllDomainsProgress,
  getRecentActivity
};