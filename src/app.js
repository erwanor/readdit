console.log('Readit is launching....');
simply.vibe('short');


var URL = "http://reddit.com/r/worldnews/top/.json";
var counter = parseInt(localStorage.getItem('counter')) || counter; // If the variable counter exists, pull it from the "localStorage" else initialize to zero.


simply.on('singleClick', function(e) {
 if(e.button === 'up' && counter < 24){
 //   simply.subtitle(myscore + "upvotes");
     ++counter;
     ajax({ url: URL, type: 'json' }, function(data){ 
        simply.text({title: data.data.children[counter].data.score + "upvotes", subtitle: data.data.children[counter].data.domain, body: data.data.children[counter].data.title});
    });
 }
  else if(e.button === 'up' && counter === 24){
    counter = 0;
    ajax({ url: URL, type: 'json' }, function(data){ 
        simply.text({title: data.data.children[counter].data.score + "upvotes", subtitle: data.data.children[counter].data.domain, body: data.data.children[counter].data.title});
    });
  }
  else if(e.button === 'down' && counter > 0){
    --counter;
   // simply.subtitle('2');
    ajax({ url: URL, type: 'json' }, function(data){ 
        simply.text({title: data.data.children[counter].data.score + "upvotes", subtitle: data.data.children[counter].data.domain, body: data.data.children[counter].data.title});
    });
  }
  else if(e.button === 'down' && counter === 0){
    counter = 24;
 //   simply.subtitle('1');
    ajax({ url: URL, type: 'json' }, function(data){ 
        simply.text({title: data.data.children[counter].data.score  + " upvotes", subtitle: data.data.children[counter].data.domain, body: data.data.children[counter].data.title});
    });
  }
  
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

