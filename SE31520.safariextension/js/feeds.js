/*
 * Author:  Tom Rosier
 * Date:    26/11/2014
 * Project: SE31520-Browser-Extension
 * File:    feeds.js
 * Desc:    Action handlers and logic for the Broadcast page of the application.
 */

var feeds = feeds || {};

feeds.bCastID = '#broadcasts';

feeds.debug   = false;

feeds.key     = 'feeds';

feeds.url     = "http://127.0.0.1:3000/rest/extensions.json";

feeds.init = function() {

	var valid = utils.check4User();

	if (valid) {
		var user = LocalStorage.load('user');

		RESTToolKit.auth(user.name, user.pwd);

		utils.listID  = '#broadcasts';
		utils.perPage = 4;

		utils.loadContent = function(item) {
			feeds.broadcast(item);
		};

		if (this.debug)
			console.log("feeds.init: Starting.");

		feeds.loadData(false);

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

feeds.loadData = function(reload) {

	if (this.debug)
		console.log('running feeds.loadData()');

	utils.loadPages(this.url, reload);

	if (utils.pages.length <= 1) {
		$('#pagenumber').hide();
		$('#buttons').hide();
	}

}

feeds.broadcast = function(bCast) {

	if (this.debug)
		console.log(JSON.stringify(bCast));

	// Convert JSON date object back into a JS date object.
	var dateObj   = new Date(bCast.created);

	var momentObj = moment(dateObj);

	var dateStr   = momentObj.format('MMMM Do YYYY, h:mm:ss a');

	var html = "\
		<div id=\"bcast" + this.count + "\">\
			<h3>" + bCast.name + ' - ' + dateStr + "</h3>\
			<p>" + bCast.content + "</p>\
		</div>\
	";

	$(this.bCastID).append(html);
}

$(document).ready(
	function() {
		feeds.init();
	}
);