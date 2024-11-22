require('dotenv').config(); // Load environment variables from .env file

const mongoose = require('mongoose');
const Item = require('../models/ItemModel'); // Import the Item model

const MONGODB_URI = process.env.MONGODB_URI; // MongoDB URI from the .env file

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Connect to MongoDB if not already connected
  if (mongoose.connection.readyState !== 1) {
    try {
      await mongoose.connect(MONGODB_URI);
      console.log('MongoDB Connected:', mongoose.connection.readyState); // Log the connection state
    } catch (error) {
      return res.status(500).json({ message: 'Database connection failed', error });
    }
  }

  try {
    const items = await Item.find(); // Retrieve all items from the collection
    console.log('Items Retrieved:', items); // Log the items fetched
    res.status(200).json(items); // Return the fetched data
  } catch (error) {
    res.status(500).json({ message: 'Error fetching items', error });
  }
};
