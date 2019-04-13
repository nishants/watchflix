const
  fs = require('fs'),
  User = require('./../../models/user'),
  isoLangIds = require('../../config/ISO-639-1-language.json');

module.exports = {
  run: async path => {
    var users = eval(fs.readFileSync(path, 'utf8'));
    let usersCreated = 0;
    for (let i = 0; i < users.length; i++) {
      const userData = users[i];
      const userId = Object.keys(userData)[0];

      try {
        await new User({
          userId: userId,
          languages: userData[userId].preferred_languages.map(lang => ({ id: isoLangIds.find(l => l.name.indexOf(lang) > -1).code })),
          favoriteActors: userData[userId].favourite_actors.map(actor => ({ name: actor })),
          favoriteDirectors: userData[userId].favourite_directors.map(director => ({ name: director }))
        }).save();
        usersCreated++;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(`Skipping user with id ${userId}, already exists.`);
      }
    }

    // eslint-disable-next-line no-console
    console.log(`Created ${usersCreated} users `);
  }
};
