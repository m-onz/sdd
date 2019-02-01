
var fs = require('fs')
var KNN = require('ml-knn')
var data = fs.readFileSync('./data.csv').toString()

// no training required with kNN, just load csv and write out the model!

var dataset = []
var predictions = []

data.split('\n').forEach(function (i) {
  console.log(i)
  // parse line
  // add to dataset and predictions
})

var knn = new KNN(dataset, predictions)

var model = knn.toJSON()

// save model
fs.writeFileSync('./model.json', JSON.stringify(model))
