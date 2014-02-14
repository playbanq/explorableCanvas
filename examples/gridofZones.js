var canvas = document.getElementById('explorableCanvas'),
    context = canvas.getContext('2d');

TiledCanvas.extend(canvas, 50);
    canvas.setSize(500, 500);
    canvas.grid.setSize(1000, 1000);
// The grid can be extended in all directions
    canvas.grid.top -= 50;
    canvas.grid.left -= 50;
    canvas.grid.bottom += 50;
    canvas.grid.right += 50;

ExplorableCanvas.extend(canvas);
    canvas.setSpeed({ x: 0.3, y: 0.3 });

setInterval(function () {
    context.clearRect(0, 0, canvas.width, canvas.height);
    canvas.grid.draw();
    for (var row = 0, rows = canvas.grid.rows; row < rows; row++) {
        for (var col = 0, columns = canvas.grid.columns; col < columns; col++) {
            if (row % 2 === 0 && col % 2 === 1 || row % 2 === 1 && col % 2 === 0) {
                canvas.grid.drawTile(row, col);
            }
        }
    }
}, 33);