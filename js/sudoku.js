let answerBoard = [
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
function sudokuEngine() {

}

$(document).ready(function() {
    let i = 0;
    let puzzel = createPuzzel(answerBoard);
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
        if (puzzel[x][y] !== 0) {
            $(this).html(puzzel[x][y]);
        }

        i++
    });
});

function createPuzzel(sudokuBoard) {
    let min = 4;
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
