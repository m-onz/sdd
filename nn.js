
var brain = require('brain.js')

var config = {
    binaryThresh: 0.5,
    hiddenLayers: [11],
    activation: 'leaky-relu',
    leakyReluAlpha: 0.01
};

var net = new brain.NeuralNetwork(config);

net.train([{input: { r: 0, g: 0, b: 0 }, output: { black: 1 }},
           {input: { r: 0.6, g: 0.6, b: 0.6 }, output: { white: 1 }},
           {input: { r: 1, g: 1, b: 1 }, output: { white: 1 }}]);

var output = net.run({ r: 0, g: 0, b: 0 });  // { white: 0.99, black: 0.002 }

console.log(output)

console.log(net.toJSON())

//
var net2 = new brain.NeuralNetwork();

net2.fromJSON(net.toJSON())

console.log('2 ', net.run({ r: 0, g: 0, b: 0 }))
