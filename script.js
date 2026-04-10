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
function cohenSutherland(x0, y0, x1, y1, xmin, ymin, xmax, ymax, ctx) {

    let codigo0 = calcularCodigo(x0, y0, xmin, ymin, xmax, ymax);
    let codigo1 = calcularCodigo(x1, y1, xmin, ymin, xmax, ymax);

    let aceptar = false;

    while (true) {

        // :) ACEPTACIÓN TRIVIAL
        if ((codigo0 | codigo1) === 0) {
            // Ambos están dentro
            aceptar = true;
            break;
        }

        // :c RECHAZO TRIVIAL
        else if ((codigo0 & codigo1) !== 0) {
            // Ambos están fuera en la MISMA zona
            //  EJEMPLO: los dos arriba, o los dos a la izquierda
            break;
        }

        // 🔄 CASO INTERMEDIO (recorte)
        else {

            let codigoFuera = codigo0 !== 0 ? codigo0 : codigo1;

            let x, y;

            // Intersecciones
            if (codigoFuera & TOP) {
                x = x0 + (x1 - x0) * (ymin - y0) / (y1 - y0);
                y = ymin;
            }
            else if (codigoFuera & BOTTOM) {
                x = x0 + (x1 - x0) * (ymax - y0) / (y1 - y0);
                y = ymax;
            }
            else if (codigoFuera & RIGHT) {
                y = y0 + (y1 - y0) * (xmax - x0) / (x1 - x0);
                x = xmax;
            }
            else if (codigoFuera & LEFT) {
                y = y0 + (y1 - y0) * (xmin - x0) / (x1 - x0);
                x = xmin;
            }

            // Reemplazar punto fuera
            if (codigoFuera === codigo0) {
                x0 = x;
                y0 = y;
                codigo0 = calcularCodigo(x0, y0, xmin, ymin, xmax, ymax);
            } else {
                x1 = x;
                y1 = y;
                codigo1 = calcularCodigo(x1, y1, xmin, ymin, xmax, ymax);
            }
        }
    }

    // Dibujar si se acepta
    if (aceptar) {
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.strokeStyle = "red";
        ctx.stroke();
    }
}