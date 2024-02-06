import { useEffect, useState } from 'react'
import GridCellSolve from "./GridCellSolve"

function GridSolve ({ guessInput, selectedCells, setSelectedCells, puzzleWords, orderedPositions, currentGuesses }) {

    // useEffect(() => {
    //     if (savedWords) {
    //     displaySavedWords()
    //     }
    // }, [savedWords])
    

    const array = ["a", "b", "c", "d", "e", "f", "g", "h", "i", 'j', 'k', "l", "m", "n", "o", "p", "q", "r"]
    let row_index
    let column_index
    let letterPositions = {}
    let guessPositions = {}


    // console.log(currentGuesses)


    //this function takes an array of word objects and arranges them in an object with [row_index column_index]: letter
    function createPositionsDict(array, resultObj) {

    //naive solution - this is not very efficient, can optimize later
        for (const each in array) {
            const length = array[each].length
            

            let count = -1
            for (const letter in array[each].name) {
                const ind_letter = array[each].name[letter]

                //the count variable keeps track of which index of the word we are at
                count = count + 1
                
                let row_result
                let column_result


                if (array[each].direction === "across") {
                    row_result = array[each].row_index
                    column_result = array[each].column_index + (count)

                } else if (array[each].direction === "down") {
                    row_result = array[each].row_index + (count)
                    column_result = array[each].column_index
                }

                resultObj[`${row_result} ${column_result}`] = `${ind_letter}`

                }
        }

    }

    createPositionsDict(puzzleWords, letterPositions)

    createPositionsDict(currentGuesses, guessPositions)

    // console.log(guessPositions)

    return(
        <div id="grid2">
            {array.map((each) => {
                row_index = array.indexOf(each)
                return <div id="gridrows">
                    {array.map((item) => {
                        column_index = array.indexOf(item)
                        return <GridCellSolve
                        key={item.id}
                        row_index={row_index} 
                        column_index={column_index} 
                        selectedCells={selectedCells} 
                        setSelectedCells={setSelectedCells}
                        guessInput={guessInput}
                        letterPositions={letterPositions}
                        orderedPositions={orderedPositions}
                        currentGuesses={currentGuesses}
                        guessPositions={guessPositions}
                        />
                    })}
                    
                </div>
            })}
        </div>
    )
}

export default GridSolve