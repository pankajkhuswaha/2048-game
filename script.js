let board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];
let score = 0;
let cols = 4;
let rows = 4;

window.onload = () => {
    setGame();
};


const setGame = () => {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            let cell = document.createElement("div");
            cell.id = `${r.toString()}-${c.toString()}`;
            let num = board[r][c];
            updatecell(cell, num);
            document.getElementById("game-board").append(cell)
        }
    }
    setTwo();
    setTwo();
};

const hasEmptyCell = () => {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (board[r][c] === 0) {
                return true;
            }
        }
    }
};

const setTwo = () => {
    if (!hasEmptyCell()) {
        return
    } else {
        let found = false;
        while (!found) {
            let r = Math.floor(Math.random() * rows);
            let c = Math.floor(Math.random() * cols);
            if (board[r][c] === 0) {
                board[r][c] = 2;
                let cell = document.getElementById(`${r.toString()}-${c.toString()}`);
                cell.innerText = "2";
                cell.classList.add("x2");
                found = true;
            }
        }
    }

}

const updatecell = (cell, num) => {
    cell.innerText = "";
    cell.classList.value = "";
    cell.classList.add("cell");
    if (num > 0) {
        if (num <= 4096) {
            cell.innerText = num;
            cell.classList.add(`x${num.toString()}`);
        } else {
            cell.classList.add(`x${num.toString()}`);
        }
    }
};
document.addEventListener("keyup", (e) => {
    if (e.code === "ArrowLeft") {
        slideleft();
        setTwo();
    } else if (e.code === "ArrowRight") {
        slideRight();
        setTwo();
    } else if (e.code === "ArrowUp") {
        slideUp();
        setTwo();
    } else if (e.code === "ArrowDown") {
        slideDown();
        setTwo();
    }
    document.getElementById("score").innerText = score;
});

const filterZero = (row) => {
    return row.filter(num => num !== 0);
}
const slide = (row) => {
    row = filterZero(row);
    for (let i = 0; i < row.length; i++) {
        if (row[i] === row[i + 1]) {
            row[i] *= 2;
            row[i + 1] = 0;
            score += row[i];
        };
    }
    row = filterZero(row);

    while (row.length < cols) {
        row.push(0)
    }
    return row
};

const slideleft = () => {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row = slide(row);
        board[r] = row;
        for (let c = 0; c < cols; c++) {
            let cell = document.getElementById(`${r.toString()}-${c.toString()}`);
            let num = board[r][c];
            updatecell(cell, num)
        }
    }
}
const slideRight = () => {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row.reverse();
        row = slide(row);
        row.reverse();
        board[r] = row;
        for (let c = 0; c < cols; c++) {
            let cell = document.getElementById(`${r.toString()}-${c.toString()}`);
            let num = board[r][c];
            updatecell(cell, num)
        }
    }
}

const slideUp = () => {
    for (let c = 0; c < cols; c++) {

        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        for (let r = 0; r < rows; r++) {
            board[r][c] = row[r];
            let cell = document.getElementById(`${r.toString()}-${c.toString()}`);
            let num = board[r][c];
            updatecell(cell, num)
        }
    }
};

const slideDown = () => {
    for (let c = 0; c < cols; c++) {
        const element = cols[c];
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();
        for (let r = 0; r < rows; r++) {
            board[r][c] = row[r];
            let cell = document.getElementById(`${r.toString()}-${c.toString()}`);
            let num = board[r][c];
            updatecell(cell, num)
        }
    }
}