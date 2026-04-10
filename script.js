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
// Códigos binarios
const INSIDE = 0; // 0000
const LEFT = 1;   // 0001
const RIGHT = 2;  // 0010
const BOTTOM = 4; // 0100
const TOP = 8;    // 1000

function calcularCodigo(x, y, xmin, ymin, xmax, ymax) {

    let codigo = INSIDE;

    if (x < xmin) codigo |= LEFT;
    else if (x > xmax) codigo |= RIGHT;

    if (y < ymin) codigo |= TOP;
    else if (y > ymax) codigo |= BOTTOM;

    return codigo;
}