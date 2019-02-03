
var fs = require('fs')
var osc = require('osc')
var LABEL = 1

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

var batch = {
  label: LABEL,
  data: []
}
setInterval(function () {
  if (!batch.data.length) return
  var merged = []
  batch.data.forEach(function (a) {
    a.forEach(function (b) {
      merged.push(b)
    })
  })
  fs.writeFileSync('./batch/'+LABEL+'-'+Date.now()+'.json', JSON.stringify(merged))
}, 1000)

udpPort.on("message", function (oscMsg) {
  var msg = oscMsg.args[0].value
	.split(',')
	.slice(3)
	.map(function (i) { return clamp(Math.abs(parseFloat(i) * 0.9)); })
	if (!msg.length || !Array.isArray(msg)) return;
	console.log(msg)
  if (msg.length > 1) batch.data.push(msg) // msg needs correct length
});
udpPort.open();
