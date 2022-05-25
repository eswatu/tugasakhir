require('rootpath')();
const Express = require('express');
const app = Express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./_middleware/error-handler');

const userService = require('./Users/user.service');
global.__basedir = __dirname;

//parse app/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
//parse app/json
app.use(bodyParser.json());
//enable cors
app.use(cors());

//api routes
app.use('/api/user', require('./Users/user.controller'));
app.use('/api/acts', require('./Acts/act.controller'));
app.use('/api/actfile', require('./Acts/actFile.controller'));
app.use('/api/butir', require('./permen/butir.controller'));
app.use('/api/avatar', require('./Users/avatar.controller'));
app.use('/api/assignLetter', require('./Acts/assignLetter.controller'));
app.use('/api/assignfile', require('./Acts/assignFile.controller'));
//global error handler
app.use(errorHandler);

//start server
const port = process.env.Node_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => console.log('Server is listening on port ' + port));

