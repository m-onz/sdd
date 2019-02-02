
var brain = require('brain.js')

var config = {
    binaryThresh: 0.5,
    hiddenLayers: [11],
    activation: 'leaky-relu',
    leakyReluAlpha: 0.01
};

var net = new brain.NeuralNetwork(config);

net.train([{input: [0, 0], output: [0]},
           {input: [0.3, 1.1], output: [1]},
           {input: [0.1, 0], output: [1]},
           {input: [0.1, 1], output: [0]}]);

const output = net.run([0, 0]);

console.log(output)

// console.log(net.toJSON())
//
// //
// var net2 = new brain.NeuralNetwork();
//
// net2.fromJSON(net.toJSON())
//
// console.log('2 ', net.run({ r: 0, g: 0, b: 0 }))
