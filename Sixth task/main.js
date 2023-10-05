const grid = document.getElementById("grid");
let test = false;

let flagsCount;
let numberOfMines = 15;

let minesLocations = [];

function generateGrid() {
    // Can be adjusted to get a parameter of cols and rows

    grid.innerHTML = "";
    flagsCount = 0; 

    for (let i = 0; i < 10; i++) {
        const row = grid.insertRow(i);

        for (let j = 0; j < 10; j++) {
            const cell = row.insertCell(j);
            cell.onclick = function() { clickCell(this) };
            cell.oncontextmenu = function(e) {e.preventDefault(); toggleFlag(this)};
            const mine = document.createAttribute("mine");
            const flag = document.createAttribute("flag");
            mine.value = "false";
            flag.value = "false";
            cell.setAttributeNode(mine);
            cell.setAttributeNode(flag);
        }

    }
    addMines();
    // revealMines(); for test purposes
    // revealMines();
}

function addMines() {
    // Can be adjusted to get a parameter of number of bombs based on difficulty -- FOR FUTURE WORK --
    for (let i = 0; i < numberOfMines; i++) {
        const row = Math.floor(Math.random() * 10);
        const column = Math.floor(Math.random() * 10);
        const cell = grid.rows[row].cells[column];
        if (cell.getAttribute("mine") == "false") {
            cell.setAttribute("mine", "true");
        } else {
            i--;
            continue;
        }

        minesLocations.push({row: row , column : column});
    }
}

function clickCell(cell) {
    //CHeck if the user clicked on a mine

    if (cell.getAttribute("mine") == "true") {
        revealMines();
        alert("Game Over");
        stopGame();
    } else {
        cell.className = "clicked";
    
        // count nearby mines
        const minesCount = countNearbyMines(cell);

        const cellRow = cell.parentNode.rowIndex;
        const cellCol = cell.cellIndex;
        minesCount == 0 ? revealAdjacentCells(cellRow, cellCol) : (cell.innerHTML = minesCount);
    }
}

function revealAdjacentCells(cellRow, cellCol) {
    for (let i = Math.max(cellRow - 1, 0); i <= Math.min(cellRow + 1, 9); i++) {
        for (let j = Math.max(cellCol - 1, 0); j <= Math.min(cellCol + 1, 9); j++) {
            const adjacentCell = grid.rows[i].cells[j];
            if (adjacentCell.innerHTML == "" && !adjacentCell.classList.contains("clicked")) {
                clickCell(adjacentCell);
            }
        }
    }
}


function checkCompletion() {
    let flaggedMines = 0;
    let k = 1;

    for (let i = 0; i < minesLocations.length; i++) {
        const mineLocation = minesLocations[i];
        const cell = grid.rows[mineLocation.row].cells[mineLocation.column];

        if (cell.getAttribute("mine") == "true" && cell.innerHTML == "🚩") {
            flaggedMines++;
            console.log(k++);
        }
        
    }

    if (flaggedMines == minesLocations.length && flaggedMines == flagsCount) {
        alert("Congratulations You've Won!")
        stopGame();
    }
}


function countNearbyMines(cell) {
    let minesCount = 0;
    const cellRow = cell.parentNode.rowIndex;
    const cellCol = cell.cellIndex;

    for (let i = Math.max(cellRow - 1, 0); i <= Math.min(cellRow + 1, 9); i++) {
        for (let j = Math.max(cellCol - 1, 0); j <= Math.min(cellCol + 1, 9); j++) {
            if (grid.rows[i].cells[j].getAttribute("mine") == "true") {
                minesCount++;
            }
        }
    }
    return minesCount;
}

function revealMines() {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            var cell = grid.rows[i].cells[j];

            if (cell.getAttribute("mine") == "true") {
                cell.className = "mine";
            }
        }
    }
}

function toggleFlag(cell) {
    let k = 1;
    if (cell.getAttribute("flag") == "true") {
        cell.setAttribute("flag", "false");
        cell.innerHTML = "";
        flagsCount--;
    } else if ((cell.getAttribute("flag") == "false") && !cell.classList.contains("clicked")){
        cell.setAttribute("flag", "true");
        cell.innerHTML = "🚩";
        flagsCount++;
        console.log(k++);
    }
    checkCompletion();
}

function stopGame() {
    const row = grid.parentNode.rowIndex;
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const cell = grid.rows[i].cells[j];
            cell.onclick = null;
            cell.oncontextmenu = null;
        }
    }
    minesLocations = [];
    
}

generateGrid();

