/*
 * Author:  Tom Rosier
 * Date:    26/11/2014
 * Project: SE31520-Browser-Extension
 * File:    utils.js
 * Desc:    Keeps commonly used page functions in one easily accessible module.
 */

var utils = utils || {};

// Default area of the page that pagionisation places the elements.
utils.listID   = '#list';

// Default location for the page numbers to be placed.
utils.pageNoID = '#pagenumber';

utils.debug    = false;

// Current number of page groups loaded.
utils.count    = 0;

// Page details.
utils.pages    = []; // Keep a easy and accessible variable to get to the page groups.
utils.page     = 0;  // Keep the page that we are currently on.
utils.perPage  = 6;  // Number of items per page. 

utils.curPage  = 1;     // This is the global total of pages.
utils.noData   = false; // When there is no more data we set this.

// This is the load content default constructor.
utils.loadContent = function(item) {};

// This will load the next page in the pagionisation.
utils.nextPage = function() {

	// Check we have not exceeded the number of pages that we can view.
	if (this.page < this.pages.length -1) 
		this.page++;

	// If we still have data then we increment the global number of pages.
	if (!this.noData) 
		this.curPage++;

	// Then reload the page.
	this.loadPage();
}

// Go back one page.
utils.lastPage = function() {

	// Decrement the index of the currently loaded page.
	if (this.page > 0) 
		this.page--;

	// Then reload the page
	this.loadPage();
}

// Load the content for the page.
utils.loadPage = function() {

	// Clear the current contents of the page.
	$(this.listID).empty();

	// Get all the visible elements on the page.
	var utilsObjs = this.pages[this.page];

	// If there are some visible elements.
	if (utilsObjs) {

		// For each of the elements then we add them to the page.
		utilsObjs.forEach(
			function(obj) {
				// Add a singular element.
				utils.loadContent(obj);
			}
		);

		// Build the page number string.
		var pNo = (this.page + 1) + "/" + this.pages.length;

		// Add the page number string to the page.
		$(this.pageNoID).text(pNo);
	}
}

// Add some new data to be pagionised.
utils.pagination = function(jsonArray) {

	// Get the current list of pages.
	var retArr = this.pages;

	// Get the array of new elements.
	var newEls = jsonArray;

	// Check for any elements that do not already exist within the page array.
	for (var i = 0; i < retArr.length; i++) 
		 newEls = this.diff(newEls, retArr[i]);
	
	if (this.debug)
		console.log("utils.pagination: newEls " + JSON.stringify(newEls));

	// If there is some new elements then we want to add them.
	if (newEls.length > 0) {

		// Temp array to hold each page as we build it.
		var tArr = [];

		// If there is already data loaded.
		if (retArr.length > 0) {

			// Get the last index of the page arrays.
			var lastInd = retArr.length - 1;

			// Get the last page array element.
			var lastElm = retArr[lastInd];

			// If there is still space in the last page.
			if (lastElm.length < this.perPage) {
				// We prepare the array to have new items added to it.
				tArr   = lastElm;
				retArr = retArr.splice(lastInd, 1);
			}
		}

		// Add the new elements into the array.
		for (var i = 0; i < newEls.length; i ++) {

			// If we exceed the page length.
			if (tArr.length >= this.perPage) {
				// Then we add the full array to the page stack.
				retArr.push(tArr);
				// Empty the array.
				tArr = [];
			}

			// Add the element into the temp element array.
			tArr.push(newEls[i]);
		}

		// Push the global array onto the page array.
		retArr.push(tArr);

		// Reassign the global pages to this new version of it.
		this.pages = retArr;

	}
}

// This clears the current page array.
utils.clear = function(nextObj) {
	this.pages = [];
}

// This checks for differences between arrays.
utils.diff = function(inArray, compArray) {
	
	// Temp array to return.
	var ret = [];

	// Check there is actually objects being passed in.
	if (inArray && compArray) {

		// For all the elements in the first array.
		for (var i = 0; i < inArray.length; i++) {

			// Get the current element we are comparing.
			var inn   = inArray[i];

			// Convert the object to a string because it makes comparison easier.
			var inStr = JSON.stringify(inn);

			// Flag to help when we have found the element.
			var found = false;

			// Loop through the other array.
			for (var j = 0; j < compArray.length; j++) {

				// Convert the object we are looking at to a string to help with comparisons.
				var comp = JSON.stringify(compArray[j]);

				// If the objects are the same.
				if (inStr == comp) {

					// Then we say we found it.
					found = true;

					// And exit the loop.
					break;
				}
			}

			// If the element was not found then we add it to the temp array to return.
			if (!found) 
				ret.push(inn);
			
		}
	}

	// Return the items that didn't exist in the new array.
	return ret;
}

// Load the next page in pagionisation.
utils.loadPages = function(url, reload) {

	// If we are reloading the whole log then we clear the current page array.
	if (reload)
		utils.clear();

	// If we have not hit the end of the data or are reloading the data..
	if (!this.noData || reload) {

		// For all the pages that have already been discovered. Just in case we need to reload all the data.
		for (var i = 0; i < this.curPage; i++) {

			// If we are not reloading all the data then we just need to load the next page.
			if (!reload)
				i = this.curPage -1;

			// Get the next page from via the REST interface.
			var restReq   = RESTToolKit.get(url + "?page=" + (i + 1));

			// Get the actual JSON object from the REST request.
			var usersObjs = restReq.responseJSON;

			// If that object is not null.
			if (usersObjs) {

				// And there is new objects in that array.
				if (usersObjs.length > 0) {

					if (this.debug)
						console.log("utils.loadData: usersObjs: " + JSON.stringify(usersObjs));

					// Load the new content onto the current page array.
					this.pagination(usersObjs);

				} else {
					// Else we have run out of data so don't want to continue.
					this.noData = true;
				}
			}

			// If we are not reloading then we don't want to loop.
			if (!reload)
				break;
		}

		// Reload the page content.
		this.loadPage();
	}
}

// This checks if a user has user credentials entered within the application. Else prompts them to go to the options page.
utils.check4User = function() {

	// Get the user credentials from the Local Storage.
	var user = LocalStorage.load('user');

	// If the user does not exist.
	if (!user) {
		// Throw up a message telling them to enter there details.
		alertify.alert(
			'Please enter your CSA credentials. <br>(Pressing ok will redirect you to the options page.)',
			function() {
				// Redirect to the options screen.
				window.location = "options.html";
			}
		);

	} else {
		// Else then we show the page in all its glory.
		var cont = $('.csa-content');

		cont.removeClass("hidden");
		cont.addClass("animated fadeInDown");
	}
	// Return the status of the user object so other bits of code know what is going on.
	return (user);
}