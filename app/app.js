const express = require('express');
const bodyParser = require('body-parser');

const
  Page = require('./models/page'),
  Movie = require('./models/movie'),
  User = require('./models/user'),
  SearchMovies = require('./models/search-movies');

const
  app = express(),
  port = process.env.PORT || 3000;

require('./db');
app.use(bodyParser.json());

app.listen(port, ()=> {
  //console.log(`running on ${port}`);
});

app.get('/movies/user/:userId/search', (request, response)=> {
  const
    userId = request.params.userId,
    text   = request.query.text.split(','),
    page   = Page.forRequest(request);

  SearchMovies.searchForUser(userId, text, page).then(movies => {
    if(movies.length) {
      response.send({page, movies});
    }else{
      SearchMovies.searchForText(text, page).then(movies => {
        response.send({page, movies});
      }).catch((error)=> {
        response.status(500).send({error: error.message});
      });
    }
  }).catch((error)=> {
    response.status(500).send({error: error.message});
  });
});

app.get('/movies/users', (request, response)=> {
  const
    page = Page.forRequest(request),
    onError = (error)=> response.status(400).send({error: error.message});

  User.getAllByPage(page).then(users => {
    SearchMovies.getPreferencesFor(users).then(userPreferences => {
      response.send({page, userPreferences});
    }).catch(onError);
  }).catch(onError);
});

module.exports = app;
