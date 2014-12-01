/*
 * Author:  Tom Rosier
 * Date:    26/11/2014
 * Project: SE31520-Browser-Extension
 * File:    test.js
 * Desc:    Tests for Utilities.
 */

// Two arrays we want to compair.
var array1 = [1,2,3,4];
var array2 = [2,3,4];

// This gets the differing element from the two lists.
QUnit.test( 
	"Diffed Array", 
	function(assert) {

		var diffed = utils.diff(array1, array2);

		assert.ok(diffed[0] = 1, "Incorrect element returned.");
	}
);

// Do the reverse and there should be nothing returned as all the elements exist within the old array.
QUnit.test( 
	"Reverse Diffed Array", 
	function(assert) {

		var diffed = utils.diff(array2, array1);

		assert.ok(diffed.length == 0, "Array to big!");
	}
);