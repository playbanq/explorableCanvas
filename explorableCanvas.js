/** Creates a tile-based grid and extends a canvas element with the related methods
 * @param {object} canvas - The canvas element object obtained from document.getElementById
 * @param {number} tileSize - The size of the tiles of the grid
 * @returns {object} - An object containing the methods used to extend the initial canvas object
 */
var ExplorableCanvas = Object.create({}, {
    'extend': {
        value: explorableCanvas
    }
});

function explorableCanvas(canvas) {
    if (canvas.nodeName !== 'CANVAS') {
        console.log('ERROR: The element provided is not a canvas element.');
        return;
    }

    var width = (typeof width === 'number') ? width : 300,
        height = (typeof height === 'number') ? height : 150,
        theMap,
        speed = {
            x: 0.1,
            y: 0.1
        };

    var properties = {
        setSpeed: {
            value: function (newSpeed) {
                if (typeof newSpeed === 'object') {
                    speed.x = newSpeed.x || speed.x;
                    speed.y = newSpeed.y || speed.y;
                }
            }
        },
        setSize: {
            writable: true,
            value: function (newWidth, newHeight) {
                canvas.width = newWidth || window.innerWidth;
                canvas.height = newHeight || window.innerHeight;
            }
        }
    };
    
    if (typeof KeyboardEvents === 'object') {
        var keyboard = new KeyboardEvents.emitter();
        keyboard.on('left', 37, {
            'onkeyhold': function (delta) {
                var offset = Math.floor(canvas.grid.offset.left - speed.x * delta),
                    left = canvas.grid.left;
                canvas.grid.offset.left = (offset < left) ? left: offset;
            }
        });
        keyboard.on('right', 39, {
            'onkeyhold': function (delta) {
                var offset = Math.floor(canvas.grid.offset.left + speed.x * delta),
                    right = canvas.grid.right - canvas.width;
                canvas.grid.offset.left = (offset > right) ? right: offset;
            }
        });
        keyboard.on('up', 38, {
            'onkeyhold': function (delta) {
                var offset = Math.floor(canvas.grid.offset.top - speed.y * delta),
                    top = canvas.grid.top;
                canvas.grid.offset.top = (offset < top) ? top: offset;
            }
        });
        keyboard.on('down', 40, {
            'onkeyhold': function (delta) {
                var offset = Math.floor(canvas.grid.offset.top + speed.y * delta),
                    bottom = canvas.grid.bottom - canvas.height;
                canvas.grid.offset.top = (offset > bottom) ? bottom: offset;
            }
        });
    }

    Object.defineProperties(canvas, properties);
    
    return Object.create({}, properties);
};