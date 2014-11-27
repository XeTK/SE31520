/*
 * Author:  Tom Rosier
 * Date:    26/11/2014
 * Project: SE31520-Browser-Extension
 * File:    test.js
 * Desc:    Tests for BrowserInfo.
 */


QUnit.test( 
	"Check Browser Name", 
	function(assert) {
		var browserName = BrowserInfo.browserName;

		assert.ok(browserName == 'Chrome', "Browser is not Chrome.");
	}
);

QUnit.test( 
	"Check Browser Minor Version", 
	function(assert) {
		var browserVersion = BrowserInfo.fullVersion;

		var cVer = window.navigator.appVersion.match(/Chrome\/(.*?) /)[1];

		assert.ok(browserVersion == cVer, "Browser version is incorrect");
	}
);

QUnit.test( 
	"Check Browser Major Version", 
	function(assert) {
		var browserVersion = BrowserInfo.majorVersion;

		assert.ok(browserVersion == 39, "Browser version is incorrect");
	}
);