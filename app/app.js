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
    response.send({movies});
  }).catch((error)=> {
    response.status(500).send({error: error.message});
  });
});
module.exports = app;
