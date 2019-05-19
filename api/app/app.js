const express = require('express');
const bodyParser = require('body-parser');

const
  elasticSearchClient = require('./elastic-search-client'),
  Page = require('./models/page'),
  User = require('./models/user'),
  SearchMovies = require('./models/search-movies');

const
  app = express(),
  port = process.env.PORT || 3000;

require('./db');
app.use(bodyParser.json());

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`running on ${port}`);
});

app.get('/ping', (request, response) => {
  response.send({ message: 'hello' });
});

app.get('/movies/user/:userId/search', (request, response) => {
  const
    userId = request.params.userId,
    text = request.query.text.split(','),
    page = Page.forRequest(request),

    sendMovies = movies => response.send({ page, movies }),
    sendError = error => response.status(400).send({ error: error.message });

  SearchMovies.searchForUser(userId, text, page).then(movies => {
    movies.length ?
      sendMovies(movies)
      : SearchMovies.searchForText(text, page).then(sendMovies).catch(sendError);
  }).catch(sendError);
});

app.get('/movies/users', (request, response) => {
  const
    page = Page.forRequest(request),
    sendPreferences = userPreferences => {
      response.send({ page, userPreferences });
    },
    onError = (error) => response.status(400).send({ error: error.message });

  User.getAllByPage(page).then(users => {
    SearchMovies.getPreferencesFor(users).then(sendPreferences).catch(onError);
  }).catch(onError);
});

app.get('/search', (request, response) => {
  const
    text = (request.query.text || '').split(',').pop(),
    onError = (error) => response.status(500).send({ error: error.message });
  elasticSearchClient.search({ index: 'movies', body: { query: { match: { title: text } } } }).then(r => {
    const result = JSON.stringify(r.body.hits.hits.map(a => a._source));
    response.send({result});
  }).catch(onError);
});

module.exports = app;
