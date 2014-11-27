/*
 * Author:  Tom Rosier
 * Date:    26/11/2014
 * Project: SE31520-Browser-Extension
 * File:    background.js
 * Desc:    Handles background transcations with the CSA app to give user notifications.
 */


var background = background || {}

background.last  = {};

background.url   = "http://127.0.0.1:3000/rest/extensions.json";

background.key   = 'feeds';

background.debug = true;


background.init = function() {

	background.last = LocalStorage.load(this.key);

	var user = LocalStorage.load('user');

	RESTToolKit.auth(user.name, user.pwd);

	chrome.alarms.create(
		"Check Rest Connection", 
		{
			delayInMinutes:  0.1, 
			periodInMinutes: 0.2
		} 
	);
}

background.notification = function(item) {

	var momentObj = moment(new Date(item.created));

	var dateStr   = momentObj.format('HH:mm DD/MM/YY');

	var content   = item.name + " - " + dateStr;

	var opts = {
		type:           "basic",
		contextMessage: content,
		title:          "Computer Science Alumni",
		message:        item.content ,
		iconUrl:        "./img/128.png"
	}

	chrome.notifications.create(
		content, 
		opts,
		function(notificationId) {

		}
	);
}

background.updateFeeds = function() {

	if (background.debug)
		console.log("background.updateFeeds: function run!");

	var restReq   = RESTToolKit.get(background.url);

	var feedsObjs = restReq.responseJSON;

	var feedsStr  = JSON.stringify(feedsObjs);
	var last      = JSON.stringify(background.last);

	if (feedsStr != last) {
		if (background.debug)
			console.log("background.updateFeeds: object differs.");

		var diffed = utils.diff(feedsObjs, background.last);

		if (diffed.length > 0) {

			diffed.forEach(
				function(item) {
					background.notification(item);
				}
			);
		}

		LocalStorage.save(feedsObjs, background.key);
		background.last = feedsObjs;
	} 
}

chrome.alarms.onAlarm.addListener(
	function(alarm) {
		background.updateFeeds();
	}
);

window.addEventListener(
	"load", 
	function() {
		background.init();
	}
);