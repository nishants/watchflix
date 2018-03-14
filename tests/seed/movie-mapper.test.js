const
  {expect} = require('chai'),
  MoviesMapper = require('../../app/seed/movies/movie-mapper'),
  Movie = require('../../app/models/movie');

require('../../app/db');

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
    ],
    rowWithMultipleHomepages = [
      0,
      "[{\"id\": 53, \"name\": \"Thriller\"}, {\"id\": 9648, \"name\": \"Mystery\"}, {\"id\": 878, \"name\": \"Science Fiction\"}]",
      "http://www.cargoderfilm.ch http://cargothemovie.com",
      34069,
      "[{\"id\": 3388, \"name\": \"space colony\"}, {\"id\": 3801, \"name\": \"space travel\"}, {\"id\": 3972, \"name\": \"simulated reality \"}, {\"id\": 9831, \"name\": \"spaceship\"}, {\"id\": 9937, \"name\": \"suspense\"}, {\"id\": 158022, \"name\": \"cargo ship\"}, {\"id\": 193149, \"name\": \"suspended animation\"}, {\"id\": 210367, \"name\": \"loneliness in space\"}]",
      "de",
      "Cargo",
      "The story of CARGO takes place on rusty space-freighter KASSANDRA on its way to Station 42. The young medic LAURA is the only one awake on board while the rest of the crew lies frozen in hibernation sleep. In 4 months will Laura's shift be over.,10.142218",
      ,
      "[{\"name\": \"Telepool\", \"id\": 823}, {\"name\": \"Atlantis Pictures\", \"id\": 5564}, {\"name\": \"Schweizerische Radio- und Fernsehgesellschaft (SRG)\", \"id\": 23072}, {\"name\": \"Ascot Elite Entertainment Group\", \"id\": 26025}, {\"name\": \"Egli Film\", \"id\": 26026}, {\"name\": \"Teleclub AG\", \"id\": 26027}, {\"name\": \"Centauri Media\", \"id\": 26029}]",
      "[{\"iso_3166_1\": \"CH\", \"name\": \"Switzerland\"}]",
      "2009-09-24",
      0,
      120,
      "[{\"iso_639_1\": \"fr\", \"name\": \"Fran\u00e7ais\"}, {\"iso_639_1\": \"de\", \"name\": \"Deutsch\"}]",
      "Released", ,
      "Cargo",
      5.9,
      140
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
        const languages = createdMovie.languages.map(lang => ({id: lang.id}));
        expect(languages).to.eql([{id: 'en'}, {id: 'es'}]);
        done();
      });
    });
  });

  it("should parse row with multiple homepages", (done)=> {
    MoviesMapper.createMovie(rowWithMultipleHomepages).then(()=> {
      Movie.find({}).then(movies => {
        const createdMovie = movies[0];
        expect(createdMovie).to.include({
          title       : 'Cargo',
          movieId     : 34069,
          homepage    : 'http://www.cargoderfilm.ch'
        });

        done();
      });
    });
  });

});