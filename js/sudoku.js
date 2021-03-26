let defaultBoard = [
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
let puzzelBoard = []
let oldCell = null;
let newCell;

function sudokuEngine() {

}

$(document).ready(function() {
    let i = 0;
    puzzelBoard = createPuzzel(defaultBoard);
    $("#sudoku").children().each(function() {
        let x, y;
        x = parseInt($(this).attr("value").substring(0, 1));
        y = parseInt($(this).attr("value").substring(1));
        // setting the border
        if (y%3 === 0 && i%9>0) {
            $(this).css("border-left-width", 5);
        }
        if (x%3 === 0 && i > 10) {
            $(this).css("border-top-width", 5);
        }

        // display the puzzel
        if (puzzelBoard[x][y] !== 0) {
            $(this).html(puzzelBoard[x][y]);
            $(this).attr("data-original", true);
            $(this).css("font-weight", "bold");
        }

        i++;
        $(this).click(inputAnswer);
    });
});

function createPuzzel(sudokuBoard) {
    let min = 5;
    let max = min+2;

    sudokuBoard.map(row => {
        // create a randomized array from 0 to the row length
        let replaceArr = shuffle(row.length);
        // create random number of blank spots for the puzzel
        let randomBlankLength = Math.floor(Math.random() * (max-min+1)+min);
        // loop through the randomized amount 
        for (i = 0; i < randomBlankLength; i++) {
            // take out the element from ramdoned array as the index for the elemnt of board to be 0
            row[replaceArr[i]] = 0;
        }
        return row;
    });
    return sudokuBoard;
}

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
        const statementCase = newCell.attr("data=orinal") !== "false";

        switch (statementCase) {
            // key is 1-9
            case (event.which >= 49 && event.which <=57): 
                const answer = String.fromCharCode(event.which);
                newCell.html(answer);
                // const x = newCell.attr("value").substring(0, 1);
                // const y = newCell.attr("value").substring(1);
                // puzzelBoard[x][y] = answer;
                // TODO: validate the answer 
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