// create canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// change the color of the brush
let colorBrush;
document.getElementById("color_brush").addEventListener("change", (e) => {
    colorBrush = e.target.value;
});

// change the background color
let backgroundColor;
document.getElementById("color_bg").addEventListener("change", (e) => {
    backgroundColor = e.target.value;
    canvas.style.backgroundColor = backgroundColor;
});
// changing the thickness of the brush
let thickness;
document.getElementById("thickness").addEventListener("change", (e) => {
    thickness = e.target.value;
});

// paint includes line width and color
const drawingFn = function (moveEvent) {
    ctx.lineTo(moveEvent.offsetX, moveEvent.offsetY);
    ctx.lineWidth = thickness * 0.5;
    ctx.lineJoin = "round";
    ctx.strokeStyle = colorBrush;
    ctx.stroke();
};

// find mouse coordinates relative to canvas
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

// add the ability to erase the drawn, button 'Eraser'
let eraser = document.getElementById("eraser");

eraser.addEventListener("click", () => {
    colorBrush = backgroundColor;
    ctx.strokeStyle = colorBrush;
});

// add the undo option a few steps back, button 'Undo'

let PushArray = new Array();

canvas.addEventListener("mouseup", (e) => {
    function pushArr() {
        PushArray.push(document.getElementById("canvas").toDataURL());
    }
    pushArr();
    canvas.removeEventListener("mousemove", drawingFn);
});

let undo = document.getElementById("undo");

undo.addEventListener("click", () => {
    ctx.clearRect(0, 0, 10000, 10000);
    PushArray.pop();
    let last = PushArray.length - 1;
    var canvasImg = new Image();
    canvasImg.src = PushArray[last];
    canvasImg.onload = function () {
        ctx.drawImage(canvasImg, 0, 0);
    };
});

// clear the canvas by clicking on the button 'Clear'
let clear = document.getElementById("clear");

clear.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// save the image by clicking on the button 'Download'
let saveImage = document.getElementById("download");
saveImage.addEventListener("click", () => {
    let downloadLink = document.createElement("a");
    downloadLink.setAttribute("download", "CanvasAsImage.png");
    let dataURL = canvas.toDataURL("image/png");
    let url = dataURL.replace(/^data:image\/png/, "data:application/");
    downloadLink.setAttribute("href", url);
    downloadLink.click();
});
