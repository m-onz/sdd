
var osc = require('osc')
var fs = require('fs')
var brain = require('brain.js')

var net = new brain.NeuralNetwork()

var model = JSON.parse(fs.readFileSync('./model-nn.json').toString())

net.fromJSON(model)

var udpPort = new osc.UDPPort({
    localAddress: "0.0.0.0",
    localPort: 57111,
    metadata: true
});

function clamp (num) {
	if (typeof num !== 'number' || Number.isNaN(num)) return 0
		else if (num < 0) {
      return 0
    } else if (num > 1) {
      return 1
    } else {
      return num;
  }
}

udpPort.on("message", function (oscMsg) {
    var msg = oscMsg.args[0].value
    .split(',')
    .slice(3)
    .map(function (i) { return clamp(Math.abs(parseFloat(i) * 0.9)); })
    var ans = net.run(msg.slice(15))
    console.log(ans)
});

udpPort.open()
