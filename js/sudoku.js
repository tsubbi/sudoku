const defaultBoard = [
    [2, 8, 6, 7, 5, 4, 9, 3, 1],
    [9, 3, 1, 2, 8, 6, 7, 5, 4],
    [7, 5, 4, 9, 1, 3, 8, 6, 2],
    [8, 9, 2, 6, 7, 5, 4, 1, 3],
    [6, 7, 5, 4, 3, 1, 2, 9, 8],
    [4, 1, 3, 8, 9, 2, 6, 7, 5],
    [5, 6, 9, 3, 4, 8, 1, 2, 7],
    [3, 4, 7, 1, 2, 9, 5, 8, 6],
    [1, 2, 8, 5, 6, 7, 3, 4, 9]
];
let blankCount = 0;
let oldCell = null;
let newCell;

function sudokuEngine() {

}

$(document).ready(function() {
    let i = 0;
    let puzzelBoard = createPuzzel(defaultBoard);
    $("#sudoku").children().each(function() {
        let location = findLocation($(this));
        // setting the border
        if (location.y%3 === 0 && i%9>0) {
            $(this).css("border-left-width", 5);
        }
        if (location.x%3 === 0 && i > 10) {
            $(this).css("border-top-width", 5);
        }

        // display the puzzel
        if (puzzelBoard[location.x][location.y] !== 0) {
            $(this).html(puzzelBoard[location.x][location.y]);
            $(this).attr("data-original", true);
            $(this).css("font-weight", "bold");
            $(this).css("color", "seagreen");
        }

        i++;
        $(this).click(inputAnswer);
    });
});

// sudoku functions
// TODO: move into sudoku engine
function validateAnswer(cell) {
    const location = findLocation(cell);
    // since getting html text is string so need to convert into int
    const answer = parseInt(cell.html());
    return (answer === defaultBoard[location.x][location.y]);
}

// TODO: move into sudoku engine
function createPuzzel(sudokuBoard) {
    let min = 5;
    let max = min+2;
    // need to create new array because paramater is only a reference that will point to the memory which will affect the original variable.
    // there are 10 ways for cloning the array but mostly are shallow clone and the sudoku board need a deep clone
    // https://www.freecodecamp.org/news/how-to-clone-an-array-in-javascript-1d3183468f6a/
    const newBoard = [];

    sudokuBoard.forEach(row => {
        // create a randomized array from 0 to the row length
        let replaceArr = shuffle(row.length);
        // create random number of blank spots for the puzzel
        let randomBlankLength = Math.floor(Math.random() * (max-min+1)+min);
        // loop through the randomized amount 
        let newRow = [...row];
        for (i = 0; i < randomBlankLength; i++) {
            // take out the element from ramdoned array as the index for the elemnt of board to be 0
            newRow[replaceArr[i]] = 0;
            blankCount++;
        }
        newBoard.push(newRow);
    });
    return newBoard;
}

// utility
// TODO: move to util
function shuffle(upperLimit) {
    // generate an array list from 0 to n
    let listedArray =[...Array(upperLimit).keys()];
    let arr = [];
    for (var i = 0;i < upperLimit; i++) {
        // create a random index
        let randomIndex = Math.floor(Math.random() * listedArray.length);
        // push the item from first array to second array at random index
        arr.push(listedArray[randomIndex]);
        // remove the item from first array
        listedArray.splice(randomIndex, 1);
    }
    // return the randomized array
    return arr;
}

// TODO: move to util
function findLocation(cell) {
    let x = parseInt(cell.attr("value").substring(0, 1));
    let y = parseInt(cell.attr("value").substring(1));

    return {
            x: x, 
            y: y
            }
}

// user click function
function inputAnswer() {
    newCell = $(this);

    if (newCell.attr("data-original") === "true") {
        if (oldCell != null) {
            // remove last cell to white 
            oldCell.css("background", "white");
        }
        return false;
    }
    if (oldCell != null) {
        // remove last cell to white 
        oldCell.css("background", "white");
    }

    $(this).css("background", "#c7fff7");
    oldCell = $(this);

    $(window).keydown(event => {
        // if cell's attribute turns to ture, will return and does nothing
        if (newCell.attr("data-original") === "true") return;

        // if the cell needs to 
        const statementCase = newCell.attr("data-original") === "false";

        switch (statementCase) {
            // key is 1-9
            case (event.which >= 49 && event.which <=57): 
                const answer = String.fromCharCode(event.which);
                newCell.html(answer);
                if (validateAnswer(newCell)) {
                    newCell.attr("data-original", true);
                    newCell.css("background", "white");
                    blankCount--;
                } else {
                    newCell.css("background", "tomato");
                }
                if (blankCount === 0) {
                    alert("congrats! You solved the puzzel");
                }
                break;
            // key is backspace
            case (event.which === 8):
                newCell.html("");
                break;
            // other keys will not do anything
            default:
                break;
        }
    });
}