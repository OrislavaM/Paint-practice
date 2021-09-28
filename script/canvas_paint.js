const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

let thickness;
document.getElementById("thickness").addEventListener("change", (e) => {
    thickness = e.target.value;
});

const drawingFn = function (moveEvent) {
    console.dir(moveEvent);
    ctx.lineTo(moveEvent.offsetX, moveEvent.offsetY);
    ctx.lineWidth = thickness * 0.5;
    ctx.lineJoin = "round";
    ctx.stroke();
};
canvas.addEventListener("mousedown", (e) => {
    ctx.beginPath();
    let x = e.offsetX;
    let y = e.offsetY;
    ctx.moveTo(x, y);

    ctx.stroke();
    canvas.addEventListener("mousemove", drawingFn);
});

canvas.addEventListener("mouseup", (e) =>
    canvas.removeEventListener("mousemove", drawingFn)
);
