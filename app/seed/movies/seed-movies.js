const
  argv = require('yargs').argv,
  csvReader = require('fast-csv'),
  fs = require('fs'),
  MoviesMapper = require('./movie-mapper');

require('../../db');

(path => {

  if(!path) return console.error("Please provide a file path for movies data using command 'yarn seed -- --movies=path/to/file' ");
  let errors = 0;
  fs.createReadStream(path)
    .pipe(csvReader())
    .on('data', data => {
      const isHeader = data[0] === 'budget';
      !isHeader && MoviesMapper.createMovie(data).catch(error => {
        errors++;
        console.error("------------ Error ---------------");
        console.error(data);
        console.error(error);
      });
    })
    .on('end' , () => {
      console.log(`Finished seeding movies with ${errors} errors`)
    })
})(argv.movies);
