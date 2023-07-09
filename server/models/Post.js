const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  review: {
    type: String,
    required: true
  },
  media: [String],
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
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Post', PostSchema);
