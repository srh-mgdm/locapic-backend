const mongoose = require('mongoose');

const placeSchema = mongoose.Schema({
  nickname: String,
  name: String,
  latitude: Number,
  longitude: Number,
});

const Place = mongoose.model('places', placeSchema);

module.exports = Place;
