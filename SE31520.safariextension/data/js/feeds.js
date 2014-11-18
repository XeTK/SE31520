var feeds = feeds || {};

feeds.url = "http://127.0.0.1:3000/rest/extensions.json";

feeds.bCastID = '#broadcasts';

feeds.debug = true;

feeds.count = 0;

feeds.init = function() {

	if (this.debug)
		console.log("feeds.init: Starting.");

	RESTToolKit.auth('admin','password');

	var restReq = RESTToolKit.get(this.url);

	if (this.debug)
		console.log("feeds.init: restReq obj: " + JSON.stringify(restReq));

	var feedsObjs = restReq.responseJSON;

	if (this.debug)
		console.log("feeds.init: feedsObjs: " + JSON.stringify(feedsObjs));

	feedsObjs = feedsObjs.reverse();

	feedsObjs.forEach(
		function(obj) {
			feeds.broadcast(obj);
		}
	);

}

feeds.broadcast = function(bCast) {

	if (this.debug)
		console.log(JSON.stringify(bCast));

	var dateStr = moment(new Date(bCast.created));

	dateStr = dateStr.format('MMMM Do YYYY, h:mm:ss a');

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