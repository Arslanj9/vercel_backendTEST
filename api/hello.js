// api/hello.js
const mongoose = require('mongoose');
const Item = require('../models/ItemModel'); // Import the Item model

// MongoDB connection URL (replace with your actual MongoDB Atlas connection string)
const MONGODB_URI = process.env.MONGODB_URI;

// Function to handle the GET request and retrieve data from MongoDB
module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Connect to MongoDB if not already connected
  if (mongoose.connection.readyState !== 1) {
    try {
      await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    } catch (error) {
      return res.status(500).json({ message: 'Database connection failed', error });
    }
  }

  // Fetch data from the Item model (collection)
  try {
    const items = await Item.find(); // Retrieve all items from the collection
    res.status(200).json(items); // Return the fetched data
  } catch (error) {
    res.status(500).json({ message: 'Error fetching items', error });
  }
};
