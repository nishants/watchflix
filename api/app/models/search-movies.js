const
  Movie = require('./movie'),
  User  = require('./user');

const SearchMovies = {
  searchByPreference: (languages, actors, directors, text, page)=> {
    return new Promise((resolve, reject)=> {
      Movie.find(
        {
          $or: [
            {'actors.name'   : {$in: actors}},
            {'directors.name': {$in: directors}}
          ],
          $and: [
            {'languages.id'  : {$in: languages}},
            { $text          : { $search: text }}
          ]
        }
      ).skip(page.index * page.size)
        .limit(page.size)
        .sort({title: 1})
        .exec(function (error, movies) {
          if (error) {
            return reject(error);
          }
          return resolve(movies.map(movie => movie.preview()));
        });

    });
  },

  searchForUser: (userId, text, page)=> {
    return User.findByUserId(userId).then(user => {
      return SearchMovies.searchByPreference(
        user.languages.map(lang => lang.id),
        user.favoriteActors.map(actor => actor.name),
        user.favoriteDirectors.map(director => director.name),
        text.map(phrase=> `"${phrase}"`).join(),
        page
      );
    });
  },

  searchForText: (text, page)=> {
    return new Promise((resolve, reject)=> {
      Movie.find(
        {$text: {$search: text.map(phrase=> `"${phrase}"`).join()}}
      ).skip(page.index * page.size)
        .limit(page.size)
        .sort({title: 1})
        .exec(function (error, movies) {
          if (error) {
            return reject(error);
          }
          return resolve(movies.map(movie => movie.preview()));
        });
    });
  },

  preferredMovies: (languages, actors, directors, page)=> {
    return new Promise((resolve, reject)=> {
      Movie.find(
        {
          $or: [
            {'actors.name'   : {$in: actors}},
            {'directors.name': {$in: directors}}
          ],
          $and: [
            {'languages.id'  : {$in: languages}}
          ]
        }
      ).skip(page.index * page.size)
        .limit(page.size)
        .sort({title: 1})
        .exec(function (error, movies) {
          if (error) {
            return reject(error);
          }
          return resolve(movies.map(movie => movie.preview()));
        });

    });
  },

  getPreferencesFor: (users)=> {
    const
      promises = [],
      preferences = [];
    users.forEach(user =>  {
      promises.push(
        SearchMovies.preferredMovies(
          user.languages.map(lang => lang.id),
          user.favoriteActors.map(actor => actor.name),
          user.favoriteDirectors.map(director => director.name),
          {size: 3, index: 0}
        ).then(movies => preferences.push({
          user: user.userId,
          movies: movies.map(movie => movie.title)
        })));
    });
    return Promise.all(promises).then(()=>{
      return preferences;
    });
  }
};

module.exports = SearchMovies;
