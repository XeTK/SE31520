/*
 * Author:  Tom Rosier
 * Date:    26/11/2014
 * Project: SE31520-Browser-Extension
 * File:    feeds.js
 * Desc:    Action handlers and logic for the Broadcast page of the application.
 */

var feeds = feeds || {};

// This is the region where the list of broadcasts go.
feeds.bCastID = '#broadcasts';

feeds.debug   = false;

// URL to the RESTful interface.
feeds.url     = "http://127.0.0.1:3000/rest/extensions.json";

// Method that populate the page on first run.
feeds.init = function() {

	// Check if the user has been authenticated.
	var valid = utils.check4User();

	// If they have been validated.
	if (valid) {

		// Load the user credentials from Local Storage.
		var user = LocalStorage.load('user');

		// Authenticate the user ready for REST transaction.
		RESTToolKit.auth(user.name, user.pwd);

		// Set the variables for the paginisation libary to the information for this page.
		utils.listID  = '#broadcasts';
		utils.perPage = 4;

		// Override the method for displaying the entries.
		utils.loadContent = function(item) {
			feeds.broadcast(item);
		};

		if (this.debug)
			console.log("feeds.init: Starting.");

		// Load page content.
		feeds.loadData(false);

		// Bind the buttons for previous and next in pagionisation.
		$('#backbut').click(
			function(){
				utils.lastPage();
			}
		);

		$('#nextbut').click(
			function() {
				feeds.loadData(false);
				utils.nextPage();
			}
		);	
	}
}

// Loads the page content.
feeds.loadData = function(reload) {

	if (this.debug)
		console.log('running feeds.loadData()');

	// Load page content.
	utils.loadPages(this.url, reload);

	// Check if we have more than one page. If we dont then we definatly dont want to show the controls.
	if (utils.pages.length <= 1) {
		$('#pagenumber').hide();
		$('#buttons').hide();
	}

	if (utils.pages.length == 0) {
		$(this.bCastID).append('<h2>There has not been any broadcast\'s yet!</h2>');
	}

}

// This creates singular elements within the list of broadcasts
feeds.broadcast = function(bCast) {

	if (this.debug)
		console.log(JSON.stringify(bCast));

	// Convert JSON date object back into a JS date object.
	var dateObj   = new Date(bCast.created);

	var momentObj = moment(dateObj);

	var dateStr   = momentObj.format('MMMM Do YYYY, h:mm:ss a');

	// Build the html!!
	var html = "\
		<div id=\"bcast" + this.count + "\">\
			<h3>" + bCast.name + ' - ' + dateStr + "</h3>\
			<p>" + bCast.content + "</p>\
		</div>\
	";

	$(this.bCastID).append(html);
}

// Load the init function when page has been loaded.
$(document).ready(
	function() {
		feeds.init();
	}
);