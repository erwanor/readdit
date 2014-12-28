var UI = require('ui');
var Ajax = require('ajax');
var Vibe = require('ui/vibe');
var Accel = require('ui/accel');
var Vector2 = require('vector2');

var debug = 1;
var counter = 0; // parseInt(localStorage.getItem('counter')) || 0; // If the variable counter exists, pull it from the "localStorage" else initialize to zero.
var items = [];
var subredditcounter = 1;
var start_time = new Date().valueOf(),
  new_time, time_diff;
var start_force = 12,
  new_force, force_diff;

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
    if (e.response != "CANCELED") {
      options = JSON.parse(decodeURIComponent(e.response));
      console.log("Options = " + JSON.stringify(options));
      console.log(options.sortby1.toLowerCase());
      console.log("\n http://reddit.com/r/" + localStorage.getItem('subreddit1') + "/" + localStorage.getItem('sortby1') + "/.json");
      localStorage.setItem('subreddit1', options.subreddit1.toLowerCase());
      localStorage.setItem('sortby1', options.sortby1.toLowerCase());
      localStorage.setItem('subreddit2', options.subreddit2.toLowerCase());
      localStorage.setItem('sortby2', options.sortby2.toLowerCase());
      localStorage.setItem('subreddit3', options.subreddit3.toLowerCase());
      localStorage.setItem('sortby3', options.sortby3.toLowerCase());
      localStorage.setItem('subreddit4', options.subreddit4.toLowerCase());
      localStorage.setItem('sortby4', options.sortby4.toLowerCase());
      localStorage.setItem('subreddit5', options.subreddit5.toLowerCase());
      localStorage.setItem('sortby5', options.sortby5.toLowerCase());


    }
  }
);


// Vibration for installation
if (debug == 1) Vibe.vibrate('short');

URL = "http://reddit.com/r/" + localStorage.getItem('subreddit1') + "/" + localStorage.getItem('sortby1') + "/.json";


// Get datalove from reddit

Ajax({
  url: URL,
  type: 'json'
}, function(resp) {
  items = resp.data;
  console.log("\n ajax sucessful \n");
});

/*var main = new UI.Card()
{
  title: "Readdit"
}*/

var main = new UI.Window();
var titleRect = new UI.Rect({
  position: new Vector2(0, 0),
  size: new Vector2(144, 20),
  backgroundColor: 'white',
  borderColor: 'black'
});



var upvoteText = new UI.Text({
  position: new Vector2(0, 0),
  size: new Vector2(72, 5),
  text: "Test",
  font: 'gothic-14',
  color: 'black'
});

var subredditText = new UI.Text({
  position: new Vector2(72, 0),
  size: new Vector2(72, 5),
  text: "subreddit",
  font: 'gothic-14',
  color: 'black'
});

var bodyRect = new UI.Rect({
  position: new Vector2(0, 20),
  size: new Vector2(144, 163),
  backgroundColor: 'white',
  borderColor: 'black'

});

var titleText = new UI.Text({
  position: new Vector2(2, 20),
  size: new Vector2(142, 140),
  text: "Title",
  font: 'gothic-24',
  color: 'black',
  textOverflow: 'wrap'
});

main.add(titleRect);
main.add(upvoteText);
main.add(subredditText);
main.add(bodyRect);
main.add(titleText);
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

  if (way === 'down' && counter < 24)
    counter = counter + 1;
  else if (way === 'down' && counter === 24)
    counter = 0;
  else if (way === 'up' && counter > 0)
    counter = counter - 1;
  else if (way === 'up' && counter === 0)
    counter = 24;

  if (debug == 1) console.log("Counter: " + counter + "\n");

  titleText.text(items.children[counter].data.title);
  //main.subtitle("");
  upvoteText.text(items.children[counter].data.score + " upvotes");
  subredditText.text(localStorage.getItem('subreddit' + String(subredditcounter)));
  //headerText.text(items.children[counter].data.domain);
  //main.body(items.children[counter].data.title);
}

// Monitor button clicks and call appropriate function
main.on('click', function(e) {
  switch (e.button) {
    case 'up':
      console.log("\nshort up click\n");
      scroll_list('up');
      break;
    case 'down':
      console.log("\nshort down click \n");
      scroll_list('down');
      break;

      // Link (page and comments) opening
    case 'select':
      if (counter > 0)
        Pebble.openURL("http://reddit.com/" + items.children[counter ].data.permalink + ".compact");
      break;

    default:
      if (debug == 1) console.log('lolwut');
      break;
  }
});

main.on('longClick', 'down', function(e) {
  console.log("DOWN CLICK");
  scroll_subreddit('down');

});

main.on('longClick', 'up', function(e) {
  console.log("UP CLICK");
  scroll_subreddit('up');
});

function scroll_subreddit(way) {
  var scroll = false;
  //console.log("\n" + localStorage.getItem('subreddit'+String(subredditcounter+1))!==null + "\n");
  if (way === 'down' && subredditcounter < 5 && localStorage.getItem('subreddit' + String(subredditcounter + 1)) !== null) {
    subredditcounter = subredditcounter + 1;
    scroll = true;

  }
  else if(way === 'down'&& subredditcounter === 5)
  {
    subredditcounter = 5;
    scroll = true;
  } 
  else if (way === 'up' && subredditcounter > 1 && localStorage.getItem('subreddit' + String(subredditcounter - 1)) !== null) {
    subredditcounter = subredditcounter - 1;
    scroll = true;
  }
  else if (way === 'up' && subredditcounter === 1)
  {
    for(var a = 5; a < 0; a--)
    {
      if(localStorage.getItem('subreddit'+String(a)) !==null)
      {
        subredditcounter = a;
        break;
      }
    }
    scroll = true;
  }
  console.log("\n" + subredditcounter + "\n");
  console.log("\n" + localStorage.getItem('subreddit' + String(subredditcounter)) + "\n");


  if (scroll === true) {
    URL = "http://reddit.com/r/" + localStorage.getItem('subreddit' + String(subredditcounter)) + "/" + localStorage.getItem('sortby' + String(subredditcounter)) + "/.json";
    Ajax({
        url: URL,
        type: 'json'
      },
      function(resp) {
        console.log(URL);
        items = resp.data;
        console.log("\n ajax finished \n");
      });
    counter = 0;
    upvoteText.text(items.children[counter].data.score + " upvotes");
    subredditText.text(localStorage.getItem('subreddit' + String(subredditcounter)));
    titleText.text(items.childern[counter].data.title);
  }
}

main.on('accelTap', function(e) {
  /* if (pass > 0) {
    pass--;
    return;
  } */
  scroll_list(e.direction > 0 ? 'up' : 'down');
  // pass += 1;
});