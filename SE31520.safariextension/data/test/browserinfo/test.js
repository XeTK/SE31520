
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

		assert.ok(browserVersion == '38.0.2125.122', "Browser version is incorrect");
	}
);

QUnit.test( 
	"Check Browser Major Version", 
	function(assert) {
		var browserVersion = BrowserInfo.majorVersion;

		assert.ok(browserVersion == 38, "Browser version is incorrect");
	}
);