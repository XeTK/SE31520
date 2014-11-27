/*
 * Author:  Tom Rosier
 * Date:    26/11/2014
 * Project: SE31520-Browser-Extension
 * File:    background.js
 * Desc:    Handles background transcations with the CSA app to give user notifications.
 */


var background = background || {}

// This holds the old list of broadcasts.
background.last  = {};

// Path to the RESTful interface.
background.url   = "http://127.0.0.1:3000/rest/extensions.json";

// The key in local storage.
background.key   = 'feeds';

background.debug = false;

// Method that is ran when the application is loaded and will setup the application.
background.init = function() {

	// Reload the previous list broadcasts that has been presented.
	background.last = LocalStorage.load(this.key);

	// Load the user info from local storage.
	var user = LocalStorage.load('user');

	// This authenticates the user with the REST toolkit libary.
	RESTToolKit.auth(user.name, user.pwd);

	// Create a alarm to rerun this module and check for updates.
	chrome.alarms.create(
		"Check Rest Connection", 
		{
			delayInMinutes:  0.1, 
			periodInMinutes: 0.2
		} 
	);
}

// This creates a Chrome notification that is viewable by the operating system.
background.notification = function(item) {

	// This create a instantiation of the Moment.js libary.
	var momentObj = moment(new Date(item.created));

	var dateStr   = momentObj.format('HH:mm DD/MM/YY');

	// Make a nice title for the application.
	var content   = item.name + " - " + dateStr;

	// Setup all of the permeters for the notifcation with the message and appropriate image.
	var opts = {
		type:           "basic",
		contextMessage: content,
		title:          "Computer Science Alumni",
		message:        item.content ,
		iconUrl:        "./img/128.png"
	}

	// Send the notification object we created to chrome to display as a notification.
	chrome.notifications.create(
		content, 
		opts,
		function(notificationId) {

		}
	);
}

// This is the method that is run to check to see if any new notifications have been created.
background.updateFeeds = function() {

	if (background.debug)
		console.log("background.updateFeeds: function run!");

	// Get the latest version of the content from the RESTful interface.
	var restReq   = RESTToolKit.get(background.url);

	// Get the actual list from the request.
	var feedsObjs = restReq.responseJSON;

	// Convert the list objects to JSON strings to be more easily compared.
	var feedsStr  = JSON.stringify(feedsObjs);
	var last      = JSON.stringify(background.last);

	// If the lists differ then we do more checks.
	if (feedsStr != last) {

		if (background.debug)
			console.log("background.updateFeeds: object differs.");

		// Do a more in detail check to verify the lists really differ and return the new elements.
		var diffed = utils.diff(feedsObjs, background.last);

		// Check to see if there are some new elements within the diffed array.
		if (diffed.length > 0) {

			// For each of the new elements add a new notification.
			diffed.forEach(
				function(item) {
					// Create a new notification to the display.
					background.notification(item);
				}
			);
		}

		// Save the new list of elements.
		LocalStorage.save(feedsObjs, background.key);
		//Update the old list.
		background.last = feedsObjs;
	} 
}

// When the alarm triggers then reject the feeds.
chrome.alarms.onAlarm.addListener(
	function(alarm) {
		background.updateFeeds();
	}
);

// When the application loads then trigger the update event.
window.addEventListener(
	"load", 
	function() {
		background.init();
	}
);