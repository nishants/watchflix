const
  {expect} = require('chai'),
  MoviesMapper = require('../../app/models/movie-mapper'),
  Movie = require('../../app/models/movie');

describe("Seed movies", ()=> {
  const
    validMovieRow = [
      237000000,
      "[{\"id\": 28, \"name\": \"Action\"}, {\"id\": 12, \"name\": \"Adventure\"}, {\"id\": 14, \"name\": \"Fantasy\"}, {\"id\": 878, \"name\": \"Science Fiction\"}]"
      ,"http://www.avatarmovie.com/"
      ,
      19995,
      "[{\"id\": 1463, \"name\": \"culture clash\"}, {\"id\": 2964, \"name\": \"future\"}, {\"id\": 3386, \"name\": \"space war\"}, {\"id\": 3388, \"name\": \"space colony\"}, {\"id\": 3679, \"name\": \"society\"}, {\"id\": 3801, \"name\": \"space travel\"}, {\"id\": 9685, \"name\": \"futuristic\"}, {\"id\": 9840, \"name\": \"romance\"}, {\"id\": 9882, \"name\": \"space\"}, {\"id\": 9951, \"name\": \"alien\"}, {\"id\": 10148, \"name\": \"tribe\"}, {\"id\": 10158, \"name\": \"alien planet\"}, {\"id\": 10987, \"name\": \"cgi\"}, {\"id\": 11399, \"name\": \"marine\"}, {\"id\": 13065, \"name\": \"soldier\"}, {\"id\": 14643, \"name\": \"battle\"}, {\"id\": 14720, \"name\": \"love affair\"}, {\"id\": 165431, \"name\": \"anti war\"}, {\"id\": 193554, \"name\": \"power relations\"}, {\"id\": 206690, \"name\": \"mind and soul\"}, {\"id\": 209714, \"name\": \"3d\"}]",
      "en",
      "Avatar",
      "Avatar overview",
      150.437577,
      "[{\"name\": \"Ingenious Film Partners\", \"id\": 289}, {\"name\": \"Twentieth Century Fox Film Corporation\", \"id\": 306}, {\"name\": \"Dune Entertainment\", \"id\": 444}, {\"name\": \"Lightstorm Entertainment\", \"id\": 574}]",
      "[{\"iso_3166_1\": \"US\", \"name\": \"United States of America\"}, {\"iso_3166_1\": \"GB\", \"name\": \"United Kingdom\"}]",
      "2009-12-10",
      2787965087,
      162,
      "[{\"iso_639_1\": \"en\", \"name\": \"English\"}, {\"iso_639_1\": \"es\", \"name\": \"Espa\u00f1ol\"}]",
      "Released",
      "Enter the World of Pandora.",
      "Avatar",
      7.2,
      11800
    ];

  beforeEach(done => {
    Movie.remove({}).then(()=> {
      console.log('Removed movies')
      done();
    });
  });

  it("should save csv row as Movie", (done)=> {
    MoviesMapper.createMovie(validMovieRow).then(()=> {
      Movie.find({}).then(movies => {
        const createdMovie = movies[0];
        expect(createdMovie).to.include({
          title       : 'Avatar',
          movieId     : 19995,
          tagline     : 'Enter the World of Pandora.',
          homepage    : 'http://www.avatarmovie.com/',
          released    : true,
          runtime     : 162,
          releaseDate : '2009-12-10',
          overview    : 'Avatar overview',
          originalLanguage: 'en',
        });

        done();
      });
    });
  });
});