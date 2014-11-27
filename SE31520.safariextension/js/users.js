/*
 * Author:  Tom Rosier
 * Date:    26/11/2014
 * Project: SE31520-Browser-Extension
 * File:    users.js
 * Desc:    Action handlers and logic for the Users page.
 */

var users = users || {};

users.userID  = '#users';

users.debug   = false;

users.baseUrl = "http://127.0.0.1:3000/users";

users.url     = users.baseUrl + ".json";

users.count   = 0;

users.curEdit = '';

users.init = function() {

	var valid = utils.check4User();

	if (valid) {

		var user = LocalStorage.load('user');

		RESTToolKit.auth(user.name, user.pwd);

		utils.listID  = '#users';
		utils.perPage = 3;

		utils.loadContent = function(item) {
			users.user(item);
		};

		if (this.debug)
			console.log("users.init: Starting.");

		users.loadData(false);

		$('#backbut').click(
			function(){
				utils.lastPage();
			}
		);

		$('#nextbut').click(
			function() {
				users.loadData(false);
				utils.nextPage();
			}
		);

		$('#edit_user').submit(
			function(event) {

				var formData = $("#edit_user").serialize();
				
				// CORS is having a bit of a issue with cross domain XHR's ?!?!
				try {
					RESTToolKit.postASync(
						users.curEdit, 
						formData,
						function(data) {

							users.loadData(true);

							$('#basicModal').modal('hide');

							var name = $('#user_firstname').val() + ' ' + $('#user_surname').val();

							alertify.success(name + '\'s Data has been updated!');
						}
					);
				} catch(err) {
					console.error(err);
				}

				event.preventDefault();

				return false;
			}
		);
	}
}

users.loadData = function(reload) {

	if (this.debug)
		console.log('running user.loadData()');

	utils.loadPages(this.url, reload);

	if (utils.pages.length <= 1) {
		$('#pagenumber').hide();
		$('#buttons').hide();
	}

}



users.loadEdit = function(userId) {

	var baseUrl = this.baseUrl + '/' + userId;

	var postURL = baseUrl;

	var url     = baseUrl + '.json';

	var user    = RESTToolKit.get(url);

	user        = user.responseJSON;

	if (user) {

		$('#user_firstname').val(user.firstname);
		$('#user_surname').val(user.surname);
		$('#user_email').val(user.email);
		$('#user_phone').val(user.phone);
		$('#user_grad_year').val(user.grad_year);
		$('#basicModal').modal();

		this.curEdit = postURL;
	}

}


users.user = function(us) {

	if (this.debug)
		console.log(JSON.stringify(us));

	var html = "\
		<div data-restid=\"" + us.url + "\" id=\"user" + this.count + "\">\
			<h3>" + us.firstname + " " + us.surname + " - " + us.grad_year + "</h3>\
	        <button type=\"submit\" class=\"btn btn-info editbut\" id=\"editbut" + us.id + "\">edit</button>\
			<p>phone: " + us.phone + "</p>\
			<p>email: <a href=\"mailto:" + us.email + "\">" + us.email + "</p>\
		</div>\
	";

	$(this.userID).append(html);

	function clickEvent(userID) {
		var inUserID = userID;
		this.run = function() {
			users.loadEdit(inUserID);
		}
	}

	var runable  = new clickEvent(us.id);

	var buttonID = "#editbut" + us.id;

	$(buttonID).click(runable.run);
}

$(document).ready(
	function() {
		users.init();
	}
);