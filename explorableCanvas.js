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
        canvasMap;

    var properties = {
        'setSize': {
            value: function (width, height) {
                canvasElement.width = width;
                canvasElement.height = height;
            }
        },
        'drawMap': {
            value: function (map) {
                var top = 0, left = 0, withinCanvas, shiftedX, shiftedY;
                context.font = '20px Sans';
                canvasMap = map;

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
    var keyboard = new KeyEventEmitter();
    keyboard.on('left', 37, function (event) {
        switch (event.type) {
        case 'keydown':
            // offsetX -= speed;
            break;
        case 'keyhold':
            offsetX -= speed * event.delta;
            break;
        default:
            break;
        }
    });
    keyboard.on('right', 39, function (event) {
        switch (event.type) {
        case 'keydown':
            // offsetX += speed;
            break;
        case 'keyhold':
            offsetX += speed * event.delta;
            break;
        default:
            break;
        }
    });
    keyboard.on('up', 38, function (event) {
        switch (event.type) {
        case 'keydown':
            // offsetY -= speed;
            break;
        case 'keyhold':
            offsetY -= speed * event.delta;
            break;
        default:
            break;
        }
    });
    keyboard.on('down', 40, function (event) {
        switch (event.type) {
        case 'keydown':
            // offsetY += speed;
            break;
        case 'keyhold':
            offsetY += speed * event.delta;
            break;
        default:
            break;
        }
    });

    canvas = Object.create({}, properties);

    return canvas;
};