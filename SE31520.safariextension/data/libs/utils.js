var utils = utils || {};

utils.listID = '#list';

utils.pageNoID = '#pagenumber';

utils.debug = false;

utils.count = 0;

utils.pages   = [];
utils.page    = 0;
utils.perPage = 6;

utils.curPage = 1;
utils.noData  = false;

utils.loadContent = function(item) {};

utils.nextPage = function() {
	if (this.page < this.pages.length -1) 
		this.page++;

	if (!this.noData) 
		this.curPage++;

	this.loadPage();
}

utils.lastPage = function() {
	if (this.page > 0) 
		this.page--;

	this.loadPage();
}

utils.loadPage = function() {

	$(this.listID).empty();

	var utilsObjs = this.pages[this.page];

	utilsObjs.forEach(
		function(obj) {
			utils.loadContent(obj);
		}
	);

	var pNo = (this.page + 1) + "/" + this.pages.length;

	$(this.pageNoID).text(pNo);
}

utils.pagination = function(jsonArray) {

	var retArr = this.pages;

	var newEls = jsonArray;

	for (var i = 0; i < retArr.length; i++) 
		 newEls = this.diff(newEls, retArr[i]);
	
	if (this.debug)
		console.log("utils.pagination: newEls " + JSON.stringify(newEls));

	if (newEls.length > 0) {

		var tArr = [];

		if (retArr.length > 0) {
			var lastInd = retArr.length - 1;

			var lastElm = retArr[lastInd];

			if (lastElm.length < this.perPage) {
				tArr = lastElm;
				retArr = retArr.splice(lastInd, 1);
			}
		}

		for (var i = 0; i < newEls.length; i ++) {

			if (tArr.length >= this.perPage) {
				retArr.push(tArr);
				tArr = [];
			}

			tArr.push(newEls[i]);
		}

		retArr.push(tArr);

		this.pages = retArr;

	}

	return retArr;
}

utils.clear = function(nextObj) {
	this.pages = [];
}

utils.diff = function(inArray, compArray) {
	
	var ret = [];

	if (inArray && compArray) {

		for (var i = 0; i < inArray.length; i++) {

			var inn   = inArray[i];

			var inStr = JSON.stringify(inn);

			var found = false;

			for (var j = 0; j < compArray.length; j++) {

				var comp = JSON.stringify(compArray[j]);

				if (inStr == comp) {

					found = true;

					break;
				}
			}

			if (!found) 
				ret.push(inn);
			
		}
	}

	return ret;
}

utils.loadPages = function(url, reload) {

	if (reload)
		utils.clear();

	if (!this.noData || reload) {

		for (var i = 0; i < this.curPage; i++) {

			if (!reload)
				i = this.curPage -1;

			var restReq   = RESTToolKit.get(url + "?page=" + (i + 1));

			var usersObjs = restReq.responseJSON;

			if (usersObjs) {

				if (usersObjs.length > 0) {
					if (this.debug)
						console.log("utils.loadData: usersObjs: " + JSON.stringify(usersObjs));

					this.pagination(usersObjs);

				} else {
					this.noData = true;
				}
			}

			if (!reload)
				break;
		}

		this.loadPage();
	}
}

utils.check4User = function() {

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