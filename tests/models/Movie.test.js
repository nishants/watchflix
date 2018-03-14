const
  {expect} = require('chai'),
  Movie = require('../../app/models/movie');
require('../../app/db');

describe('Movie', ()=>{
  beforeEach(done =>{
    Movie.remove({}).then(()=> done());
  });

  it("should set movie credits", (done =>{
    const
      actors = [{name: 'actor 1'}, {name: 'actor 2'}],
      directors = [{name: 'directors 1'}, {name: 'directors 2'}];

    new Movie({
      title: "some movie",
      movieId: 1011,
      released: false
    }).save().then(movie =>{
        movie.setCredits({actors, directors}).then(()=> {
          Movie.findById(movie._id.toHexString()).then(savedMovie => {
            const
              savedActors    = savedMovie.actors.map(actor => ({name: actor.name})),
              savedDirectors = savedMovie.directors.map(director => ({name: director.name}));

            expect(savedActors).to.eql(actors);
            expect(savedDirectors).to.eql(directors);
            done();
          });
        });

    })
  }))
})
