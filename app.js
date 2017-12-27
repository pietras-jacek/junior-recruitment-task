const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();

app.set('port', (process.env.PORT || 8000));

app.use('/', express.static(__dirname + '/frontend'));
app.use('/scripts', express.static(__dirname+ '/backend'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html') 
});


app.listen(app.get('port'), () => {
    console.log('Aplikacja działa na porcie '+ app.get('port'))
});