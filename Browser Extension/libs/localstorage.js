/*
 * Author:  Tom Rosier
 * Date:    15/11/2014
 * Project: SE31520-Browser-Extension
 * File:    LocalStorage.js
 * Desc:    This is a wrapper around HTML5 local storage.
 */
 
var LocalStorage = LocalStorage || {};

LocalStorage.debug = false;

// Converts a JSON object into something that can be saved in local storage.
LocalStorage.save = function(jsonIn, key) {	

	// Converts 
	var jsonStr = JSON.stringify(jsonIn);

	if (this.debug)
		console.log('LocalStorage.save: Saving data, ' + jsonStr);

	// Save the object to local storage.
	localStorage.setItem(key, jsonStr);
}

// Load that same JSON object back out from local storage.
LocalStorage.load = function(key) {

	// Set up a temp variable to store the return from the application.
	var ret = null;

	// Get the object that is stored within the local storage.
	var lsObj = localStorage.getItem(key);

	// Check the object isnt null.
	if (lsObj) {

		// Check we didnt get a object that was badly saved.
		if (lsObj != 'undefined'){

			// Convert it from JSON back into a object
			var obj = JSON.parse(lsObj); 

			// Double check the object exists.
			if (obj) {
				if (this.debug)
					console.log('LocalStorage.load: Loading data, ' + obj);

				// Assign valid object to the variable to be returned.
				ret = obj;
			}
		} else {
			// Corupt key will be removed.
			console.error('Corupt key removing it!');
			this.remove(key);
		}
	}
	
	return ret;
}

// Removes a key from local storage.
LocalStorage.remove = function(key) {
	localStorage.removeItem(key);
}