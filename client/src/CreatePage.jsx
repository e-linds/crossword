import Grid2 from "./Grid2"
import { useState } from 'react'

function CreatePage({ user }) {
    const [wordInput, setWordInput] = useState("")
    const [clueInput, setClueInput] = useState("")
    const [filledCells, setFilledCells] = useState([])
    const [selectedCells, setSelectedCells] = useState([])
 

    function getDirection() {

        if (selectedCells.length > 1) {

            if (selectedCells[0][1] === selectedCells[1][1]) {
                return "across"
            } else if (selectedCells[0][2] === selectedCells[1][2]) {
                return "down"
            }

    }}


    function handleTyping(e) {
        const input = e.target.value
        setWordInput(input)
    }

    function handleClick(e) {
        e.preventDefault()

        // fetch - post to puzzles

        // const new_puzzle = {
        //     name: "New Puzzle",
        //     user_id: user.id
        // }

        // fetch('/api/puzzles', {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application.json"
        //     },
        //     body: JSON.stringify(new_puzzle)
        // })
        // .then(r => r.json())
        // .then(data => console.log(data))
        

        //fetch - post to words with puzzle id we just got

        const new_word = {
            name: wordInput,
            // clue: clueInput,
            direction: getDirection(),
            row_index: selectedCells[0][2],
            column_index: selectedCells[0][1],
            puzzle_id: new_puzzle.id
        }

        console.log(new_word)

        //frontend: remove blue and make letters look more permanent


    }


    return(
        <main id="createpage-container">
            <div>clues</div>
            <Grid2 wordInput={wordInput} selectedCells={selectedCells} setSelectedCells={setSelectedCells}/>
            <div id="create-details">
                    <form id="newword-form" onSubmit={handleClick}>
                        <input placeholder="new word here" onChange={handleTyping}></input>
                        <button type="submit">Confirm</button>
                    </form>   
                <div>other text about other words</div>
                <p>suggestion</p>
                <p>suggestion</p>
                <p>suggestion</p>
            </div>
        </main>
    )
}

export default CreatePage