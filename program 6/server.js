// Import express for creating API's endpoints
const express = require("express");
const path = require('path');
const fs = require("fs");
const users = require("./database.json");
var database;
var token="wrong key";

// Read database.json file 
fs.readFile("database.json", function(err, data) { 
    
    // Check for errors 
    if (err) throw err; 

    // Converting to JSON 
    database = JSON.parse(data); 
}); 


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
        res.sendFile(__dirname + '/login.html');
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
            token: token,
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

app.post('/login',(req, res) => {
		res.redirect("/login")
		});

// Listen the server
app.listen(port, () => {
	console.log(`Server is running : 
	http://localhost:${port}/`);
});