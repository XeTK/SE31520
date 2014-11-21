var restPath = "http://127.0.0.1:3000/users/1.json";

var test = {
	"surname":    "Surname0",
	"firstname":  "Firstname0",
	"phone":      "01970 622422",
	"grad_year":  1985,
	"jobs":       true,
	"email":      "cwl0@aber.ac.uk",
	"created_at": "2014-11-15T16:51:49.030Z",
	"updated_at": "2014-11-15T16:51:49.030Z"
};

var authToken = "YWRtaW46cGFzc3dvcmQ=";

QUnit.test( 
	"Auth Token is built correctly.", 
	function(assert) {

		RESTToolKit.auth('admin','password');

		var isAuthed = RESTToolKit.isAuthenticated();

		assert.ok(isAuthed, "Token was not generated.");
	}
);

QUnit.test( 
	"Rest Get Object", 
	function(assert) {

		RESTToolKit.auth('admin','password');

		var inCom = RESTToolKit.get(restPath);

		var inJSONStr = inCom.responseText;

		var compJSONStr = JSON.stringify(test);

		assert.ok(inJSONStr == compJSONStr, "Correct JSON was not returned.");
	}
);

QUnit.test( 
	"Authentication succeeded.", 
	function(assert) {

		RESTToolKit.auth('admin','password');

		var inCom = RESTToolKit.get(restPath);

		var inStatusCode = inCom.status;

		assert.ok(inStatusCode == 200, "Status Code Incorrect");
	}
);

QUnit.test( 
	"Build Auth Token", 
	function(assert) {

		RESTToolKit.auth('admin','password');

		assert.ok(RESTToolKit.authToken == authToken, "Auth key was incorrect.");
	}
);

QUnit.test( 
	"Authentication clear succeeded.", 
	function(assert) {

		RESTToolKit.auth('admin','password');

		var inCom = RESTToolKit.get(restPath);

		var inStatusCode = inCom.status;

		assert.ok(inStatusCode == 200, "Status Code Incorrect");

		RESTToolKit.clearAuth();

		inCom = RESTToolKit.get(restPath);

		inStatusCode = inCom.status;

		assert.ok(inStatusCode == 401, "Session should no longer be authenticated.");
	}
);


/* Post needs testing. */

