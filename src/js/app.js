var UI    = require('ui');
var Ajax  = require('ajax');
var Vibe  = require('ui/vibe');
var Accel = require('ui/accel');

var debug = 1;
var counter = 0; // parseInt(localStorage.getItem('counter')) || 0; // If the variable counter exists, pull it from the "localStorage" else initialize to zero.
var items = [];
var subredditcounter = 1;
var start_time = new Date().valueOf(), new_time, time_diff;
var start_force = 12, new_force, force_diff;

var pass = 0;
var start = false;
var URL;
var initialized = false;

//Listeners
Pebble.addEventListener("ready", function() {
  console.log("ready called!");
  initialized = true;
});

Pebble.addEventListener("showConfiguration",
  function(e) {
    Pebble.openURL("http://readdit.s3-website-us-east-1.amazonaws.com/"); // our dyanmic configuration page
  }
);
var options;
Pebble.addEventListener("webviewclosed",
  function(e) {
  if(e.response!= "CANCELED")
    {
  options = JSON.parse(decodeURIComponent(e.response));
  console.log("Options = " + JSON.stringify(options));
  console.log(options.sortby1.toLowerCase());
  console.log("\n http://reddit.com/r/" + localStorage.getItem('subreddit1') + "/" + localStorage.getItem('sortby1') +  "/.json");
  localStorage.setItem('subreddit1',options.subreddit1.toLowerCase());
  localStorage.setItem('sortby1', options.sortby1.toLowerCase());
  localStorage.setItem('subreddit2',options.subreddit2.toLowerCase());
  localStorage.setItem('sortby2',options.sortby2.toLowerCase());
  //console.log(localStorage.getItem('subreddit1'));
  //console.log(localStorage.getItem('sortby1'));

      }
  }
);


// Vibration for installation
if (debug == 1) Vibe.vibrate('short');

URL = "http://reddit.com/r/" + localStorage.getItem('subreddit1') + "/" + localStorage.getItem('sortby1') +  "/.json";


// Get datalove from reddit

Ajax({ url: URL, type: 'json' }, function(resp) {
  items = resp.data;
  console.log("\n ajax sucessful \n");
});

var main = new UI.Card({
  title: 'Readdit',
  subtitle: 'Daily provider of nonsense since 1852',
  body: ''
  
});

main.show();


// Accelerometer
Accel.init();
/*
Accel.config({
  rate: 25,
  samples: 1,
  subscribe: true
});*/

// Scroll the list up or down
// This function is called on button click and accelerometer thing
function scroll_list(way) {
  main.title(items.children[counter].data.score + " upvotes");
  main.subtitle("");
  //main.subtitle(items.children[counter].data.domain);
  main.body(items.children[counter].data.title);
  
  if (debug == 1) console.log("Counter: " + counter + "\n");
  
  if(way === 'down' && counter < 24)
     ++counter;
  else if(way === 'down' && counter === 24 )
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
      scroll_list('up');
      start = true;
      console.log(URL);
      break;
    case 'down' :
      scroll_list('down');
      start = true;
      console.log(URL);
      break;
      
    // Link (page and comments) opening
    case 'select' :
      if(counter > 0)
        Pebble.openURL("http://reddit.com/" + items.children[counter-1].data.permalink + ".compact");
      break;
      
    default :
      if (debug == 1) console.log('lolwut');
      break;
  }
});

main.on('longClick', 'down', function(e){
    console.log("DOWN CLICK");
    scroll_subreddit('down');
    
});

main.on('longClick', 'up', function(e)
{
  console.log("UP CLICK");
  scroll_subreddit('up');
});

function scroll_subreddit(way)
{
  //console.log("Second subreddit " + localStorage.getItem('subreddit2'));
  if(way === 'down' && subredditcounter < 5)
    ++subredditcounter;
  else if(way === 'up' && subredditcounter > 0)
    --subredditcounter;
  //console.log(localStorage.getItem('subreddit'+String(subredditcounter)));
  URL = "http://reddit.com/r/" + localStorage.getItem('subreddit'+String(subredditcounter)) + "/" + localStorage.getItem('sortby' + String(subredditcounter)) + "/.json";
  //console.log(URL);
  Ajax({ url: URL, type: 'json' },
   function(resp) {
    console.log(URL);
    items = resp.data;
    console.log("\n "+ items.childern[counter].data.title + "\n");
    console.log("\n ajax finished \n");
  });
  counter = 0;
  main.title(items.children[counter].data.score + " upvotes");
  main.subtitle("");
  main.body(items.childern[counter].data.title);


}

main.on('accelTap', function(e) {
  /* if (pass > 0) {
    pass--;
    return;
  } */
  scroll_list(e.direction > 0 ? 'up' : 'down');
  // pass += 1;
});
