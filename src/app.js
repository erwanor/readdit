// Define our variables
var debug = 1;
var counter = 0; // parseInt(localStorage.getItem('counter')) || 0; // If the variable counter exists, pull it from the "localStorage" else initialize to zero.
var URL = "http://reddit.com/r/worldnews/top/.json";
var items;

if (debug == 1)
  simply.vibe('short');

// Get the data from reddit
ajax({ url: URL, type: 'json' }, function(resp) {
  items = resp.data;
});

// Scroll the list up or down
// This function is called on button click and accelerometer thing
function scroll_list(way) {
  simply.text({title: items.children[counter].data.score + " upvotes", subtitle: items.children[counter].data.domain, body: items.children[counter].data.title});
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
simply.on('singleClick', function(e) {
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

simply.on('accelTap', function(e) {
  if (debug == 1) console.log(util2.format('Tapped accel axis $axis $direction!', e));
  scroll_list(e.direction > 0 ? 'down' : 'up');
  // simply.subtitle('Tapped ' + (e.direction > 0 ? '+' : '-') + e.axis + '!');
});

// Initial text
simply.setText({
  title: 'Readit',
  body: 'Daily provider of non-sense since 1852',
}, true);

