const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Parse the MongoDB URI to handle the database name properly
    let mongoUri = process.env.MONGO_URI;
    
    // Extract the URI parts to properly handle the database name
    const [uriWithoutParams, queryParams] = mongoUri.split('?');
    let finalUri = uriWithoutParams;
    
    // Add the database name if not already specified
    if (!finalUri.includes('/OneStack')) {
      if (finalUri.endsWith('/')) {
        finalUri += 'OneStack';
      } else {
        finalUri += '/OneStack'; 
      }
    }
    
    // Add back the query parameters if they exist
    if (queryParams) {
      finalUri += '?' + queryParams;
    }
    
    console.log(`Attempting to connect to MongoDB database: OneStack`);
    
    const conn = await mongoose.connect(finalUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Connected to database: ${conn.connection.name}`);
    
    // Test the User collection
    const collections = await conn.connection.db.listCollections().toArray();
    console.log('Available collections:', collections.map(c => c.name));
    
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
