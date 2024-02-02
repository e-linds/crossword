import Grid2 from "./Grid2"
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function CreatePage({ user, userPuzzles, setUserPuzzles, deletePuzzle }) {
    const navigate = useNavigate()
    const [wordInput, setWordInput] = useState("")
    const [clueInput, setClueInput] = useState("")
    const [savedWords, setSavedWords] = useState({})
    const [selectedCells, setSelectedCells] = useState([])
     


    let { puzzleid } = useParams();
    const thispuzzleid = parseInt(Object.values({ puzzleid }))

    useEffect(() => {
    
            const thispuzzle = userPuzzles.find(each => each.id === thispuzzleid)
            setSavedWords(thispuzzle ? thispuzzle.words : {})

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
            addWord()

        } else {
            addFirstWord()
        }
    e.target["new-word"].value = ""
    }



//add a word, regardless of whether this is first word or additional - defaults to puzzle id being current id
    function addWord(input = thispuzzleid) {

        const new_word = {
            name: wordInput,
            // clue: clueInput,
            direction: getDirection(),
            row_index: selectedCells[0][1],
            column_index: selectedCells[0][2],
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
            navigate(`/create/${data.id}`)
        })

                }

    function clearWord() {

        const firstIndex = selectedCells[0]
        console.log(firstIndex)

        const wordToClear = savedWords.find((each) => {
            const position = [(each.row_index + each.column_index), each.row_index, each.column_index]
            if (position.toString() === firstIndex.toString()) {
                return each
            }

        })
        console.log(wordToClear)
        console.log(wordToClear.name)
        console.log(wordToClear.id)
    
        fetch(`/api/words/${wordToClear.id}`, {
            method: "DELETE"
        })
        .then(r => {})
        .then(data => {
            let array = savedWords
            const index = array.indexOf(wordToClear)
            array.splice(index, 1)
            setSavedWords(array)
        })

        // for (const each in selectedCells) {

        // }
        // console.log(selectedCells)
        // setSelectedCells([])
    }

    console.log(savedWords)
    
    function deleteThisPuzzle() {
        deletePuzzle(thispuzzleid)
        navigate("/home")
    }


    return(
        <main id="createpage-container">
            <div>clues</div>
            <Grid2 wordInput={wordInput} selectedCells={selectedCells} setSelectedCells={setSelectedCells} savedWords={savedWords}/>
            <div id="create-details">
                    <form id="newword-form" onSubmit={handleSubmit}>
                        <input name="new-word" placeholder="new word here" onChange={handleTyping}></input>
                        <button type="submit">Confirm</button>
                    </form>   
                <button onClick={clearWord}>Clear Word</button>
                <div>other text about other words</div>
                <p>suggestion</p>
                <p>suggestion</p>
                <p>suggestion</p>
                <button id="deletepuzzle-button" onClick={deleteThisPuzzle}>{"Delete Puzzle :("}</button>
            </div>
        </main>
    )
}

export default CreatePage