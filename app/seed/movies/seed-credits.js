const
  argv = require('yargs').argv,
  csvReader = require('fast-csv'),
  fs = require('fs'),
  CreditsMapper = require('./credits-mapper');

require('../../db');

(path => {

  if(!path) return console.error("Please provide a file path for movies data using command 'yarn seed -- --credits=path/to/file' ");
  let errors = 0;
  fs.createReadStream(path)
    .pipe(csvReader())
    .on('data', data => {
      const isHeader = data[0] === 'movie_id';
      !isHeader && CreditsMapper.setCredits(data).catch(error => {
        errors++;
        console.error("------------ Error ---------------");
        console.error(data);
        console.error(error);
      });
    })
    .on('end' , () => {
      console.log(`Finished seeding credits with ${errors} errors`)
    })
})(argv.credits);
