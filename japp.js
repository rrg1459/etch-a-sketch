const container = document.querySelector(".container");
const btnResize = document.querySelector("#btn-resize");
const btnReset = document.querySelector("#btn-reset");
const inputColor = document.querySelector(".input-color");
const btnColorRandom = document.querySelector(".color_random");

let _side = 16;
let _size = 256;

btnResize.onclick = askUser;
btnReset.onclick = resetCanvas;
btnColorRandom.onclick = colorBlockRandom;
inputColor.onchange = colorBlockFixed;

function colorBlockFixed() {
	const blocks = document.querySelectorAll(".block");
	blocks.forEach((block) => {
		block.removeEventListener("mouseenter", colorBlockRandom);
		block.onmouseenter = () => block.style.background = inputColor.value;
	});
}

function colorBlockRandom() {
	const blocks = document.querySelectorAll(".block");
	blocks.forEach((block) => {
		const rand1 = Math.floor(Math.random() * 255);
		const rand2 = Math.floor(Math.random() * 255);
		const rand3 = Math.floor(Math.random() * 255);
		block.removeEventListener("mouseenter", colorBlockFixed);
		block.onmouseenter = () => block.style.background = `rgb(${rand1}, ${rand2}, ${rand3})`;
	});
}

function askUser() {
	let gridSideSize = prompt("Enter size");
	let ciclo = true;
	while (ciclo) {
		if (isNaN(gridSideSize)) {
			gridSideSize = prompt("Enter a number");
		} else if (gridSideSize < 1 || gridSideSize > 80) {
			gridSideSize = prompt("Enter a size between 1 and 80");
		} else {
			ciclo = false;
		}
	}
	let gridSize = gridSideSize ** 2;
	createNewGrid(gridSize, gridSideSize);
}

function resetCanvas() {
	const blocks = document.querySelectorAll(".block");
	blocks.forEach((block) => block.style.background = "#333333");
}

function removeGrid() {
	const existingGrid = document.querySelector(".grid");
	existingGrid.parentNode.removeChild(existingGrid);
}

function createNewGrid(size, side) {
	removeGrid();
	createGrid(size, side);
}

function createGrid(size, side) {
	resetCanvas();
	const grid = document.createElement("div");
	grid.classList.add("grid");
	container.appendChild(grid);
	grid.style.setProperty("--sideSize", side);
	for (let i = 0; i < size; i++) {
		const block = document.createElement("div");
		block.classList.add("block");
		grid.appendChild(block);
		block.addEventListener("mouseenter", colorBlockFixed);
	}
}

createGrid(_size, _side);