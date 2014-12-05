/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */


var UI = require('ui');
var ajax = require('ajax');
var Base64 = require('./base64');

var login = "admin";
var password ="password";

var main = new UI.Card({
  title: 'CSA Application',
  icon: 'images/menu_icon.png',
  subtitle: 'Hello World!',
  body: 'Press any button.'
});

main.show();

main.on('click', 'select', function(e) {
  getBroadcasts();
});

function showNotification(data) {
  
    if (data.length > 0) {
      
        var bc = data[0];
      
        var card = new UI.Card();
        card.title(bc.name);
        card.subtitle(bc.email);
        card.body(bc.content);
        card.show();
    }
}

function getBroadcasts() {
  ajax(
    {
      url: 'http://tomrosier.co.uk:3000/rest/extensions.json',
      type: 'json',
      method: 'get',
      async: false,
      headers: {
        Authorization: 'Basic ' +  Base64.encode(login + ":" + password),
      }
    },
    function(data) {

      showNotification(data);

      // Success!
      console.log('Successfully fetched weather data!');
    },
    function(error) {
      console.log('Failed fetching weather data: ' + error);
    }
  );
}

getBroadcasts();