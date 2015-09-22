var handlebars = require('handlebars');
var fs = require('fs');

function blob(file) {
  return fs.readFileSync(file).toString().split("\n\n");
}

function structure(file) {
  var raw = fs.readFileSync(file).toString().split(/^=+$/m).filter(function(check) { return check.length && check != "\n"; });
  var data = []

  raw.forEach(function(block) {
    var out = {}
    var bits = block.split(/^-+/m);
    bits[0].split("\n").filter(function(check) { return check.length && check != "\n"; }).forEach(function(line) {
      var res = line.split('=')
      out[res[0]] = res[1]
    })
    out.description = bits[1].split("\n\n")
    data.push(out);
  })
  return data;
}

//need to parse data
var data = {}

data.meta = require('./default/meta.json')
data.summary = blob('./default/summary')
data.expertise = blob('./default/expertise')
data.experience = structure('./default/experience')
data.projects = structure('./default/projects')


fs.readFile('cv.handlebars', 'utf-8', function(error, source){

  var template = handlebars.compile(source);
  var html = template(data);

  console.log(html)

})
