const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const
  Page = require('./models/page'),
  User = require('./models/user');

const
  app = express(),
  port = process.env.PORT || 3000;

require('./db');
app.use(bodyParser.json());

app.listen(port, ()=> {
  //console.log(`running on ${port}`);
});

const authenticate = (request, response, next)=> {
  const authToken = request.header('x-auth');
  User.findByToken(authToken).then(user => {
    request.user = user;
    next();
  }).catch((error)=> {
    response.status(401).send({error: error});
  });
};

app.get('/users/me', authenticate, (request, response)=> {
  response.send(request.user);
});

app.post('/users', (request, response)=> {
  const
    email = request.body.email,
    password = request.body.password,
    onSuccess = (user)=> {
      user.generateAuthToken().then((token)=> {
        response.header('x-auth', token).send({user});
      });
    },
    saveError = error => response.status(400).send({error: error.message});

  new User({email, password}).save().then(onSuccess).catch(saveError);
});
module.exports = app;
