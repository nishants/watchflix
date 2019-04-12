const
    csvReader = require('fast-csv'),
    fs = require('fs'),
    MoviesMapper = require('./movie-mapper');

module.exports = {
  run: path => new Promise((resolve) => {
    let errors = 0;
    fs.createReadStream(path)
        .pipe(csvReader())
        .on('data', data => {
          const isHeader = data[0] === 'budget';
          !isHeader && MoviesMapper.createMovie(data).catch(error => {
            errors++;
            console.log(error.message);
          });
        })
        .on('end', () => {
          console.log(`Finished seeding movies with ${errors} errors`);
          resolve();
        })
  })};
