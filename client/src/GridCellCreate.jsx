import { useEffect, useState } from 'react'
// import { useSelectionContainer } from '@air/react-drag-to-select'




function GridCellCreate({ row_index, column_index, selectedCells, setSelectedCells, wordInput, letterPositions, orderedPositions }) {
    const [selected, setSelected] = useState(false)
    const [letter, setLetter] = useState("")
    const [cellNumber, setCellNumber] = useState("")
    // const { DragSelection } = useSelectionContainer()

    const position = [(row_index + column_index), row_index, column_index]    
    // console.log(`${position} ${selected}`)
    

    useEffect(() => {
        displaySavedWords()
        // setSelected(false)
        // setSelectedCells([])
    }, [letterPositions, letter])

    useEffect(() => {
        addLetters()
    }, [wordInput])

    

    let cellStyle

    if (selected === false || selectedCells.length === 0) {
        cellStyle = {
            backgroundColor: "white"
        }
    } else if (selected) {
        cellStyle = {
            backgroundColor: "#9DCEFC"
        }
    }

    // this function sorts the array by initial index, which is the sum of the two position coordinates. This guarantees we will start with the topmost/leftmost grid cell
    function sortArray(input) {
        input.sort((x,y) => {
            if (x[0] > y[0]) return 1;
            if (x[0] < y[0]) return -1
            return 0
        })
    }


    function handleCellClick() {
        setSelected(!selected)
        //sum of row index plus column index is [0] in position for easier sorting later
        if (selectedCells) {

        const exists = selectedCells.find(each => each[1] === position[1] && each[2] === position[2])

        if (exists) {
            const array = selectedCells
            const index = array.indexOf(position)
            array.splice(index, 1)
            sortArray(array)
            setSelectedCells(array)

        } else {
            const array = [...selectedCells, position]
            sortArray(array)
            setSelectedCells(array)
        }}
    }

    //this displays letters as they are typed into the word input field
    function addLetters() {

        if (selectedCells) {

        const exists = selectedCells.find(each => each[1] === position[1] && each[2] === position[2])

        if (exists) {
            //turn nested arrays into strings for easier comparison
            const array = []
            for (const each of selectedCells) {
                array.push(each.toString())
            }
            const index = array.indexOf(position.toString())

            if (wordInput) {
                setLetter(wordInput[index])
            } else if (wordInput === "") {
                setLetter("")
            }

        }}

    }

   function displaySavedWords() {


    //display words
    const positionToMatch = position.slice(1).toString().replaceAll(",", " ")
    const letterToDisplay = letterPositions[`${positionToMatch}`]
  
    setLetter(letterToDisplay ? letterToDisplay : "")


    //display numbers (1 across, etc)
    if (orderedPositions) {
        for (const each in orderedPositions) {
           
            if ((orderedPositions[each][0]).toString() === position.toString()) {
                const numberToDisplay = orderedPositions[each][3]
                setCellNumber(numberToDisplay)
            }
        }
    }

   }

 
    return(
        <>
        {/* <DragSelection /> */}
        <div id="gridcell" onClick={handleCellClick} style={cellStyle}>
            <div id="cell-number">{cellNumber}</div>
            <div id="cell-letter">{letter}</div>
        </div>
        </>
    )
}

export default GridCellCreate





