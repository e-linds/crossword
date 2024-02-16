import { useEffect, useState } from 'react'
// import { useSelectionContainer } from '@air/react-drag-to-select'




function GridCellCreate({ row_index, column_index, selectedCells, setSelectedCells, wordInput, letterPositions, orderedPositions, savedWords, cellsReset }) {
    const [selected, setSelected] = useState(false)
    const [letter, setLetter] = useState("")
    const [cellNumber, setCellNumber] = useState("")
    const [refreshCell, setRefreshCell] = useState(false)
    // const { DragSelection } = useSelectionContainer()

    const position = [(row_index + column_index), row_index, column_index]    
    useEffect(() => {
        displayLetters()
    }, [letterPositions, orderedPositions, savedWords])
    

    useEffect(() => {
        addLetters()
    }, [wordInput, savedWords])

    useEffect(() => {
        setSelected(false)
    },[cellsReset])


    let cellStyle
//these if/elses set the blue background and create borders on sides of the grid
    if (selected === false || selectedCells.length === 0) {
        cellStyle = {
            backgroundColor: "white",
        }
    } else if (selected && selectedCells.find(each => each[1] === position[1] && each[2] === position[2])) {
        cellStyle = {
            backgroundColor: "#9DCEFC",
        }
    }

    if (position[2] === 17) {
        cellStyle = {
            borderRight: "solid",
            borderWidth: "1px"
        }

    }

    if (position[1] === 17) {
        cellStyle = {
            borderBottom: "solid",
            borderWidth: "1px"
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
        console.log(position, selected)
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
//this displays both letters and label numbers in the grid
   function displayLetters() {

    const positionToMatch = position.slice(1).toString().replaceAll(",", " ")
    const letterToDisplay = letterPositions[`${positionToMatch}`]

     if (letterToDisplay) {
        setLetter(letterToDisplay) 
    } else if (wordInput) {
        
    } else {
        setLetter("")
    }

    //display numbers (1 across, etc)
    if (orderedPositions) {

        setCellNumber("")
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





