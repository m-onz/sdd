
var fs = require('fs')
var osc = require('osc')
var KNN = require('ml-knn')

var LABEL = 0

var udpPort = new osc.UDPPort({
    localAddress: "0.0.0.0",
    localPort: 57111,
    metadata: true
});

var dataset = []
var predictions = []

udpPort.on("message", function (oscMsg) {
  var msg = oscMsg.args[0].value
	.split(',')
	.slice(3)
	.map(function (i) { return parseFloat(i); })
  fs.appendFile('./data.csv', LABEL+','+msg.join(',')+'\n')
});

udpPort.open();
