import { useEffect, useState } from 'react'
// import { useSelectionContainer } from '@air/react-drag-to-select'




function GridCell({ row_index, column_index, selectedCells, setSelectedCells, wordInput }) {
    const [selected, setSelected] = useState(false)
    const [letter, setLetter] = useState("")
    // const { DragSelection } = useSelectionContainer()

    const position = [(row_index + column_index), row_index, column_index]

    useEffect(() => {
        addLetters()
    }, [wordInput])

    let cellStyle

    if (selected === false) {
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


    function handleClick() {
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

    // console.log(selectedCells)

 
    return(
        <>
        {/* <DragSelection /> */}
        <div id="gridcell" onClick={handleClick} style={cellStyle}>{letter}</div>
        </>
    )
}

export default GridCell





