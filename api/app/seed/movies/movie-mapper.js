const
  Movie = require('./../../models/movie'),
  elasticClient = require('../../elastic-search-client');

module.exports = {
  createMovie: (csvRow)=> {
    return new Movie({
      title       : csvRow[17],
      movieId     : csvRow[3],
      tagline     : csvRow[16],
      homepage    : csvRow[2].split(' ')[0],
      released    : csvRow[15]=== 'Released',
      runtime     : csvRow[13],
      releaseDate : csvRow[11],
      overview    : csvRow[7],
      originalLanguage: csvRow[5],
      languages   : JSON.parse(csvRow[14]).map(lang => ({id: lang.iso_639_1}))
    }).save().then(movie => {
      return elasticClient.create(movie.elasticData());
    });
  }
};
