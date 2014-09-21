// Requires
var UI    = require('ui');
var Ajax  = require('ajax');
var Vibe  = require('ui/vibe');
var Accel = require('ui/accel');

// Define our variables
var debug = 1;
var counter = 0; // parseInt(localStorage.getItem('counter')) || 0; // If the variable counter exists, pull it from the "localStorage" else initialize to zero.
var URL = "http://reddit.com/r/worldnews/top/.json";
var items;

// Vibration for installation
if (debug == 1)
  Vibe.vibrate('short');

// Initial UI
var main = new UI.Card({
  title: 'Readdit',
  subtitle: 'Daily provider of nonsense since 1852',
  body: ''
});

main.show();

// Get datalove from reddit
Ajax({ url: URL, type: 'json' }, function(resp) {
  items = resp.data;
});

// Accelerometer
Accel.init();

// Scroll the list up or down
// This function is called on button click and accelerometer thing
function scroll_list(way) {
  main.title(items.children[counter].data.score + " upvotes");
  main.subtitle(items.children[counter].data.domain);
  main.body(items.children[counter].data.title);
  main.show();
  
  if (debug == 1) console.log("Counter: " + counter + "\n");
  
  if(way === 'down' && counter < 24)
     ++counter;
  else if(way === 'down' && counter === 24)
    counter = 0;
  else if(way === 'up' && counter > 0)
    --counter;
  else if(way === 'up' && counter === 0)
    counter = 24;
  
  localStorage.setItem('counter', counter);
}

// Monitor button clicks and call appropriate function
main.on('click', function(e) {
  switch (e.button) {
    case 'up' :
    case 'down' :
      scroll_list(e.button);
      break;
      
    // Preserved for link (page and comments) opening
    default :
      if (debug == 1) console.log('lolwut');
      break;
  }
});
/*
main.on('accelTap', function(e) {
  // if (debug == 1) console.log(util2.format('Tapped accel axis $axis $direction!', e));
  scroll_list(e.direction > 0 ? 'down' : 'up');
});
*/