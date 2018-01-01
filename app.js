// call the packages we need
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.set('port', (process.env.PORT || 8000));

app.use('/', express.static(path.join(__dirname,  '/frontend/')));
app.use('/scripts', express.static(path.join(__dirname, '/backend/')));
app.use('/jquery', express.static(path.join(__dirname, './node_modules/jquery/dist/')));
app.use('/images/', express.static(path.join(__dirname, '/assets/')));

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(morgan('dev'));

//Modele bazy danych
require('./backend/models/todoModel');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/todo', { useMongoClient: true })
    .then(() => console.log("Połączono z bazą danych"))
    .catch((err) => console.error(err));

// ROUTES FOR OUR API
// =============================================================================
require('./backend/routes/todoRoutes')(app);


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html')) 
});


app.listen(app.get('port'), () => {
    console.log('Aplikacja działa na porcie '+ app.get('port'));
});