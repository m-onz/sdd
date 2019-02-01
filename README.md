
# sdd

## Version 1 - audio classification with bag of normalized features + kNN

using ml-knn

bag of features:
  MFCC (mel)
  FFT Crest...
  etc

real time classification using kNN

## Version 2 - audio classification with bag of normalized features + ANN

using brain.js

```

run classify with label A

collect.js

run classify.scd with label B

collect.js (change label id to B)

==> ./data.csv

run train.js (takes ./data.csv and creates ./model.json)

==> ./model.json

run classify.scd with test audio or mic

run predict.js ==> test accuracy somehow!

```
