var TWITTER_COUNTER_ID = '#twitter-char-count';
var BROADCAST_AREA_ID = '#broadcast_content';
var TWITTER_FEEDS_ID = '#feeds_twitter';
var SHORTEN_URL_ID = '#url-part';
var TWITTER_MESSAGE_LIMIT = 140;
var START_COLOUR = 'FFFFFF';
var END_COLOUR = 'F61F02';

var twitterCharEffect = true;

//$(window).load(function () {
$(document).on('ready page:change', function () {

    $(BROADCAST_AREA_ID).keyup(function (event) {
        if (!twitterCharEffect) {
            colourAlerter(event.target, 'background', START_COLOUR,
                START_COLOUR, TWITTER_MESSAGE_LIMIT, 0);
        }
        else{
            twitterCharCountEffect(event.target);
        }
    });

    $(TWITTER_FEEDS_ID).click(function (event) {
        $(SHORTEN_URL_ID).toggle();
        $(TWITTER_COUNTER_ID).toggle();
        twitterCharEffect = !twitterCharEffect;
    });

    // Trigger the keyup in order to initialise twitterCharCountEffect
    $(BROADCAST_AREA_ID).trigger('keyup');

});


function twitterCharCountEffect(textArea) {

    // Every time there's a character typed we must recalculate the number of characters
    // in the text area and set the background colour of the text area to indicate
    // how close we are to the Twitter 140 maximum and also reset the twitterCounter
    // value and its colour

    // Set the counter value
    var count = 0;
    if (twitterCharEffect) {
        count = textArea.value.length;
        $(TWITTER_COUNTER_ID).html(TWITTER_MESSAGE_LIMIT - count);
    }

    // Change the background colour for the counter label and text area
    //alert('TWITTER_MESSAGE_LIMIT - count: ' + (TWITTER_MESSAGE_LIMIT - count));

    colourAlerter(textArea, 'background', START_COLOUR,
        END_COLOUR, TWITTER_MESSAGE_LIMIT, count);
    if (TWITTER_MESSAGE_LIMIT - count + 1 <= 0) {
        $(TWITTER_COUNTER_ID).css('color', '#' + END_COLOUR);
    } else {
        $(TWITTER_COUNTER_ID).css('color', '#000000');
    }

}

// main function to process the fade request //
function colourAlerter(target, styleName, start, end, steps, position) {
    var startrgb, endrgb, eg, eb, gint, bint, r, g, b;

    endrgb = colourConv(end);

    // Only alter the green and blue components. Key red as is.
    eg = endrgb[1];
    eb = endrgb[2];

    startrgb = colourConv(start);
    r = startrgb[0];
    g = startrgb[1];
    b = startrgb[2];

    gint = Math.round(Math.abs(g - eg) / steps);
    bint = Math.round(Math.abs(b - eb) / steps);

    if (gint == 0) {
        gint = 1
    }
    if (bint == 0) {
        bint = 1
    }

    if (g >= 0 && b >= 0) {
        g = g - gint * position;
        b = b - bint * position;
    } else {
        g = 0;
        b = 0;
    }

    colour = 'rgb(' + r + ',' + g + ',' + b + ')';
    if (styleName == 'background') {
        target.style.backgroundColor = colour;
    } else if (styleName == 'border') {
        target.style.borderColor = colour;
    } else {
        target.style.color = colour;
    }
}

// Convert the color to rgb from hex //
function colourConv(colour) {
    var rgb = [parseInt(colour.substring(0, 2), 16),
        parseInt(colour.substring(2, 4), 16),
        parseInt(colour.substring(4, 6), 16)];
    return rgb;
}
