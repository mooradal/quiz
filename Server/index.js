const express = require('express');
const cors = require('cors');
const path = require('path');
const pug = require('pug');

var app = express();

app.listen(4000,() => {
	console.log('Server is working : 4000');
});

app.set('views',path.join(__dirname,'../Client'))
app.set('view engine','pug');

app.get('/', (req,res) => {
	res.render('quizzes');
});	


fileSend('style.css');
fileSend('bg.jpg');
fileSend('logo.png');

function fileSend(filename) {
	app.get(`/${filename}`, (req,res) => {
		res.sendFile(path.join(__dirname,`../Client/${filename}`));
	});
}