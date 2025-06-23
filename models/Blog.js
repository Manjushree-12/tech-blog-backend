const mongoose = require('mongoose');
const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String, 
  imageUrl: String, 
   createdAt: { type: Date, default: Date.now } // New field for image URL  // or ObjectId ref: 'User'
}, { timestamps: true });
module.exports = mongoose.model('Blog', blogSchema);
