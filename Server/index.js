const express = require('express');
const cors = require('cors');
const path = require('path');
const pug = require('pug');
const MongoClient = require('mongodb').MongoClient;
var app = express();
const databaseURI = 'mongodb://USERNAME:PASSWORD@ds055945.mlab.com:55945/quiz';
const client = new MongoClient(databaseURI);
var collection;

client.connect((err) => {
	if (err) {
		console.log(err);
	}
	var db = client.db('quiz');
	collection = db.collection('quizzes');

});

app.listen(4000, () => {
	console.log('Server is working : 4000');
});

app.set('views', path.join(__dirname, '../Client'))
app.set('view engine', 'pug');

app.get('/', (req, res) => {
	var titles = [];
	collection.find({}).toArray((err, docs) => {
		for (var i of docs) {
			titles.push(i.title);
		}
		res.render('quizzes', {
			cards: titles
		});
	});
});

app.get('/home', (req, res) => {
	res.render('index');
})

fileSend('style.css');
fileSend('bg.jpg');
fileSend('logo.png');

function fileSend(filename) {
	app.get(`/${filename}`, (req, res) => {
		res.sendFile(path.join(__dirname, `../Client/${filename}`));
	});
}