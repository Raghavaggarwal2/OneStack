const User = require('../models/User');

// Update domain progress for a user
const updateDomainProgress = async (req, res) => {
  try {
    const { domainId, domainName, topics } = req.body;
    const userId = req.user.id; // From auth middleware

    const completedTopics = topics.filter(topic => topic.completed).length;

    const update = {
      $set: {
        'domainProgress.$[elem]': {
          domainId,
          domainName,
          totalTopics: topics.length,
          completedTopics,
          lastUpdated: new Date(),
          topics
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
              totalTopics: topics.length,
              completedTopics,
              lastUpdated: new Date(),
              topics
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
    ) || null;

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

module.exports = {
  updateDomainProgress,
  getDomainProgress,
  getAllDomainsProgress
};