SUDOKU PROJECT
===

STEP 1: Display Fixed Board
---
- use jquery to display 2d arry into layout
    ```js
    // display the puzzel
    if (puzzel[x][y] !== 0) {
        $(this).html(puzzel[x][y]);
    }
    ```

STEP 2: Create Fixed Board Puzzel
---
1. Created a random shuffled index array
    ```js
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
    ```
2. Replace the fully answered board with random 0s
    ```js
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
    ```
STEP 3: Allow User Input
---
```js
$(window).keydown(event => {
    const statementCase = newCell.attr("data=orinal") !== "false";

    // when key is pressed“
    switch (statementCase) {
        // key is between 1-9
        case (event.which >= 49 && event.which <=57): 
            const answer = String.fromCharCode(event.which);
            newCell.html(answer);
            break;
        // key is backspace
        case (event.which === 8):
            newCell.html("");
            break;
        default:
            break;
    }
});
```

STEP4: Validate Answer
---
- add a function to check with originonal board
- clone 2d array: https://www.freecodecamp.org/news/how-to-clone-an-array-in-javascript-1d3183468f6a/
- if answer is correct, will not allow for inputs. if the answer is incorrect background will change color