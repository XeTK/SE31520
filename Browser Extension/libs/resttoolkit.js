/*
 * Author:  Tom Rosier
 * Date:    26/11/2014
 * Project: SE31520-Browser-Extension
 * File:    resttoolkit.js
 * Desc:    This a simplified wrapper around jQueries aJax methods to make interacting over REST simple.
 */

var RESTToolKit = RESTToolKit || {};

RESTToolKit.debug = false;

// Hold the auth token that will be passed to the server via basic auth.
RESTToolKit.authToken = "";

// Wrapper function to call restful without async.
RESTToolKit.get = function(address) {
	return this.getASync(address, null);
}

// Send post object to the restful service.
RESTToolKit.post = function(address, obj) {
	return RESTToolKit.postASync(address, obj, null);
}

// Generate the authentication token that will be passed in a header for basic auth.
RESTToolKit.auth = function(username, password) {
	var toCyther = username + ":" + password;

	var encoded  = window.btoa(toCyther);

	RESTToolKit.authToken = encoded;
}

// This clears the Auth Token.
RESTToolKit.clearAuth = function() {
	this.authToken = "";
}

// This verifys 
RESTToolKit.isAuthenticated = function() {
	return (this.authToken.length > 0);
}

// Gets JSON of the information from the RestFul service one the server.
RESTToolKit.getASync = function(address, sync) {

	if (this.debug)
		console.log('RESTToolKit.get_restful: in Address = ' + address);

	// Check if we are doing things synchronously
	var isSync = (!sync) ? false : true; // Check if a function is ready to be attached.

	// Get the response from the REST request as a json object, using the aJax library.
	var retJSON = $.ajax(
		{
			url:   address,
			type:  'get',
			async: isSync,
			data:  '',
			headers: { 
				'Authorization': 'Basic ' + this.authToken 
			},
			success: function(data, textStatus, jqXHR) { 
				// If there is a function we can call it.
				if (sync)
					sync(data); // Pass if the connection is up or down to the function that is async.

				if (this.debug)
					console.log('RESTToolKit.get_restful: Successfully got restful data.');
			},
			error: function(jqXHR, textStatus, errorThrown) {
				if (sync)
					sync(null);

				if (this.debug)
					console.log('RESTToolKit.get_restful: Error: ' + textStatus);

				return null;
			}
		}
	);

	return retJSON;
}

// Send post object to the restful service.
RESTToolKit.postASync = function(address, obj, func) {

	// Just use the ajax libary.
	var ret = $.ajax(
		{
		    url:      address,
		    data:     obj,
		    type:     'post',
		    dataType: 'text',
		    headers: {
		       'Authorization': 'Basic ' + this.authToken 
		    },
		    success: function(data) {
		    	if (func)
		    		func(data);

		    	if (this.debug)
		        	console.info(data);
		    },
		    error: function(data) {
		    	if (func)
		    		func(data);

		    	if (this.debug)
		        	console.info(data);
		    }
		}
	);

	return ret;
}