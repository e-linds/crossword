import { useEffect, useState } from 'react'
import GridCellSolve from "./GridCellSolve"

function GridSolve ({ guessInput, selectedCells, setSelectedCells, puzzleWords, orderedPositions, guessPositions, letterPositions, currentGuesses }) {

  
    const array = ["a", "b", "c", "d", "e", "f", "g", "h", "i", 'j', 'k', "l", "m", "n", "o", "p", "q", "r"]
    let row_index
    let column_index
    

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
                        puzzleWords={puzzleWords}
                        />
                    })}
                    
                </div>
            })}
        </div>
    )
}

export default GridSolve