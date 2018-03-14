const
  mongoose = require('mongoose'),
  validator = require('validator');

var MovieSchema = new mongoose.Schema({
  title: {
    type      : String,
    required  : true,
    minlength : 1,
    trim      : true,
  },
  movieId: {
    type    : Number,
    required: true,
    unique  : true,
  },
  tagline: {
    type    : String,
    trim    : true,
  },
  homepage: {
    type    : String,
    trim    : true,
    validate: {
      validator : (value)=> !value.trim().length || validator.isURL(value),
      message   : 'expected {VALUE} to be a valid URL'
    }
  },
  released: {
    type    : Boolean,
    required: true,
  },
  runtime: {
    type    : Number
  },
  releaseDate: {
    type: String,
    trim: true,
    validate: {
      validator : (date)=>  !date.trim().length || /(\d{4})-(\d{2})-(\d{2})/.test(date),
      message   : 'expected {VALUE} to be a valid YYYY-MM-DD string'
    }
  },
  overview: {
    type: String,
    trim: true,
  },
  originalLanguage: {
    type: String,
    trim: true,
  }
});

module.exports = mongoose.model('Movie', MovieSchema);

/*
* Fields
* - homepage
* - tagline
* - status
* - runtime
* - release_date
* - overview
* - original_language
* - keywords
* */