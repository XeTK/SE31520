/*
 * Author:  Tom Rosier
 * Date:    26/11/2014
 * Project: SE31520-Browser-Extension
 * File:    test.js
 * Desc:    Tests for RestToolKit.
 */

// Paths for the restful interfaces that the program interacts with.
var restPath = "http://127.0.0.1:3000/users/1.json";
var postPath = "http://127.0.0.1:3000/users/2";

// This is the reference object the object returned from the rest client should be the same.
var test = {  
   "id"         : 1,
   "surname"    : "Surname0",
   "firstname"  : "Hello",
   "phone"      : "01970 622422",
   "grad_year"  : 1985,
   "jobs"       : true,
   "email"      : "cwl0@aber.ac.uk",
   "created_at" : "2014-11-24T10:25:56.773Z",
   "updated_at" : "2014-11-24T10:58:53.539Z"
};

// This is the correct auth token for the standard login.
var authToken = "YWRtaW46cGFzc3dvcmQ=";

// This is the form data that is submitted on a successful post request.
var formData = " utf8=%E2%9C%93&_method=patch&user%5Bfirstname%5D=Thomas&user%5Bsurname%5D=Rosier&user%5Bemail%5D=cwl1%40aber.ac.uk&user%5Bphone%5D=01970+622422&user%5Bgrad_year%5D=1985";

// Verify that the token that is generated is correct.
QUnit.test( 
	"Auth Token is built correctly.", 
	function(assert) {

		RESTToolKit.auth('admin','password');

		// Get the boolean value back from the method.
		var isAuthed = RESTToolKit.isAuthenticated();

		assert.ok(isAuthed, "Token was not generated.");
	}
);

// Do a RESTful request to the server to verify that it returns the correct object back.
QUnit.test( 
	"Rest Get Object", 
	function(assert) {

		RESTToolKit.auth('admin','password');

		// Grab the data from the rest service.
		var inCom = RESTToolKit.get(restPath);

		// Get the JSON text from the REST interface.
		var inJSONStr = inCom.responseText;

		// Convert the test object to be in a string format aswell.
		var compJSONStr = JSON.stringify(test);

		// If the strings match then it worked correctly.
		assert.ok(inJSONStr == compJSONStr, "Correct JSON was not returned.");
	}
);

// Verify that the way we authenticate the with the RESTful services was successful.
QUnit.test( 
	"Authentication succeeded.", 
	function(assert) {

		// Create the auth token for the current session.
		RESTToolKit.auth('admin','password');

		// Do a REST transaction to see if what response we get from the server.
		var inCom = RESTToolKit.get(restPath);

		// Get the status code for the request we just sent.
		var inStatusCode = inCom.status;

		// If it was 200 then that means that the request was successful.
		assert.ok(inStatusCode == 200, "Status Code Incorrect");
	}
);

// Do a strict check to see if the auth token we generate actually matched a known correct token.
QUnit.test( 
	"Build Auth Token", 
	function(assert) {

		// Create the auth token.
		RESTToolKit.auth('admin','password');

		// Verify that the two tokens match.
		assert.ok(RESTToolKit.authToken == authToken, "Auth key was incorrect.");
	}
);

// Check the clear auth token works correctly.
QUnit.test( 
	"Authentication clear succeeded.", 
	function(assert) {

		// Login in normally.
		RESTToolKit.auth('admin','password');

		// Do a REST request to get the status.
		var inCom = RESTToolKit.get(restPath);

		// Extra that status from the JSON object.
		var inStatusCode = inCom.status;

		// Check that it authenticated correctly.
		assert.ok(inStatusCode == 200, "Status Code Incorrect");

		// Clear the token.
		RESTToolKit.clearAuth();

		// Do the REST again to check if the clear worked successfully.
		inCom = RESTToolKit.get(restPath);

		// Retrieve the status code from the request again.
		inStatusCode = inCom.status;

		// Verify that the authentication fails which means that the auth token had successfully been cleared.
		assert.ok(inStatusCode == 401, "Session should no longer be authenticated.");
	}
);

// Check that POST'ing data to the server works correctly.
QUnit.test( 
	"Update user record via POST", 
	function(assert) {

		// Authenticate the user with the REST client.
		RESTToolKit.auth('admin','password');

		// Do the REST call to the server.
		var someData = RESTToolKit.post(
			postPath, 
			formData
		);

		// If the were was no error reported and the object is not null then everything went fine.
		assert.ok((someData.statusText != "error" && someData !== 'undefined'), "We should not return a error.");
	}
);

