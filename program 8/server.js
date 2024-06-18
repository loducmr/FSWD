// Import express for creating API's endpoints
const express = require("express");
const db = require("./database.js");
const {MongoClient} =require('mongodb');
var token;

// Import jwt for API's endpoints authentication
const jwt = require("jsonwebtoken");

// Creates an Express application, initiate
// express top level function
const app = express();

// A port for serving API's
const port = 3000;

// Allow json data
app.use(express.json());

app.get('/',
    (req, res) => {
        res.sendFile(__dirname + '/index.html');
    });
app.get('/welcome',
    (req, res) => {
        res.sendFile(__dirname + '/welcome.html');
    });
app.get('/signup',
    (req, res) => {
        res.sendFile(__dirname + '/signup.html');
    });
app.get('/login',
    (req, res) => {
        res.sendFile(__dirname + '/login.html');
    });

// SignUp route
app.post("/register", async(req, res) => {
	// Get the name to the json body data
	const name = req.body.name;

	// Get the password to the json body data
	const password = req.body.password;

	// Get the profession to the json body data
	const work = req.body.work;
	tuple= await db.getData(name,password);
		if(JSON.parse(tuple).length>0){
		res.json({
			signup: false,
			token: null,
			error: "Already registered",
		});
	} else {

		// The jwt.sign method are used
		// to create token
		const token = jwt.sign(tuple, "secret");

	let emp =
	{
    	name: name,
    	work: work,
    	password: password,
		token:token
	};

	let result=await db.insertData(emp);
	res.json({
		signup: true,
		token: "generated",
		result:result
	});
	}
});


// Login route
app.post("/auth", async (req, res) => {
	// Get the name to the json body data
	
	const name = req.body.name;
	console.log(name);

	// Get the password to the json body data
	const password = req.body.password;
	console.log(password)

	tuple=await db.getData(name,password);

	if (JSON.parse(tuple).length>0) {

		// The jwt.sign method are used
		// to create token
		const token = jwt.sign(tuple, "secret");

		// Pass the data or token in response
		res.json({
			login: true,
			token: token,
			data: JSON.parse(tuple),
		});
	} else {
		res.json({
			login: false,
			error: "please check name and password.",
		});
	}
});

// Verify route
app.post("/verifyToken", (req, res) => {

	// Get token value to the json body
	const token = req.body.token;

	// If the token is present
	if (token) {

		// Verify the token using jwt.verify method
		const decode = jwt.verify(token, "secret");

		// Return response with decode data
		res.json({
			login: true,
			data: decode,
		});
	} else {

		// Return response with error
		res.json({
			login: false,
			data: "error",
		});
	}
});

app.post('/welcome',(req, res) => {
	res.redirect("/welcome")
	});
app.post('/login',(req, res) => {
		res.redirect("/login")
		});
app.post('/signup',(req, res) => {
	res.redirect("/signup")
	});

// Listen the server
app.listen(port, () => {
	console.log(`Server is running : 
	http://localhost:${port}/`);
});
