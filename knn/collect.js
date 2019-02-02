
var fs = require('fs')
var osc = require('osc')
var KNN = require('ml-knn')

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

var LABEL = 1

var udpPort = new osc.UDPPort({
    localAddress: "0.0.0.0",
    localPort: 57111,
    metadata: true
});

// var batch = []
var dataset = []
var predictions = []
// var dataset = JSON.parse(fs.readFileSync('./model-segment.json').toString())
// var predictions = JSON.parse(fs.readFileSync('./model-labels.json').toString())
// var si = setInterval(function () {
//   if (batch.length === 0) return;
//   var result = []
//   batch.forEach(function (b) {
//     b.forEach(function (i, index) {
//       result.push(i)
//     })
//   })
//   console.log(result.length)
//   dataset.push(result)
//   predictions.push(LABEL)
//   batch = [];
// }, 2000);

console.log('recording')

setTimeout(function () {
  console.log('stopped recording')
  clearInterval(si)
  fs.writeFileSync('./model-segment.json', JSON.stringify(dataset))
  fs.writeFileSync('./model-labels.json', JSON.stringify(predictions))
}, 33000)

udpPort.on("message", function (oscMsg) {
  var msg = oscMsg.args[0].value
	.split(',')
	.slice(3)
	.map(function (i) { return clamp(Math.abs(parseFloat(i) * 0.9)); })
	console.log(msg)
  dataset.push(msg)
  predictions.push(LABEL)
});

udpPort.open();
