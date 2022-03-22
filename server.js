require('rootpath')();
const Express = require('express');
const app = Express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./_middleware/error-handler');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//api routes
app.use('/users', require('./Users/users.controller'));

//global error handler
app.use(errorHandler);

//start server
const port = process.env.Node_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => console.log('Server is listening on port ' + port));