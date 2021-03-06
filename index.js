const express = require('express');
var cors = require('cors');
const path = require('path');
const pug = require('pug');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
var app = express();
const databaseURI = 'mongodb://MooradAltamimi:XDYBqfJ7kcEkTk5@ds055945.mlab.com:55945/quiz';
const client = new MongoClient(databaseURI);
var collection;

client.connect((err) => {
	if (err) {
		console.log(err);
	}
	var db = client.db('quiz');
	collection = db.collection('quizzes');

});

app.listen(process.env.PORT || 4000, () => {
	console.log('Server is ON');
});


app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
	next();
});

app.use(cors());

app.set('views', path.join(__dirname, 'Client/Pug'));
app.set('view engine', 'pug');

app.get('/quizzes', (req, res) => {
	var data = [];
	collection.find({}).toArray((err, docs) => {
		for (var i of docs) {
			data.push([i._id, i.title, i.thumbnail]);
		}
		res.render('quizzes', {
			cards: data
		});
	});
});

app.get('/', (req, res) => {
	res.render('index');
});

app.get('/quiz', (req, res) => {
	var id = req.query.id;
	console.log(req.query.id);
	var data = [];
	collection.find({
		_id: ObjectId(id)
	}).toArray((err, docs) => {
		if (err) {
			console.log(err);
		}
		data.push(docs);
		console.log(docs);
		res.render('quiz', data[0][0]);
	});
});

app.get('/answers', (req, res) => {
	var id = req.query.id;
	console.log(req.query.id);
	collection.find({
		_id: ObjectId(id)
	}).toArray((err, docs) => {
		if (err) {
			console.log(err);
		}
		res.json(docs[0].correct);
	});
});

fileSend('style.css');
fileSend('bg.jpg');
fileSend('logo.png');
fileSend('main.js');
fileSend('quiz.js');
fileSend('favicon.ico');

function fileSend(filename) {
	app.get(`/${filename}`, (req, res) => {
		res.sendFile(path.join(__dirname, `Client/Resources/${filename}`));
	});
}