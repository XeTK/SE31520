/*
 * Author:  Tom Rosier
 * Date:    26/11/2014
 * Project: SE31520-Browser-Extension
 * File:    test.js
 * Desc:    Tests for BrowserInfo.
 */

// Check the browser name is correct.
QUnit.test( 
	"Check Browser Name", 
	function(assert) {
		// Grab the browser name.
		var browserName = BrowserInfo.browserName;

		// Check it is equal to Chrome.
		assert.ok(browserName == 'Chrome', "Browser is not Chrome.");
	}
);

// Grab the whole version string for the current browser version.
QUnit.test( 
	"Check Browser Minor Version", 
	function(assert) {
		var browserVersion = BrowserInfo.fullVersion;

		// Alt method to get the full version string.
		var cVer = window.navigator.appVersion.match(/Chrome\/(.*?) /)[1];

		// Check to see if the output of the api matches the string that is given from the other method.
		assert.ok(browserVersion == cVer, "Browser version is incorrect");
	}
);

// Get the major version number.
QUnit.test( 
	"Check Browser Major Version", 
	function(assert) {
		var browserVersion = BrowserInfo.majorVersion;

		assert.ok(browserVersion == 39, "Browser version is incorrect");
	}
);