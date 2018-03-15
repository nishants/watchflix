const
  argv = require('yargs').argv,
  fs = require('fs'),
  User = require('./../../models/user'),
  isoLangIds = require('../../config/ISO-639-1-language.json');

(path => {

  if(!path) return console.error("Please provide a file path for movies data using command 'yarn seed -- --users=path/to/file.json' ");
  var users = eval(fs.readFileSync(path, 'utf8'));
  users.forEach(userData => {
    const userId = Object.keys(userData)[0];
    new User({
      userId: userId,
      languages: userData[userId].preferred_languages.map(lang => ({id: isoLangIds.find(l => l.name.indexOf(lang) > -1).code})),
      favoriteActors: userData[userId].favourite_actors.map(actor => ({name: actor})),
      favoriteDirectors: userData[userId].favourite_directors.map(director => ({name: director})),
    }).save();
  });

})(argv.users);
