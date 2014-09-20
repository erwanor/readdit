/**
 * Readit v0
 */

var UI = require('ui');
var Vector2 = require('vector2');

var main = new UI.Card({
  title: 'Readit!',
  subtitle: 'factory of the awesome',
  body: '...'
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
        title: 'Snd',
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
    text: 'readit',
    textAlign: 'center'
  });
  wind.add(textfield);
  wind.show();
});

main.on('click', 'down', function(e){
  
  /** Grab the data from r/worldnews, load it from the smartphone and push it to the watch **/

  /**var req = new XMLHttpRequest();
  
  req.open('GET', 'http://www.reddit.com/r/worldnews/top/.json', true);
  
  var title = JSON.parse(req.title);
  var score = JSON.parse(req.score); 
  **/
  
  var card = new UI.Card();
  card.title('6969 upvotes');
  card.subtitle('guardian.com');
  card.body('US Airstrike kills 40 Islamic State fighters');
  card.show();
    
  /** 
  * on-click event up, iterate parsed array !
  *  """""""" same stuff here  **/ 
    
});
        