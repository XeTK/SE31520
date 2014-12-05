/*
 * Author:  Tom Rosier
 * Date:    26/11/2014
 * Project: SE31520-Browser-Extension
 * File:    test.js
 * Desc:    Tests for Background services.
 */

// Link to the REST interface.
var restPath = "http://127.0.0.1:3000/users/1.json";

// The correct Auth token that should be generated.
var authToken = "YWRtaW46cGFzc3dvcmQ=";

// Check to see if we reload the saved data correctly.
QUnit.test( 
	"Background Initiates Correctly.", 
	function(assert) {

		// Grab the key that we use to save the last 
		var key = background.key;

		// Remove the key to make sure its clear.
		LocalStorage.remove(key);

		// Get the data currently stored within package.
		var tempCurData = background.last;

		// Re run initiate of the module.
		background.init();

		// Convert the objects into strings to make it more easy to compare.
		var json1 = JSON.stringify(tempCurData);
		var json2 = JSON.stringify(background.last);

		// Check the objects are different as re initialising the will make them change.
		assert.ok(json1 != json2, "Background did not initialise correctly.");
	}
);

// Verify generating an auth token generates the correct token.
QUnit.test( 
	"REST generates auth token correctly.", 
	function(assert) {

		// Reinitate the code to generate the auth token.
		background.init();

		// Auth tokens should match.
		assert.ok(RESTToolKit.authToken == authToken, "AuthToken Incorrect");
	}
);

// Verify the data is stored ready for the next run of the application.
QUnit.test( 
	"Background pulls from REST correctly and stores it.", 
	function(assert) {

		// Grab the key
		var key = background.key;

		// Remove the currently stored data.
		LocalStorage.remove(key);

		// Get the current information that is stored.
		var tempCurData = background.last;

		// Re initiate the background module.
		background.init();

		// Reload the data from the rest server.
		background.updateFeeds();

		// Reload the data from the local storage.
		var updated = LocalStorage.load(key);

		// Convert to some easier to compair objects.
		var tCD = JSON.stringify(tempCurData);
		var up  = JSON.stringify(updated);

		// Check we have more than one objects.
		assert.ok(tCD == up, "Data did not get stored correctly.");
	}
);