// sets up our server constants for the app and brings in the express api
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser')
const generateId = require('./lib/generate-id')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// declares the port and the application title
//process.enc is how we access the environment
app.set('port', process.env.PORT || 3000);
app.locals.title = 'Express Train';

//this is the api of Express and its methods
// app.get('/', (request, response) => {
//   response.send(app.locals.title);
// });

app.get('/', (request, response) => {
  response.render('index');
});

app.get('/trains/:id', (request, response) => {
  var train = app.locals.trains[request.params.id];
  response.render('train', { train: train});
});

app.post('/trains', (request, response) => {
  var id = generateId();

  app.locals.trains[id] = request.body;

  response.sendStatus(201);
});

app.set('view engine', 'jade');

app.locals.trains = {};

//tell our app to listen to the port we set up (above) and print out to the console a confirmation message.
if (!module.parent) {
  app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`);
  });
}

module.exports = app;
