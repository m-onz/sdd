
var fs = require('fs')
var osc = require('osc')
// var LABEL = 'positive_'
var LABEL = 'negative_'
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
	if (!msg.length || !Array.isArray(msg)) return;
	console.log(msg)
	fs.appendFileSync('./'+LABEL+'data.csv', msg.join(',')+'\n')
});
udpPort.open();
