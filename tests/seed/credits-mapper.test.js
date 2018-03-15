const
  {expect} = require('chai'),
  CreditsMapper = require('../../app/seed/movies/credits-mapper'),
  Movie = require('../../app/models/movie');

require('../../app/db');

describe("Seed movies", ()=> {
  const
    validCreditsRow = [
      19995,
      'Avatar',
      "[{\"cast_id\": 242, \"character\": \"Jake Sully\", \"credit_id\": \"5602a8a7c3a3685532001c9a\", \"gender\": 2, \"id\": 65731, \"name\": \"Sam Worthington\", \"order\": 0}]",
      "[{\"credit_id\": \"52fe48009251416c750aca23\", \"department\": \"Editing\", \"gender\": 0, \"id\": 1721, \"job\": \"Director\", \"name\": \"Stephen E. Rivkin\"}]"
    ];

  beforeEach(done => {
    Movie.remove({}).then(()=> {
      console.log('Removed movies')
      done();
    });
  });

  it("should save csv row as Movie", (done)=> {
    const movieId = 19995;
    new Movie({movieId, title: 'Some movie', released: false}).save().then(movie => {
      CreditsMapper.setCredits(validCreditsRow).then((movie)=> {
        expect(movie.actors[0].name).to.eql('Sam Worthington');
        expect(movie.directors[0].name).to.eql('Stephen E. Rivkin');
        done();
      })
    });
  });

});