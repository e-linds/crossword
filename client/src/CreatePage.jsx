import Grid2 from "./Grid2"
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function CreatePage({ user, userPuzzles, setUserPuzzles }) {
    const [wordInput, setWordInput] = useState("")
    const [clueInput, setClueInput] = useState("")
    const [savedWords, setSavedWords] = useState({})
    const [selectedCells, setSelectedCells] = useState([])


    let { puzzleid } = useParams();
    const thispuzzleid = parseInt(Object.values({ puzzleid }))

    useEffect(() => {
        if ({ puzzleid }) {
            
            const thispuzzle = userPuzzles.find(each => each.id === thispuzzleid)

            setSavedWords(thispuzzle.words)
        
        }

    }, [])


console.log(savedWords)

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
//handle submission of a new word to the board
    function handleSubmit(e) {
        e.preventDefault()
        
        if (Object.keys(savedWords).length > 0) {
            console.log("saved words has stuff in it")

            addWord()

        } else {
            console.log("saved words is empty")
            addFirstWord()
        }}



//add a word, regardless of whether this is first word or additional - defaults to puzzle id being current id
    function addWord(input = thispuzzleid) {

        const new_word = {
            name: wordInput,
            // clue: clueInput,
            direction: getDirection(),
            row_index: selectedCells[0][2],
            column_index: selectedCells[0][1],
            puzzle_id: input
        }

        fetch("/api/words", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(new_word)
        })
        .then(r => r.json())
        .then(data => {

            setSelectedCells([])
            setWordInput("")

            setSavedWords([...savedWords, data])

            //lots more to add here

        })
    }

    //add the first word, which saves the puzzle and saves the word to that new puzzle
    //ALSO NEED TO FIGURE OUT HOW TO CHANGE URL ONCE PUZLE IS SAVED TO INCLUDE ID ON END
    function addFirstWord() {

        const new_puzzle = {
            name: "New Puzzle",
            user_id: user.id
        }

        console.log(new_puzzle)

        fetch('/api/puzzles', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(new_puzzle)
        })
        .then(r => r.json())
        .then(data => {

            addWord(data.id)
            setUserPuzzles([...userPuzzles, data])
        })

                }

    // console.log(filledCells)


    return(
        <main id="createpage-container">
            <div>clues</div>
            <Grid2 wordInput={wordInput} selectedCells={selectedCells} setSelectedCells={setSelectedCells} savedWords={savedWords}/>
            <div id="create-details">
                    <form id="newword-form" onSubmit={handleSubmit}>
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