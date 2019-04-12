const
  Movie = require('./../../models/movie');

module.exports = {
  setCredits: (csvRow) => {
    const movieId = parseInt(csvRow[0]),
      toValidJSONString = (text) => text.replace(/\"\"/g, '"');
    return Movie.findOne({movieId}).then(movie => {
      var actorsJSOn = csvRow[2];
      var directorsJson = csvRow[3];
      const
        actors = JSON.parse(actorsJSOn),
        directors = JSON.parse(directorsJson).filter(crew => crew.job === 'Director');

      return movie.setCredits({actors, directors});
    });
  }
};