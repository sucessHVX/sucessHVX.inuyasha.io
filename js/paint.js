const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d"); //2d로 픽셀을 컨트롤하기위해 getContext쓴다
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");
const repaint = document.getElementById("jsRepaint");
const BASIC_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE; //캔버스 width와 height를 줘야 실행됨
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = BASIC_COLOR; //그릴 선들이 모두 이 색을 가짐
ctx.fillStyle = BASIC_COLOR;
ctx.lineWidth = 2.5; //선 굵기


let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y); //moveTo에서 lineTo까지 연결
    ctx.stroke(); //그릴때 선을 그어줌
  }
}

function onMouseUp(event) {
  painting = false;
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "채우기";
  } else {
    filling = true;
    mode.innerText = "그리기";
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleCM(event) {
  event.preventDefault();
}

function handleSaveClick() {
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image;
  link.download = "그림";
  link.click();    //이게 있어야 다운로드됨
}

function handleRepaintClick() {
    location.reload();
}

//if로 변수 있는지 체크
if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);

}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (repaint) {
  repaint.addEventListener("click", handleRepaintClick);
}

if (save) {
  save.addEventListener("click", handleSaveClick);
}