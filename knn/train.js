
var fs = require('fs')
var KNN = require('ml-knn')

// no training required with kNN, just load csv and write out the model!

var dir = fs.readdirSync('./data/batch')
var dataset = []
var predictions = []

dir.forEach(function (i) {
  var p = './data/batch/' + i
  var label = parseInt(i.split('-')[0])
  var x = JSON.parse(fs.readFileSync(p).toString())
  dataset.push(x)
  predictions.push(label)
})

var knn = new KNN(dataset, predictions)

var model = knn.toJSON()

// save model
fs.writeFileSync('./model.json', JSON.stringify(model))
