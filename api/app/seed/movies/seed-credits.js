const
  csvReader = require('fast-csv'),
  fs = require('fs'),
  CreditsMapper = require('./credits-mapper');

module.exports = {
  run: path => new Promise(resolve => {
    let errors = 0;
    fs.createReadStream(path)
      .pipe(csvReader())
      .on('data', data => {
        const isHeader = data[0] === 'movie_id';
        !isHeader && CreditsMapper.setCredits(data).catch(error => {
          errors++;
          // eslint-disable-next-line no-console
          console.error(error.message);
        });
      })
      .on('end', () => {
        // eslint-disable-next-line no-console
        console.log(`Finished seeding credits with ${errors} errors`);
        resolve();
      });
  })
};
