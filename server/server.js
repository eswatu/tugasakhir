require('rootpath')();
const Express = require('express');
const app = Express();
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const errorHandler = require('./_middleware/error-handler');

//parse app/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
//parse app/json
app.use(bodyParser.json());
//enable cors
app.use(cors());
//multer
app.post('/photo', upload.single('avatar'), function(req,res,next) {
    //isi buat penyimpnanan ke database
    //req.file is the 'avatar' file
    //req.body will hold the text fields, it there were any
});

app.post('/files/work', upload.array('files', 12), function(req,res,next){
    //req.files is array of 'files' files
    //req.body will contain the text fields, if there were any
});

const cpUpload = upload.fields([{name:'avatar', maxCount: 1}, {name: 'gallery', maxCount: 8}]);
app.post('/cool-profile', cpUpload, function(req, res, next) {
    //req.files is an object (String -> array) where fieldname is the key, and the value is array of files
    //e.g ; req.files['avatar][0] -> File
    // req.files['gallery'] -> Array
    //req.body will contain text fueld if there were any
})

//api routes
app.use('/api/user', require('./Users/users.controller'));
app.use('/api/acts', require('./Acts/act.controller'));
app.use('/api/butir', require('./permen/butir.controller'));

//global error handler
app.use(errorHandler);

//start server
const port = process.env.Node_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => console.log('Server is listening on port ' + port));

