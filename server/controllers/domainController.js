const User = require('../models/User');

// Update domain progress for a user
const updateDomainProgress = async (req, res) => {
  try {
    const { domainId, domainName, topics } = req.body;
    const userId = req.user.id;

    // Add completedAt timestamp for newly completed topics
    const now = new Date();
    const updatedTopics = topics.map(topic => {
      if (topic.completed && !topic.completedAt) {
        return { ...topic, completedAt: now };
      }
      return topic;
    });

    const completedTopics = updatedTopics.filter(topic => topic.completed).length;

    const update = {
      $set: {
        'domainProgress.$[elem]': {
          domainId,
          domainName,
          totalTopics: updatedTopics.length,
          completedTopics,
          lastUpdated: now,
          topics: updatedTopics
        }
      }
    };

    const arrayFilters = [{ 'elem.domainId': domainId }];
    
    // Try to update existing domain progress
    let user = await User.findOne({ 
      _id: userId,
      'domainProgress.domainId': domainId 
    });

    if (!user) {
      // Domain progress doesn't exist, push new entry
      user = await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            domainProgress: {
              domainId,
              domainName,
              totalTopics: updatedTopics.length,
              completedTopics,
              lastUpdated: now,
              topics: updatedTopics
            }
          }
        },
        { new: true }
      );
    } else {
      // Update existing domain progress
      user = await User.findByIdAndUpdate(
        userId,
        update,
        { 
          arrayFilters,
          new: true 
        }
      );
    }

    // Update total completed topics
    const totalCompleted = user.domainProgress.reduce(
      (sum, domain) => sum + domain.completedTopics, 
      0
    );
    
    user = await User.findByIdAndUpdate(
      userId,
      { totalTopicsCompleted: totalCompleted },
      { new: true }
    );

    res.json({
      success: true,
      domainProgress: user.domainProgress.find(d => d.domainId === domainId),
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
    const userId = req.user.id;
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
    const userId = req.user.id;
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
    const user = await User.findById(userId);

    // Get all domain progress entries and flatten topics
    const recentActivity = user.domainProgress
      .reduce((activities, domain) => {
        const domainTopics = domain.topics
          .filter(topic => topic.completed)
          .map(topic => ({
            type: 'completed',
            title: `Completed ${topic.name} in ${domain.domainName}`,
            time: topic.completedAt || new Date(),
            domainId: domain.domainId,
            topicId: topic.id
          }));
        return [...activities, ...domainTopics];
      }, [])
      // Sort by completion time, most recent first
      .sort((a, b) => new Date(b.time) - new Date(a.time))
      // Take only the last 5 completed topics
      .slice(0, 5);

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