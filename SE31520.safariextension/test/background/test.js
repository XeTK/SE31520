/*
 * Author:  Tom Rosier
 * Date:    26/11/2014
 * Project: SE31520-Browser-Extension
 * File:    test.js
 * Desc:    Tests for Background services.
 */


var restPath = "http://127.0.0.1:3000/users/1.json";

var test = {
	"name"     : "Chris Loftus",
	"email"    : "cwl@aber.ac.uk",
	"content"  : "I hope this still works.",
	"created"  : "2014-11-20T19:41:27.918Z",
	"modified" : "2014-11-20T19:41:27.918Z"
};

var authToken = "YWRtaW46cGFzc3dvcmQ=";

QUnit.test( 
	"Background Initiates Correctly.", 
	function(assert) {
		var key = background.key;

		LocalStorage.remove(key);

		var tempCurData = background.last;

		background.init();

		var json1 = JSON.stringify(tempCurData);
		var json2 = JSON.stringify(background.last);

		assert.ok(json1 != json2, "Background did not initialise correctly.");
	}
);

QUnit.test( 
	"REST generates auth token correctly.", 
	function(assert) {

		background.init();

		assert.ok(RESTToolKit.authToken == authToken, "AuthToken Incorrect");
	}
);

QUnit.test( 
	"Background pulls from REST correctly and stores it.", 
	function(assert) {
		var key = background.key;

		LocalStorage.remove(key);

		var tempCurData = background.last;

		background.init();

		background.updateFeeds();

		var updated = LocalStorage.load(key);

		assert.ok(updated.length > 0, "Data did not get stored correctly.");
	}
);