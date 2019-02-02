var osc = require('osc')

var udpPort = new osc.UDPPort({
    localAddress: "0.0.0.0",
    localPort: 57111,
    metadata: true
});

udpPort.on("message", function (oscMsg) {
    var msg = oscMsg.args[0].value
	.split(',')
	.slice(3)
	.map(function (i) { return parseFloat(i); })
    console.log(typeof msg, ' ', msg.length);
});

udpPort.open();
