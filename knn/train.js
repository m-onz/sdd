
var fs = require('fs')
var KNN = require('ml-knn')

// no training required with kNN, just load csv and write out the model!

var dataset = JSON.parse(fs.readFileSync('./model-segment.json').toString())
var predictions = JSON.parse(fs.readFileSync('./model-labels.json').toString())

var knn = new KNN(dataset, predictions)

var model = knn.toJSON()

// save model
fs.writeFileSync('./model.json', JSON.stringify(model))
