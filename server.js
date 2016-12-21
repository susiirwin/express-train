// sets up our server constants for the app and brings in the express api
const express = require('express');
const app = express();

// declares the port and the application title
//process.enc is how we access the environment
app.set('port', process.env.PORT || 3000);
app.locals.title = 'Express Train';

//this is the api of Express and its methods
app.get('/', (request, response) => {
  response.send(app.locals.title);
});

//tell our app to listen to the port we set up (above) and print out to the console a confirmation message.
if (!module.parent) {
  app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`);
  });
}

module.exports = app;
