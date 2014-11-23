var Options = Options || {};

Options.debug = true;

Options.init = function() {

	Options.load();

	$('#userdata').submit(
		function(event) {
			Options.save();
		    event.preventDefault();
			return false;
		}
	);
}

Options.load = function() {
	var user  = LocalStorage.load('user');

	if (user) {

		$('#password').val(user.pwd);

		$('#username').val(user.name);
	}
}

Options.save = function() {

	var pwd  = $('#password').val();
	var user = $('#username').val();

	if (user) {

		var obj = {
			"name" : user,
			"pwd"  : pwd
		};

		LocalStorage.save(obj, 'user');
	}

	alertify.success(user + '\'s information has been saved')

	chrome.runtime.getBackgroundPage(
		function(e) {
			e.background.init();
		}
	);
}

$(document).ready(
	function() {
		Options.init();
	}
);