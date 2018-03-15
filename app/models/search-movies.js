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
            {'languages.id'  : {$in: languages}}
          ]
        }
      ).skip(page.index * page.size)
        .limit(page.size)
        //.sort({_id: 1})
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
        text,
        page
      );
    });
  }
};

module.exports = SearchMovies;