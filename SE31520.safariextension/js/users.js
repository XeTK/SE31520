/*
 * Author:  Tom Rosier
 * Date:    26/11/2014
 * Project: SE31520-Browser-Extension
 * File:    users.js
 * Desc:    Action handlers and logic for the Users page.
 */

var users = users || {};

// Define the region that the list is put into.
users.userID  = '#users';

users.debug   = false;

// The base URL for the rest interfaces.
users.baseUrl = "http://127.0.0.1:3000/users";

// Create the url for getting the global list of users.
users.url     = users.baseUrl + ".json";

// Keep a count of the users so we can give them a unique ID.
users.count   = 0;

// Keep the address of the element we are currently editting.
users.curEdit = '';

// Method that is run when the page is loaded.
users.init = function() {

	// Check to see if the user has been validated.
	var valid = utils.check4User();

	// If the user details have been entered.
	if (valid) {

		// Load the user credentials from local storage.
		var user = LocalStorage.load('user');

		// Authenticate the user within the RESTToolKit API.
		RESTToolKit.auth(user.name, user.pwd);

		// Pass the information that is needed to set up pagionisation.
		utils.listID  = '#users';
		utils.perPage = 3;

		// Override the load content segment, to allow us to load each user.
		utils.loadContent = function(item) {
			users.user(item);
		};

		if (this.debug)
			console.log("users.init: Starting.");

		// Load the page's content.
		users.loadData(false);

		// Bind the back button on the page to the page back in pagionisation.
		$('#backbut').click(
			function(){
				utils.lastPage();
			}
		);

		// Bind the next button to load the next page from pagionisation.
		$('#nextbut').click(
			function() {
				users.loadData(false);
				utils.nextPage();
			}
		);

		// When the submit button on the form is pressed then we want to submit the form via rest.
		$('#edit_user').submit(
			function(event) {

				// Override the default behaviour that is present when submitting a form.
				event.preventDefault();

				// Serialise the data from the form.
				var formData = $("#edit_user").serialize();
				
				// CORS is having a bit of a issue with cross domain XHR's ?!?!
				try {
					// Create a POST object that we sent back to the CSA application.
					RESTToolKit.postASync(
						users.curEdit, 
						formData, // The form data we got earlier.
						function(data) {

							// Reload the page with the new data.
							users.loadData(true);

							// Hide the modal window we used to enter the data in.
							$('#basicModal').modal('hide');

							// Build the persons name into a nice string to be displayed.
							var name = $('#user_firstname').val() + ' ' + $('#user_surname').val();

							// Display to the user that we have updated there data.
							alertify.success(name + '\'s Data has been updated!');
						}
					);
				} catch(err) {
					console.error(err);
				}

				return false;
			}
		);
	}
}

// Load the various page segments.
users.loadData = function(reload) {

	if (this.debug)
		console.log('running user.loadData()');

	// Call the pagionisation method within utils to display the appropriate parts of the page.
	utils.loadPages(this.url, reload);

	// If there is less than one page then we dont want to display the pagionisation buttons.
	if (utils.pages.length <= 1) {
		$('#pagenumber').hide();
		$('#buttons').hide();
	}

	// If the page fails to load for what ever reason. or there really is no users!!
	if (utils.pages.length == 0) {
		$(this.userID).append('<h2>Odd their does not seem to be any users.<br>Pretty sure there must be if you logged in...</h2>');
	}

}


// Load the modal window that allows us to edit the user details.
users.loadEdit = function(userId) {

	// Build the correct url for the post request that we send this object to.
	var baseUrl = this.baseUrl + '/' + userId;

	// Hold the post url till we actually need it.
	var postURL = baseUrl;

	// Build the base url to get data about the user we are currently interagating.
	var url     = baseUrl + '.json';

	// Get the user object from the REST request.
	var user    = RESTToolKit.get(url);

	// Extract the actualy user object from the rest request. 
	user        = user.responseJSON;

	// If it is a valid object then we continue.
	if (user) {

		// Load all the appropriate data from the rest object we got back from the CSA app.
		$('#user_firstname').val(user.firstname);
		$('#user_surname').val(user.surname);
		$('#user_email').val(user.email);
		$('#user_phone').val(user.phone);
		$('#user_grad_year').val(user.grad_year);

		// Open the modal window to allow the user to edit the data.
		$('#basicModal').modal();

		// Set the currently being edited url to the global variable to make it easy to access.
		this.curEdit = postURL;
	}

}

// This is the method that adds new users to the form. It overwrites the class within Utils.
users.user = function(us) {

	if (this.debug)
		console.log(JSON.stringify(us));

	// This this the HTML for the user elements.
	var html = "\
		<div data-restid=\"" + us.url + "\" id=\"user" + this.count + "\">\
			<h3>" + us.firstname + " " + us.surname + " - " + us.grad_year + "</h3>\
	        <button type=\"submit\" class=\"btn btn-info editbut\" id=\"editbut" + us.id + "\">edit</button>\
			<p>phone: " + us.phone + "</p>\
			<p>email: <a href=\"mailto:" + us.email + "\">" + us.email + "</p>\
		</div>\
	";

	// Append the new user to the page.
	$(this.userID).append(html);

	// This is the function that is called for when the edit button is pressed.
	function clickEvent(userID) {
		var inUserID = userID;
		this.run = function() {
			users.loadEdit(inUserID);
		}
	}

	// Create a new instantiation of the clickEvent object that we defined above.
	var runable  = new clickEvent(us.id);

	// Build a variable with the element id in to pass to jQuery.
	var buttonID = "#editbut" + us.id;

	// Bind that new runable object to the button within the DOM so when it is pressed run the edit method.
	$(buttonID).click(runable.run);
}

// When page loads then we run the initiate method.
$(document).ready(
	function() {
		users.init();
	}
);