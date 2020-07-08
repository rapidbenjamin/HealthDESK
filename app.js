const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express()
const bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', function (req, res) { //handles get request
  res.render('index');
})

app.get('/ml', function (req, res) { //handles get request
  res.render('ml');
})

app.listen(PORT, function () {
  console.log('go to http://localhost:3000/')
})
