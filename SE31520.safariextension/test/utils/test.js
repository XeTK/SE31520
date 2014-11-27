/*
 * Author:  Tom Rosier
 * Date:    26/11/2014
 * Project: SE31520-Browser-Extension
 * File:    test.js
 * Desc:    Tests for Utilities.
 */


var array1 = [1,2,3,4];
var array2 = [2,3,4];

QUnit.test( 
	"Diffed Array", 
	function(assert) {

		var diffed = utils.diff(array1, array2);

		assert.ok(diffed[0] = 1, "Incorrect element returned.");
	}
);

QUnit.test( 
	"Reverse Diffed Array", 
	function(assert) {

		var diffed = utils.diff(array2, array1);

		assert.ok(diffed.length == 0, "Array to big!");
	}
);