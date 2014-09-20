/**
 * Readit v0
 */

var UI = require('ui');
var Vector2 = require('vector2');

var main = new UI.Card({
  title: '',
  subtitle: 'READIT',
  body: 'Press any button.'
});

main.show();

main.on('click', 'up', function(e) {
  var menu = new UI.Menu({
    sections: [{
      items: [{
        title: 'Pebble.js',
        icon: 'images/menu_icon.png',
        subtitle: 'Can do Menus'
      }, {
        title: 'Second Item',
        subtitle: 'sub'
      }]
    }]
  });
  menu.on('select', function(e) {
    console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    console.log('The item is titled "' + e.item.title + '"');
  });
  menu.show();
});

main.on('click', 'select', function(e) {
  var wind = new UI.Window();
  var textfield = new UI.Text({
    position: new Vector2(0, 50),
    size: new Vector2(144, 30),
    font: 'gothic-24-bold',
    text: '',
    textAlign: 'center'
  });
  wind.add(textfield);
  wind.show();
});

main.on('click', 'down', function(e) {
  var card = new UI.Card();
  
  /** Grab the data from r/worldnews, load it from the smartphone and push it to the watch **/
  
  var req = new XMLHttpRequest();
  req.open('GET', 'http://www.reddit.com/r/worldnews/top/.json', true);
  var title = JSON.parse(req.title);
  var score = JSON.parse(req.score);
  
  card.title('title[0]');
  /** Test static screen **/
  /**
  card.title('6969 upvotes');
  card.subtitle('nyt.com');
  card.body('The Islamic State is upset with the French government\'s new name for them.');
  card.show();**/
});
