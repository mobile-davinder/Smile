'use strict';

var https = require('https');
var fs = require('fs');

function toUnicode(str) {
	return str.split('').map(function (value, index, array) {
		var temp = value.charCodeAt(0).toString(16).toUpperCase();
		if (temp.length > 2) {
			return '\\u' + temp;
		}
		return value;
	}).join('');
}


function download(url, callback) {
	https.get(url, function(res) {
		var data = "";
		res.on('data', function (chunk) {
		  data += chunk;
		});

		res.on("end", function() {
		  callback(data);
		});

	}).on("error", function() {
	  	callback(null);
	});
}
var categories = {};

download('https://raw.githubusercontent.com/serebrov/emoji-mart-vue/master/data/apple.json', function(data) {
  console.log('data', data)
  parse(data);
  parse_categories();
});

function parse(data) {
  const json = JSON.parse(data);
  
  var string = 'public let emojiList: [String: String] = [\n'

  Object.keys(json.emojis).map(key => {
    var result = json.emojis[key].b.toString().split("-").map(function (x) { 
      return parseInt(x, 16); 
    })
    console.log('result', result)
    const itemString = '  "' + key + '": "' + String.fromCodePoint(...result) + '",\n'
    console.log('string', itemString)
    string = string + itemString
  })

  json.categories.map(category => {
    const { name, emojis } = category
    categories[name] = []
    emojis.map(emoji => {
      var result = json.emojis[emoji].b.toString().split("-").map(function (x) { 
        return parseInt(x, 16); 
      })
  
      categories[name].push(String.fromCodePoint(...result))
    })
  })
  // json.forEach(function(item){    
  //   if (typeof item.aliases === "undefined"
  //   || typeof item.emoji === "undefined"
  //   || item.emoji == "undefined") {
  //     return;
  //   }
    
  //   const itemString = '  "' + item.aliases[0] + '": "' + item.emoji + '",\n'
  //   string = string + itemString
    
  //   if (!categories[item.category]) {
  //     categories[item.category] = []
  //   } 
  //   categories[item.category].push(item.emoji);
  // })
  
  string = string + ']'

  fs.writeFileSync('../Sources/Emoji.swift', string);
};


function parse_categories() {
  var string = 'public let emojiCategories: [String: [String]] = [\n'  
  Object.keys(categories).forEach(function(category) {    
    const emojis = categories[category].map(function(emoji) {
			return '"' + emoji + '"';
		}).join(",");

    const itemString = '  "' + category + '": [' + emojis + '],\n'
    string = string + itemString
  });
  
  string = string + ']'

	fs.writeFileSync('../Sources/Categories.swift', string);
};
