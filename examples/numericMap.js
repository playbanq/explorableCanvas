// Create numeric map
var numericMap = {
    tileSize: 20,
    zoneSize: 10,
    top: 0,
    left: 0,
    width: 0,
    height: 30,
    elements: []
};
numericMap.right = numericMap.left + numericMap.tileSize * numericMap.width;
numericMap.bottom = numericMap.top + numericMap.tileSize * numericMap.height;

var value, zoneSize = numericMap.zoneSize;
for (var i = 0; i < numericMap.height; i++) {
    for (var j = 0; j < numericMap.width; j++) {
        value = (i % zoneSize === 0 || j % zoneSize === 0) ? '' : Math.floor(Math.random() * 10);
        numericMap.elements.push({
            x: i * numericMap.tileSize,
            y: j * numericMap.tileSize,
            data: value
        });
    }
}

// Create canvas and start drawing
var canvas = new ExplorableCanvas('explorableCanvas', 500, 500);

canvas.drawMap(numericMap);