
var fs = require('fs')
var brain = require('brain.js')

var negative = fs.readFileSync('../data/negative_data.csv').toString()
var postitive = fs.readFileSync('../data/positive_data.csv').toString()

var dataset = []
var predictions = []

negative.split('\n').forEach(function (line) {
  line = line.split(',').map(function (i) {
    return parseFloat(i)
  })
  dataset.push(line.slice(0, 15))
  predictions.push(0)
})

postitive.split('\n').forEach(function (line) {
  line = line.split(',').map(function (i) {
    return parseFloat(i)
  })
  dataset.push(line.slice(0, 15))
  predictions.push(1)
})

var config = {
    binaryThresh: 0.1,
    hiddenLayers: [11],
    activation: 'tanh'
};

var net = new brain.NeuralNetwork(config);
var d = []
dataset.forEach(function (i, index) {
  var x = { input: i, output: [ predictions[index] ] }
  if (index < 1) console.log(x)
  d.push(x)
})
// console.log(d)
net.train(d)

// save model
fs.writeFileSync('./model-nn.json', JSON.stringify(net.toJSON()))
