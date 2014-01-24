var KeyboardEvents = function () {
    var emitter, pressedKeys = {}, listeners = {};

    window.onkeydown = function (event) {
        var keyCode = event.keyCode;
        if (!pressedKeys[keyCode]) {
            pressedKeys[keyCode] = true;
            if (listeners[keyCode]) {
                listeners[keyCode].forEach(function (listener) {
                    listener.callback({
                        type: 'keydown'
                    });
                });
            }
        }
    };
    window.onkeyup = function () {
        var keyCode = event.keyCode;
        if (pressedKeys[keyCode]) {
            pressedKeys[keyCode] = false;
            if (listeners[keyCode]) {
                listeners[keyCode].forEach(function (listener) {
                    listener.callback({
                        type: 'keyup'
                    });
                });
            }
        }
    };

    // Clock for keys that are hold pressed
    var clock = {
        last: (new Date()).getTime(),
        current: null,
        period: 30
    };
    setInterval(function () {
        // Check actual delay
        clock.current = (new Date()).getTime();
        var delta = clock.current - clock.last;
        clock.last = clock.current;

        for (var keyCode in pressedKeys) {
            var key = pressedKeys[keyCode];
            if (key && listeners[keyCode]) {
                listeners[keyCode].forEach(function (listener) {
                    listener.callback({
                        type: 'keyhold',
                        delta: delta
                    });
                });
            }
        }

    }, clock.period);

    var properties = {
        'on': {
            value: function (keyName, keyCode, callback) {
                if (!(listeners[keyCode] instanceof Array)) {
                    listeners[keyCode] = [];
                }
                listeners[keyCode].push({
                    name: keyName,
                    code: keyCode,
                    callback: callback
                });
            }
        }
    }

    emitter = Object.create({}, properties);

    return emitter;
}
