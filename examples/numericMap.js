var canvas = new ExplorableCanvas('explorableCanvas');
canvas.setSize(500, 500);

var numericMap = {
    width: 100,
    height: 100,
    values: []
};

for (var i = 0; i < numericMap.width; i++) {
    numericMap.values[i] = [];
    for (var j = 0; j < numericMap.width; j++) {
        numericMap.values[i][j] = Math.floor(Math.random() * 10);
    }
}

for (var i = 0; i < numericMap.width; i++) {
    var line = '';
    for (var j = 0; j < numericMap.width; j++) {
        line += numericMap.values[i][j];
    }
}