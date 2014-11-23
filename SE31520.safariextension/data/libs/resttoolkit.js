var RESTToolKit = RESTToolKit || {};

RESTToolKit.debug = false;

RESTToolKit.authToken = "";

// Wrapper function to call restful without async.
RESTToolKit.get = function(address) {
	return this.getASync(address, null);
}

// Send post object to the restful service.
RESTToolKit.post = function(address, obj) {
	RESTToolKit.postASync(address, obj, null);
}

RESTToolKit.auth = function(username, password) {
	var toCyther = username + ":" + password;

	var encoded = window.btoa(toCyther);

	RESTToolKit.authToken = encoded;
}

RESTToolKit.clearAuth = function() {
	this.authToken = "";
}

RESTToolKit.isAuthenticated = function() {
	return (this.authToken.length > 0);
}

// Gets JSON of the information from the RestFul service one the server.
RESTToolKit.getASync = function(address, sync) {

	if (this.debug)
		console.log('RESTToolKit.get_restful: in Address = ' + address);

	var isSync = (!sync) ? false : true; // Check if a function is ready to be attached.

	// Get the response from the REST request as a json object, using the aJax Libary.
	var retJSON = $.ajax({
		url:  address,
		type: 'get',
		async: isSync, //Wait for responce.
		data: '',
		headers: { 
			'Authorization': 'Basic ' + this.authToken 
		},
		success: function(data, textStatus, jqXHR) { 
			if (sync)
				sync(data); //Pass if the connection is up or down to the function that is async.

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
	});

	return retJSON;
}

// Send post object to the restful service.
RESTToolKit.postASync = function(address, obj, func) {

	// Just use the ajax libary.
	$.ajax({
	    url: address,
	    type: 'post',
	    data: obj,
	    headers: {
	       'Authorization': 'Basic ' + this.authToken 
	    },
	    dataType: 'text',
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
	});
}