function dibujar() {

    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // VIEWPORT (rectángulo visible)
    let xmin = 100, ymin = 100, xmax = 300, ymax = 250;

    // Dibujar viewport
    ctx.strokeRect(xmin, ymin, xmax - xmin, ymax - ymin);

    // Obtener puntos
    let x0 = parseInt(document.getElementById("x0").value);
    let y0 = parseInt(document.getElementById("y0").value);
    let x1 = parseInt(document.getElementById("x1").value);
    let y1 = parseInt(document.getElementById("y1").value);

    // Dibujar línea sin recorte (por ahora)
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();
}