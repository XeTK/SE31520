/*
 * Author:  Tom Rosier
 * Date:    15/11/2014
 * Project: SE31520-Browser-Extension
 * File:    XeTKLocalStorage.js
 * Desc:    This is a wrapper around HTML5 local storage.
 */
 
var XeTKLocalStorage = XeTKLocalStorage || {};

XeTKLocalStorage.debug = false;

// Converts a JSON object into something that can be saved in local storage.
XeTKLocalStorage.save = function(jsonIn, key) {	

	var jsonStr = JSON.stringify(jsonIn);

	if (this.debug)
		console.log('XeTKLocalStorage.save: Saving data, ' + jsonStr);

	localStorage.setItem(key, jsonStr);
}

// Load that same JSON object back out from local storage.
XeTKLocalStorage.load = function(key) {
	
	var obj = JSON.parse(localStorage.getItem(key)); 

	if (this.debug)
		console.log('XeTKLocalStorage.load: Loading data, ' + obj);

	return obj;
}