/*
 * Author:  Tom Rosier
 * Date:    26/11/2014
 * Project: SE31520-Browser-Extension
 * File:    Options.js
 * Desc:    Action handlers for the Options page.
 */

// Define a Options namespace.
var Options = Options || {};

// Method that is ran on page load to setup page.
Options.init = function() {

	// Load the user information.
	Options.load();

	// Bind a action listerner to the form for when it is submited.
	$('#userdata').submit(
		function(event) {

			// Save the current options given by the end user.
			Options.save();

			// Override the current behaviour of the form.
		    event.preventDefault();

			return false;
		}
	);
}

// This method loads the saved user details from local storage into the form.
Options.load = function() {
	
	var user = LocalStorage.load('user');

	// If the object is not null then we populate the form.
	if (user) {

		$('#password').val(user.pwd);
		$('#username').val(user.name);
	}
}

// Save the form properties to local storage.
Options.save = function() {

	// Grab the properties from the form.
	var pwd  = $('#password').val();
	var user = $('#username').val();

	// Check if the usernam
	if (user.length > 0 && pwd.length > 0) {

		// Build the object to be saved to local storage.
		var obj = {
			"name" : user,
			"pwd"  : pwd
		};

		// Save that object to local storage.
		LocalStorage.save(obj, 'user');
	}

	// Show a notification to the end user.
	alertify.success(user + '\'s information has been saved')

	// Re initiate the background page with the new credentials.
	chrome.runtime.getBackgroundPage(
		function(e) {
			e.background.init();
		}
	);
}

// Execute the setup methods when the page has fully loaded.
$(document).ready(
	function() {
		Options.init();
	}
);