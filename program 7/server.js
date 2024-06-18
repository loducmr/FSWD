// Import express for creating API's endpoints
const express = require("express");
const path = require('path');
const fs = require("fs");
const users = require("./database.json");
var database;
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
app.post("/register", (req, res) => {
	// Get the name to the json body data
	const name = req.body.name;

	// Get the password to the json body data
	const password = req.body.password;

	// Get the profession to the json body data
	const work = req.body.work;
	
	// Make two variable for further use
	let isPresent = false;
	let isPresentIndex = null;

    // Read database.json file 
    fs.readFile("database.json", function(err, data) { 
    
        // Check for errors 
        if (err) throw err; 

        // Converting to JSON 
        database = JSON.parse(data); 

	// iterate a loop to the data items and
	// check what data are matched.
	for (let i = 0; i < database.length; i++) {

		// If data name are matched so check
		// the password are correct or not
		if (database[i].name === name
			&& database[i].password === password) {

			// If both are correct so make 
			// isPresent variable true
			isPresent = true;

			// And store the data index
			isPresentIndex = i;

			// Break the loop after matching successfully
			break;
		}
	}

	// If isPresent is true, then create a
	// token and pass to the response
	if (isPresent) {
		res.json({
			signup: false,
			token: null,
			error: "Already registered",
		});
	} else {
		let user =
	{
    	name: name,
    	work: work,
    	password: password,
		token: token
	};
	users.push(user);
		fs.writeFile(
			"database.json",
			JSON.stringify(users),
			err => {
				// Checking for errors 
				if (err) throw err;
		
				// Success 
				res.json({
					signup: true,
					token: "generated",
					data: "Successfully Registered",
				});
				console.log("Done writing");
			}); 
	}
});
}); 


// Login route
app.post("/auth", (req, res) => {
	// Get the name to the json body data
	
	const name = req.body.name;
	console.log(name);

	// Get the password to the json body data
	const password = req.body.password;
	console.log(password)
	// Make two variable for further use
	let isPresent = false;
	let isPresentIndex = null;

    // Read database.json file 
    fs.readFile("database.json", function(err, data) { 
    
        // Check for errors 
        if (err) throw err; 

        // Converting to JSON 
        database = JSON.parse(data); 

	// iterate a loop to the data items and
	// check what data are matched.
	for (let i = 0; i < database.length; i++) {

		// If data name are matched so check
		// the password are correct or not
		if (database[i].name === name
			&& database[i].password === password) {

			// If both are correct so make 
			// isPresent variable true
			isPresent = true;

			// And store the data index
			isPresentIndex = i;

			// Break the loop after matching successfully
			break;
		}
	}

	// If isPresent is true, then create a
	// token and pass to the response
	if (isPresent) {

		// The jwt.sign method are used
		// to create token
		const token = jwt.sign(database[isPresentIndex], "secret");

		// Pass the data or token in response
		res.json({
			login: true,
			token: token,
			data: database[isPresentIndex],
		});
	} else {

		// If isPresent is false return the error
		res.json({
			login: false,
			error: "please check name and password.",
		});
	}
});
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
