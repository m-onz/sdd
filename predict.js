
var osc = require('osc')
var fs = require('fs')
var KNN = require('ml-knn')

var model = JSON.parse(fs.readFileSync('./model.json').toString())
var knn = KNN.load(model)

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
    var ans = parseInt(knn.predict(msg))
    switch {
      case 0:
       console.log('A!')
      break;
      case 1:
        console.log('b')
      break;
    }
    console.log()
});

udpPort.open()
