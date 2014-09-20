simply.vibe('short');

var URL = "http://reddit.com/r/worldnews/top/.json";
var counter = 0; // parseInt(localStorage.getItem('counter')) || 0; // If the variable counter exists, pull it from the "localStorage" else initialize to zero.
var items;
  ajax({ url: URL, type: 'json' }, function(resp) {
    items = resp;
  });

simply.on('singleClick', function(e) {
  simply.text({title: items.data.children[counter].data.score + " upvotes", subtitle: items.data.children[counter].data.domain, body: items.data.children[counter].data.title});
  console.log("Counter: " + counter + "\n");
  
  if(e.button === 'down' && counter < 24)
     ++counter;
  else if(e.button === 'down' && counter === 24)
    counter = 0;
  else if(e.button === 'up' && counter > 0)
    --counter;
  else if(e.button === 'up' && counter === 0)
    counter = 24;
  
  localStorage.setItem('counter', counter);
});
/**
simply.on('longClick', function(e) {
  console.log(util2.format('long clicked $button!', e));
  simply.vibe();
  simply.scrollable(e.button !== 'select');
});

simply.on('accelTap', function(e) {
  console.log(util2.format('tapped accel axis $axis $direction!', e));
  simply.subtitle('Tapped ' + (e.direction > 0 ? '+' : '-') + e.axis + '!');
});
**/

simply.setText({
  title: 'Readit',
  body: 'Daily provider of non-sense since 1852',
}, true);

