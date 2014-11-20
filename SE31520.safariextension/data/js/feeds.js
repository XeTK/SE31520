var feeds = feeds || {};

feeds.bCastID = '#broadcasts';

feeds.debug = true;

feeds.count = 0;

feeds.key = 'feeds';

feeds.init = function() {

	if (this.debug)
		console.log("feeds.init: Starting.");

	var feedsObjs = LocalStorage.load(this.key);

	if (feedsObjs) {

		if (this.debug)
			console.log("feeds.init: feedsObjs: " + JSON.stringify(feedsObjs));

		feedsObjs.forEach(
			function(obj) {
				feeds.broadcast(obj);
			}
		);
	}
}

feeds.broadcast = function(bCast) {

	if (this.debug)
		console.log(JSON.stringify(bCast));

	// Convert JSON date object back into a JS date object.
	var dateObj = new Date(bCast.created);

	var momentObj = moment(dateObj);

	var dateStr = momentObj.format('MMMM Do YYYY, h:mm:ss a');

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