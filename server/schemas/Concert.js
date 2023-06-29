const mongoose = require('mongoose');

const ConcertSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    venue: {
      type: String,
      required: true
    },
    artist: {
      type: String,
      required: true
    },
    posts: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    }]
});

module.exports = mongoose.model('Concert', ConcertSchema);