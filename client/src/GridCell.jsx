import { useState } from 'react'
// import { useSelectionContainer } from '@air/react-drag-to-select'




function GridCell({ row_index, column_index }) {
    const [selected, setSelected] = useState(false)
    // const { DragSelection } = useSelectionContainer()

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

    function handleClick() {
        setSelected(!selected)
        console.log(row_index, column_index)
    }

    return(
        <>
        {/* <DragSelection /> */}
        <div id="gridcell" onClick={handleClick} style={cellStyle}></div>
        </>
    )
}

export default GridCell