let board = [
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
        $(this).html(board[x][y]);

        i++
    });
});