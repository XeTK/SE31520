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

	var jsonStr = JSON.stringify(jsonIn);

	if (this.debug)
		console.log('LocalStorage.save: Saving data, ' + jsonStr);

	localStorage.setItem(key, jsonStr);
}

// Load that same JSON object back out from local storage.
LocalStorage.load = function(key) {

	var ret = null;

	var lsObj = localStorage.getItem(key);

	if (lsObj) {
		var obj = JSON.parse(lsObj); 

		if (obj) {
			if (this.debug)
				console.log('LocalStorage.load: Loading data, ' + obj);

			ret = obj;
		}
	}
	
	return ret;
}

LocalStorage.remove = function(key) {
	localStorage.removeItem(key);
}