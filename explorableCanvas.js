var ExplorableCanvas = function (id, width, height) {
    var canvas, canvasElement = document.getElementById(id);
    if (!canvasElement) {
        console.log('ERROR: The element with id "' + id + '" was not found in the DOM.');
        return
    } else if (canvasElement.nodeName !== 'CANVAS') {
        console.log('ERROR: The element with id ' + id + ' is not a canvas element.');
        return;
    }
    canvas = canvasElement;
    var context = canvas.getContext('2d');

    var width = (typeof width === 'number') ? width : 300,
        height = (typeof width === 'number') ? height : 150,
        offsetX = 0,
        offsetY = 0,
        theMap;

    canvasElement.width = width;
    canvasElement.height = height;

    var properties = {
        'setSize': {
            value: function (newWidth, newHeight) {
                width = newWidth;
                height = newHeight;
                canvasElement.width = newWidth;
                canvasElement.height = newHeight;
            }
        },
        'drawMap': {
            value: function (map) {
                var top = 0, left = 0, withinCanvas, shiftedX, shiftedY;
                context.font = '20px Sans';
                theMap = map;

                setInterval(function () {
                    context.clearRect(0, 0, canvasElement.width, canvasElement.height);
                    map.elements.forEach(function (element) {
                        shiftedX = element.x + offsetX;
                        shiftedY = element.y + offsetY;

                        withinCanvas = (shiftedX > 0 && shiftedX < canvasElement.width) &&
                                        (shiftedY > 0 && shiftedX < canvasElement.height);

                        if (withinCanvas) {
                            context.fillText(element.data, element.x + offsetX, element.y + offsetY);
                        }
                    });
                }, 33);
            }
        } 
    };

    var speed = 0.2;
    var keyboard = new KeyboardEvents.emitter();
    keyboard.on('left', 37, {
        'onkeyhold': function (delta) {
            offsetX += speed * delta;
            offsetX = (offsetX > theMap.left) ? theMap.left: offsetX;
        }
    });
    keyboard.on('right', 39, {
        'onkeyhold': function (delta) {
            offsetX -= speed * delta;
            offsetX = (offsetX < -theMap.right + width) ? -theMap.right + width : offsetX;
        }
    });
    keyboard.on('up', 38, {
        'onkeyhold': function (delta) {
            offsetY += speed * delta;
            offsetY = (offsetY > theMap.top) ? theMap.top: offsetY;
        }
    });
    keyboard.on('down', 40, { 
        'onkeyhold': function (delta) {
            offsetY -= speed * delta;
            offsetY = (offsetY < -theMap.bottom + height) ? -theMap.bottom + height : offsetY;
        }
    });

    canvas = Object.create({}, properties);

    return canvas;
};