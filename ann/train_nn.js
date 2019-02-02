
var fs = require('fs')
var brain = require('brain.js')

var dataset = JSON.parse(fs.readFileSync('./model-segment.json').toString())
var predictions = JSON.parse(fs.readFileSync('./model-labels.json').toString())

var config = {
    binaryThresh: 0.1,
    hiddenLayers: [11],
    activation: 'tanh'
};

var net = new brain.NeuralNetwork(config);
var d = []
dataset.forEach(function (i, index) {
  var x = { input: i.slice(0, 11), output: [ predictions[index] ] }
  // console.log(x)
  if (index < 1) console.log(x)
  d.push(x)
})
// console.log(d)
net.train(d)

// save model
fs.writeFileSync('./model-nn.json', JSON.stringify(net.toJSON()))
