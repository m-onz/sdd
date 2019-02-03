
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

var batch = []

setInterval(function () {
  if (!batch.length) return
  var merged = []
  batch.forEach(function (a) {
    a.forEach(function (b) {
      merged.push(b)
    })
  })
  var ans = parseInt(knn.predict([merged]))
  console.log(ans)
  batch = []
}, 1000)

udpPort.on("message", function (oscMsg) {
    var msg = oscMsg.args[0].value
    .split(',')
  	.slice(3)
  	.map(function (i) { return clamp(Math.abs(parseFloat(i) * 0.9)); })
    batch.push(msg)
    // switch (ans) {
    //   case 0:
    //    console.log('A!')
    //   break;
    //   case 1:
    //     console.log('b')
    //   break;
    // }
    // console.log()
});

udpPort.open()








/*   msg[6] = round(clamp(msg[6] / 10000))
   msg[7] = round(clamp(msg[7] / 3000))
   msg[9] = round(clamp(msg[9] / 250))
   msg[11] = round(clamp(msg[11] / 3000))
   msg[12] = round(clamp(msg[12] / 6000))
   msg[14] = round(clamp(msg[14] / 8000))
  msg = msg.map(function (i) { return check(clamp(i)); })*/
//  if (parseInt(msg[msg.length-1]) === 1) onset_count ++;
