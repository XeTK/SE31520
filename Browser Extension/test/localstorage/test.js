/*
 * Author:  Tom Rosier
 * Date:    26/11/2014
 * Project: SE31520-Browser-Extension
 * File:    test.js
 * Desc:    Tests for LocalStorage.
 */

// This is the key for the location in local storage where the data is stored.
var key = 'QUNIT';

// Test object that we save to local storage to test.
var testObj = {
	"text": "Hello World"
};

// Check that entries are removed correctly from local storage.
QUnit.test( 
	"Load Nothing", 
	function(assert) {

		// Call the function that removes the key from local storage.
		LocalStorage.remove(key);

		// Pull the key back out of storage to check it.
		var t = LocalStorage.load(key);

		// The key should be null.
		assert.ok(t == null, "Key was not empty.");
	}
);

// This checks if a object is saved correctly.
QUnit.test( 
	"Local Storage Save.", 
	function(assert) {

		// Save our test object to local storage.
		LocalStorage.save(testObj, key);

		// Reload the key.
		var tempKey = LocalStorage.load(key);
		
		// Convert the object to a string to make it easier to compare.
		var tempKeyJSON = JSON.stringify(tempKey);

		// Also convert the test object to a string to make it easier to compare.
		var objJSON = JSON.stringify(testObj);

		// The object should be the same.
		assert.ok(tempKeyJSON == objJSON, "Key that was saved could not be returned.");
	}
);

// This reloads the key without saving it first.
QUnit.test( 
	"Local Storage Reload.", 
	function(assert) {

		// Pull the key from local storage.
		var tempKey = LocalStorage.load(key);
		
		// Convert the object to a string to help with comparison.
		var tempKeyJSON = JSON.stringify(tempKey);

		// Also convert the test object to a string to make comparison easier.
		var objJSON = JSON.stringify(testObj);
		
		// Objects should still match.
		assert.ok(tempKeyJSON == objJSON, "Could not reload key that was saved.");
	}
);