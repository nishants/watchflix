const argv = require('yargs').argv;
const { mongoose } = require('../db');

const
  SeedUsers = require('./movies/seed-users'),
  SeedMovies = require('./movies/seed-movies'),
  SeedCredits = require('./movies/seed-credits'),
  seedTasks = [];

argv.users && seedTasks.push(SeedUsers.run(argv.users));
argv.movies && seedTasks.push(SeedMovies.run(argv.movies));
argv.credits && seedTasks.push(SeedCredits.run(argv.credits));

Promise.all(seedTasks).then(() => {
  mongoose.connection.close();
}).catch(e => {
  mongoose.connection.close();
  // eslint-disable-next-line no-console
  console.error('Errors while seeding : ', e);
});
