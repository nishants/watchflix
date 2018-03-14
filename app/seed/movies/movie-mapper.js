const
  Movie = require('./../../models/movie'),
  mapRowToModle = ()=> {}

module.exports = {
  createMovie: (csvRow)=> {
    return new Movie({
      title       : csvRow[17],
      movieId     : csvRow[3],
      tagline     : csvRow[16],
      homepage    : csvRow[2],
      released    : csvRow[15]=== "Released",
      runtime     : csvRow[13],
      releaseDate : csvRow[11],
      overview    : csvRow[7],
      originalLanguage: csvRow[5],
    }).save();
  }
}