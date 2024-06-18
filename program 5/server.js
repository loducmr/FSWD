// Importing express module
const express = require('express');
const app = express();

app.use(express.json());

app.get('/',
	(req, res) => {
		res.sendFile(__dirname + '/index.html');
	});

app.get('/login',
	(req, res) => {
		res.sendFile(__dirname + '/login.html');
	});
app.get('/inbox',
	(req, res) => {
		res.sendFile(__dirname + '/inbox.html');
	});
app.get('/logout',
	(req, res) => {
		res.sendFile(__dirname + '/index.html');
	});

	app.post('/login',(req, res) => {
		res.redirect("/login")
		});
	app.post('/inbox',(req, res) => {
		res.redirect("/inbox")
		});
	app.post('/logout',(req, res) => {
		res.redirect("/logout")
		});

app.listen(3000,
	() => {
		console.log(
			'Our express server is up on port 3000'
		);
	});