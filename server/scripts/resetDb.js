/**
 * This is a utility script to completely reset the database
 * Run with: node scripts/resetDb.js
 */

require('dotenv').config();
const mongoose = require('mongoose');

async function resetDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    
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

    console.log(`Connected to MongoDB: ${conn.connection.host}`);
    console.log(`Database name: ${conn.connection.name}`);

    // Get all collections
    console.log('Fetching collections...');
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log(`Found ${collections.length} collections`);

    // Drop each collection
    for (const collection of collections) {
      console.log(`Dropping collection: ${collection.name}`);
      await mongoose.connection.db.dropCollection(collection.name);
    }

    console.log('All collections have been dropped. Database is now empty.');
    
    // Create any necessary indexes
    console.log('Setting up initial database state...');
    // Add any initialization code here if needed
    
    console.log('Database reset completed successfully.');
  } catch (error) {
    console.error('Error resetting database:', error);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('MongoDB connection closed.');
    process.exit(0);
  }
}

// Run the function
resetDatabase(); 