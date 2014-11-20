
var background = background || {}

background.last = {};

background.url = "http://127.0.0.1:3000/rest/extensions.json";

background.key = 'feeds';

background.debug = true;

background.dirty = false;

background.init = function() {

	background.last = LocalStorage.load(this.key);

	chrome.alarms.create(
		"Check Rest Connection", 
		{
			delayInMinutes: 0.1, 
			periodInMinutes: 0.2
		} 
	);
}

background.notification = function(item) {

	var momentObj = moment(new Date(item.created));

	var dateStr = momentObj.format('HH:mm DD/MM/YY');

	var content = item.name + " - " + dateStr;

	var opts = {
		type: "basic",
		contextMessage: content,
		title: "Computer Science Alumni",
		message: item.content ,
		iconUrl: "./data/img/128.png"
	}

	chrome.notifications.create(
		content, 
		opts,
		function(notificationId) {

		}
	);
}

background.updateFeeds = function() {

	if (this.debug)
		console.log("background.updateFeeds: function run!");

	RESTToolKit.auth('admin','password');

	var restReq = RESTToolKit.get(this.url);

	var feedsObjs = restReq.responseJSON;

	var feedsStr = JSON.stringify(feedsObjs);
	var last     = JSON.stringify(background.last);

	if (feedsStr != last) {
		if (this.debug)
			console.log("background.updateFeeds: object differs.");

		var diffed = background.diff(feedsObjs, background.last);

		if (diffed.length > 0) {

			diffed.forEach(
				function(item) {
					background.notification(item);
				}
			);
		}

		LocalStorage.save(feedsObjs, this.key);
		background.last = feedsObjs;
	} 
}

background.diff = function(inArray, compArray) {

	var ret = [];

	console.log("inArray: " + JSON.stringify(inArray));
	console.log("compArray: " + JSON.stringify(compArray));

	for (var i = 0; i < inArray.length; i++) {

		var inn = inArray[i];

		var inStr = JSON.stringify(inn);

		var found = false;

		for (var j = 0; j < compArray.length; j++) {

			var comp = JSON.stringify(compArray[j]);

			if (inStr == comp) {

				found = true;

				break;
			}
		}

		if (!found) {
			console.log("not found" + JSON.stringify(inn));
			ret.push(inn);
		}
	}

	return ret;
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