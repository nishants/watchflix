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
  },
  languages: [{
    id: {
      type: String,
      required: true
    }
  }],
  actors: [{
    name: {
      type: String,
      required: true
    }
  }],
  directors : [{
    name: {
      type: String,
      required: true
    }
  }]
});

MovieSchema.methods.setCredits = function(credits){
  const movie = this;
  movie.actors    = movie.actors.concat(credits.actors);
  movie.directors = movie.directors.concat(credits.directors);
  return movie.save();
};

MovieSchema.methods.preview = function(credits){
  const
    movie       = this,
    title       = movie.title,
    movieId     = movie.movieId,
    tagline     = movie.tagline,
    homepage    = movie.homepage,
    released    = movie.released,
    overview    = movie.overview,
    runtime     = movie.runtime,
    releaseDate = movie.releaseDate;

  return {title, movieId, tagline, homepage, released, overview, runtime, releaseDate};
};

module.exports = mongoose.model('Movie', MovieSchema);