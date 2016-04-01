/** 
	Global JS File for the Fresh Delivery Demo Site 
	- Manages Login, User Roles, and Logout 
	- Helper functions 
	- Injection of the common top navigation into all pages
**/


//namespace for the common application functions
var app = app || {};

//look up the user. since this is a static demo site, we use a configuration file instead of a database
app.lookupUser = function(userName, pass, callback) {
	$.getJSON('./config/config.json', function(data) {
		var user = data.users[userName];
		if (typeof user === 'undefined') {
			return callback('user does not exist');
		}
		if (user.password !== pass) {
			return callback('incorrect password');
		}
		return callback(null, user);
	});
};

//log the user in
app.login = function(user, pass) {

	//Lookup the user against the configuration file. This is an async function call so we need to pass a callback.
	this.lookupUser(user, pass, function(err, data) {
		//notify the user of errors (e.g. wrong username / pass)
		if (err) {
			return alert(err);
		}
		//store the user info for the session 
		sessionStorage.userRole = data.role;
		sessionStorage.jrsConfig = JSON.stringify(data.jrsConfig);
		sessionStorage.userName = user;
		sessionStorage.loggedIn = true;

		//refresh the page
		window.location = window.destURL || window.location.href;
	});


};

//log the user out
app.logout = function() {
	//clear all saved data from the session
	sessionStorage.clear();
	window.location = "./index.html";
};

//some charts include a large number of thumnails, use this function to pre-load data to improve the user experience
app.preLoadImages = function(images) {
	for (var i = 0, l = images.length; i < l; i++) {
		(new Image()).src = images[i];
	}
};

//Inject the common top navigation and listen for login / out clicks
$(function() {

	//load the top navigation
	$.get('./partials/topnav.html', function(tmpl) {
		var userData = {
			loggedIn: sessionStorage.loggedIn || false,
			admin: sessionStorage.userRole === 'admin',
			userName: sessionStorage.userName
		};
		var template = Handlebars.compile(tmpl);
		$('header').html(template(userData));
	});

	//handle login clicks and modals
	$(document).on('click', "#login", function(e) {
		console.log('login click');
		e.preventDefault();
		//fire the modal 
		$.get('./partials/loginModal.html', function(template) {
			$("#loginModal").html(template);
			$("#myModal").modal();
		});

	});

	//handle logout clicks
	$(document).on('click', "#logout", function() {
		app.logout();
		console.log('logout click');
	});

	//handle login form submit
	$(document).on('submit', "#loginForm", function(e) {
		//app.validate();
		e.preventDefault();
		var data = $("#loginForm :input").serializeArray();
		var user = data[0].value,
			pass = data[1].value;
		app.login(user, pass);

	});

	//handle additional login clicks
	$('a[href="#login"]').on('click', function(e){
		e.preventDefault();
		window.destURL = $(this).attr('data-target');
		//fire the modal 
		$.get('./partials/loginModal.html', function(template) {
			$("#loginModal").html(template);
			$("#myModal").modal();
		});

	});

});
