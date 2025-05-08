const mongoose = require('mongoose');
const { isEmail } = require('validator');

const topicSchema = new mongoose.Schema({
  id: Number,
  name: String,
  completed: Boolean,
  completedAt: Date
});

const domainProgressSchema = new mongoose.Schema({
  domainId: String,
  domainName: String,
  totalTopics: Number,
  completedTopics: Number,
  lastUpdated: Date,
  topics: [topicSchema]
});

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    validate: [isEmail, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [10, 'Password must be at least 10 characters long']
  },
  // Profile fields
  profileImage: {
    type: String,
    trim: true
  },
  techStack: {
    type: [String],
    default: []
  },
  age: {
    type: Number,
    min: 0
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other', '']
  },
  // Education details
  degree: {
    type: String,
    trim: true
  },
  university: {
    type: String,
    trim: true
  },
  yearOfPassing: {
    type: Number
  },
  domainProgress: [domainProgressSchema],
  totalTopicsCompleted: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Remove password from json responses
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

// Create the model
const User = mongoose.model('User', userSchema);

// Function to ensure email uniqueness without using MongoDB's unique index
// This avoids the 11000 error completely by doing a manual check
User.createUser = async function(userData) {
  try {
    // Check if user exists
    const existingUser = await this.findOne({ email: userData.email });
    if (existingUser) {
      throw new Error('Email already exists');
    }
    
    // Create user
    const user = new this(userData);
    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = User;
