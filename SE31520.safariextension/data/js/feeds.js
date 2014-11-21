var feeds = feeds || {};

feeds.bCastID = '#broadcasts';

feeds.debug = true;

feeds.count = 0;

feeds.key = 'feeds';

feeds.pages   = [];
feeds.page    = 0;
feeds.perPage = 2;

feeds.init = function() {

	feeds.check4User();

	if (this.debug)
		console.log("feeds.init: Starting.");

	var feedsObjs = LocalStorage.load(this.key);

	if (feedsObjs) {

		if (this.debug)
			console.log("feeds.init: feedsObjs: " + JSON.stringify(feedsObjs));

		var tPages = this.pagination(feedsObjs, this.perPage);

		console.log(JSON.stringify(tPages));

		this.pages = tPages;

		feeds.loadPage();

	}

	$('#backbut').click(
		function(){
			feeds.lastPage();
		}
	);

	$('#nextbut').click(
		function() {
			feeds.nextPage();
		}
	);
}

feeds.nextPage = function() {
	if (this.page < this.pages.length -1) {
		this.page++;
	}

	this.loadPage();
}

feeds.lastPage = function() {
	if (this.page > 0) {
		this.page--;
	}

	this.loadPage();
}

feeds.loadPage = function() {

	$(this.bCastID).empty();

	var feedsObjs = this.pages[this.page];

	feedsObjs.forEach(
		function(obj) {
			feeds.broadcast(obj);
		}
	);

	var pNo = (this.page + 1) + "/" + this.pages.length;

	$('#pagenumber').text(pNo);
}

feeds.pagination = function(jsonArray, perPage) {
	
	var tArr = [];

	var retArr = [];

	var curCount = 0;

	for (var i = 0; i < jsonArray.length; i ++) {

		if (curCount >= perPage) {
			retArr.push(tArr);
			tArr = [];
			curCount = 0;
		}

		tArr.push(jsonArray[i]);
		curCount++;
	}

	retArr.push(tArr);

	return retArr;
}

feeds.check4User = function() {

	var user = LocalStorage.load('user');

	if (!user) {

		alertify.alert(
			'Please enter your CSA credentials. <br>(Pressing ok will redirect you to the options page.)',
			function() {

				window.location = "options.html";
			}
		);

	} else {
		var cont = $('.csa-content');

		cont.removeClass("hidden");
		cont.addClass("animated fadeInDown");
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