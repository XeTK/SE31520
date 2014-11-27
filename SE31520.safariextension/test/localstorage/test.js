/*
 * Author:  Tom Rosier
 * Date:    26/11/2014
 * Project: SE31520-Browser-Extension
 * File:    test.js
 * Desc:    Tests for LocalStorage.
 */


var key = 'QUNIT';

var testObj = {
	"text": "Hello World"
};

QUnit.test( 
	"Load Nothing", 
	function(assert) {

		LocalStorage.remove(key);

		var t = LocalStorage.load(key);

		assert.ok(t == null, "Key was not empty.");
	}
);

QUnit.test( 
	"Local Storage Save.", 
	function(assert) {

		LocalStorage.save(testObj, key);

		var tempKey = LocalStorage.load(key);
		
		var tempKeyJSON = JSON.stringify(tempKey);

		var objJSON = JSON.stringify(testObj);

		assert.ok(tempKeyJSON == objJSON, "Key that was saved could not be returned.");
	}
);

QUnit.test( 
	"Local Storage Save.", 
	function(assert) {
		var tempKey = LocalStorage.load(key);
		
		var tempKeyJSON = JSON.stringify(tempKey);

		var objJSON = JSON.stringify(testObj);
		
		assert.ok(tempKeyJSON == objJSON, "Could not reload key that was saved.");
	}
);