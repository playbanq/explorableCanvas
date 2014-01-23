var ExplorableCanvas = function (id, width, height) {
    var canvas, element = document.getElementById(id);
    if (!element) {
        console.log('ERROR: The element with id "' + id + '" was not found in the DOM.');
        return
    } else if (element.nodeName !== 'CANVAS') {
        console.log('ERROR: The element with id ' + id + ' is not a canvas element.');
        return;
    }

    var width = (typeof width === 'number') ? width : 300,
        height = (typeof width === 'number') ? height : 150;

    var properties = {
        'setSize': {
            value: function (width, height) {
                console.log(width, height);
                element.width = width;
                element.height = height;
            }
        }
    };

    canvas = Object.create({}, properties);

    return canvas;
}