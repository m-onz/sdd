
var KNN = require('ml-knn')

var dataset = [
  [1, 0, 0, 1],
  [0, 1, 0, 0],
]
var predictions = [0, 1]
var knn = new KNN(dataset, predictions)

var dataset = [[0, 1, 0, 0]];

var ans = knn.predict(dataset);

console.log(ans)
//
// var model = knn.toJSON()
// // console.log(model)
// var knn2 = KNN.load(model)
//
// console.log(knn2)
