import GridSolve from "./GridSolve"
import { useEffect, useInsertionEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function SolvePage({ user, userPuzzles, UPAttempts, deletePuzzle }) {
    const navigate = useNavigate()
    const [guessInput, setGuessInput] = useState("")
    const [puzzleWords, setPuzzleWords] = useState({})
    const [puzzleClues, setPuzzleClues] = useState({})
    const [displayClues, setDisplayClues] = useState([])
    const [selectedCells, setSelectedCells] = useState([])
    const [orderedPositions, setOrderedPositions] = useState([])
    const [currentGuesses, setCurrentGuesses] = useState([])   


    let { puzzleid } = useParams();
    const thispuzzleid = parseInt(Object.values({ puzzleid }))
    const existingAttempt = UPAttempts.find((each) => each.puzzle_id === thispuzzleid && each.user_id === user.id)


    useEffect(() => {
    
            const thispuzzle = userPuzzles.find(each => each.id === thispuzzleid)
            setPuzzleWords(thispuzzle ? thispuzzle.words : {})

        if (thispuzzle) {
            let dict = {}
            for (const each in thispuzzle.words) {
                const wordid = thispuzzle.words[each].id
                const clue = thispuzzle.words[each]["clue"]
                dict[wordid] = clue

                setPuzzleClues(dict)
            }
            }

    }, [])

    useEffect(() => {

        assignNumberedCells()

    }, [puzzleWords])


    useEffect(() => {
        if (orderedPositions) {

            createDisplayClues()
    }

    }, [orderedPositions])

    useEffect(() => {
        console.log(UPAttempts)

        if (existingAttempt) {
            setCurrentGuesses(existingAttempt.guesses)
        }

        //add guesses associated with this puzzle to the current guesses array
    }, [])


    function getDirection() {

        if (selectedCells.length > 1) {

            if (selectedCells[0][1] === selectedCells[1][1]) {
                return "across"
            } else if (selectedCells[0][2] === selectedCells[1][2]) {
                return "down"
            }

    }}


    function handleGuessTyping(e) {
        const input = e.target.value
        setGuessInput(input)
    }

 
//handle submission of a new word to the board
    function handleSubmit(e) {
        e.preventDefault()

        addGuess()

    e.target["new-guess"].value = ""
    }


function addGuess() {

    if (guessInput.length === selectedCells.length) {

    let attemptid
    if (existingAttempt) {
        attemptid = existingAttempt.id
        console.log(attemptid)

    } else {

        const new_upattempt = {
            user_id: user.id,
            puzzle_id: thispuzzleid
        }

        console.log(new_upattempt)

        fetch('/api/upattempts', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(new_upattempt)
        })
        .then(r => r.json())
        .then(data => {
            console.log(data)
            attemptid = data.id
            console.log(attemptid)

            navigate(`/solve/${thispuzzleid}`)
        })

        }

        if (attemptid) {

        const new_guess = {
            name: guessInput,
            direction: getDirection(),
            row_index: selectedCells[0][1],
            column_index: selectedCells[0][2],
            upattempt_id: attemptid
        }

        fetch("/api/guesses", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(new_guess)
        })
        .then(r => r.json())
        .then(data => {

            setSelectedCells([])
            setGuessInput("")

            setCurrentGuesses([...currentGuesses, data])

        })}}}


    
    function clearGuess() {

        const firstIndex = selectedCells[0]

        const guessToClear = currentGuesses.find((each) => {
            const position = [(each.row_index + each.column_index), each.row_index, each.column_index]
            if (position.toString() === firstIndex.toString()) {
                return each
            }

        })
    
        fetch(`/api/guesses/${guessToClear.id}`, {
            method: "DELETE"
        })
        .then(r => {})
        .then(data => {
            let array = currentGuesses
            const index = array.indexOf(guessToClear)
            array.splice(index, 1)
            console.log(array)
            setCurrentGuesses(array)
        })    
    }

    function clearAllGuesses() {

        fetch(`/api/upattempt/${existingAttempt.id}/guesses`, {
            method: "DELETE"
        })
        .then(r => console.log(r))
        .then(data => setCurrentGuesses([]))
        
    }

    function assignNumberedCells() {

        if (puzzleWords) {

    //this is creating a nested array in which each saved word is organized like this [[position, row, column], id, direction, ranking]
        let wordDirectionInfo = []
        for (const each in puzzleWords) {
            if (puzzleWords[each].name.length > 0) {
            const direction = puzzleWords[each].direction
            if (direction) {
            const id = puzzleWords[each].id
            const row = puzzleWords[each].row_index
            const column = puzzleWords[each].column_index
            wordDirectionInfo.push([[row + column, row, column], id, direction])
        }}}

       //sort by sum, of row + column index, which will place the display letters generally increasing from top left to bottom right 
        wordDirectionInfo.sort((x,y) =>  x[0][0] - y[0][0])

        let count = 0
        for (const each in wordDirectionInfo) {
            count = count + 1
            wordDirectionInfo[each].push(count)
        }

        setOrderedPositions(wordDirectionInfo)
        }}

function createDisplayClues() {

    let array = []
    for (const each in orderedPositions) {
        const id = orderedPositions[each][1]
        const direction = orderedPositions[each][2]
        const displayNumber = orderedPositions[each][3]
        const clueText = puzzleClues[id]
        const finishedClue = `${displayNumber} ${direction}: ${clueText}`
        array.push(finishedClue)  
    }
    setDisplayClues(array)
}
    




    return(
        <main id="createpage-container">
            <div>
            <h2>Clues</h2>
            {displayClues.length > 0 ?
            <>
            {displayClues.map((each) => {
                return <p key={each.id}>{each}</p>
            })}
            </>
            :
            null
            }
            </div>
            <GridSolve 
            guessInput={guessInput} 
            selectedCells={selectedCells} 
            setSelectedCells={setSelectedCells} 
            puzzleWords={puzzleWords}
            orderedPositions={orderedPositions}
            currentGuesses={currentGuesses}
            />
            <div id="create-details">
                    <form id="newword-form" onSubmit={handleSubmit}>
                        <input name="new-guess" placeholder="Enter Guess Here" onChange={handleGuessTyping}></input>
                        <button type="submit">Confirm Guess</button>
                    </form>  
                <button onClick={clearGuess}>To clear a word from the board, select all its cells, then click this button</button>
                <button onClick={clearAllGuesses}>To clear the whole board, click here</button>
            </div>
        </main>
    )
}

export default SolvePage