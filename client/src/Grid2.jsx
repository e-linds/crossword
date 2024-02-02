import { useEffect, useState } from 'react'
import GridCell from "./GridCell"

function Grid2 ({ wordInput, selectedCells, setSelectedCells, savedWords }) {
    

    const array = ["a", "b", "c", "d", "e", "f", "g", "h", "i", 'j', 'k', "l", "m", "n", "o", "p", "q", "r", "s"]
    let row_index
    let column_index
    let letterPositions = {}



    function displaySavedWords() {

    //naive solution - this is not very efficient, can optimize later
        for (const each in savedWords) {
            const length = savedWords[each].length
            

            let count = -1
            for (const letter in savedWords[each].name) {
                const ind_letter = savedWords[each].name[letter]

                //the count variable keeps track of which index of the word we are at
                count = count + 1
                
                let row_result
                let column_result


                if (savedWords[each].direction === "across") {
                    row_result = savedWords[each].row_index
                    column_result = savedWords[each].column_index + (count)

                } else if (savedWords[each].direction === "down") {
                    row_result = savedWords[each].row_index + (count)
                    column_result = savedWords[each].column_index
                }

                letterPositions[`${row_result} ${column_result}`] = `${ind_letter}`

                }

            // console.log(letterPositions)

            
        }


    }

    displaySavedWords()


    return(
        <div id="grid2">
            {array.map((each) => {
                row_index = array.indexOf(each)
                return <div id="gridrows">
                    {array.map((item) => {
                        column_index = array.indexOf(item)
                        return <GridCell 
                        row_index={row_index} 
                        column_index={column_index} 
                        selectedCells={selectedCells} 
                        setSelectedCells={setSelectedCells}
                        wordInput={wordInput}
                        savedWords={savedWords}
                        letterPositions={letterPositions}
                        />
                    })}
                    
                </div>
            })}
        </div>
    )
}

export default Grid2