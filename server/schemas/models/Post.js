const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  photos: [String], // if photos are stored at a URL, this will link to them
  videos: [String], // if videos are stored at a URL, this will link to them
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  concert: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Concert',
    required: true
  },
  votes: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Post', PostSchema);
