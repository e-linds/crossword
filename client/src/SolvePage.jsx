import GridSolve from "./GridSolve"
import { useEffect, useInsertionEffect, useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';


function SolvePage({ user, userPuzzles, UPAttempts, deletePuzzle, setCurrentTab }) {
    const navigate = useNavigate()
    const location = useLocation()
    const [guessInput, setGuessInput] = useState("")
    const [puzzleWords, setPuzzleWords] = useState({})
    const [puzzleClues, setPuzzleClues] = useState({})
    const [displayClues, setDisplayClues] = useState([])
    const [selectedCells, setSelectedCells] = useState([])
    const [orderedPositions, setOrderedPositions] = useState([])
    const [currentGuesses, setCurrentGuesses] = useState([])   
    const [showPopup, setShowPopup] = useState(false)
    const [accuracy, setAccuracy] = useState(false)
    const [UPAttemptId, setUPAttemptId] = useState("")


    let letterPositions = {}
    let guessPositions = {}

    console.log(puzzleWords)


    let { puzzleid } = useParams();
    const thispuzzleid = parseInt(Object.values({ puzzleid }))
    const thispuzzle = userPuzzles.find(each => each.id === thispuzzleid)

    console.log(thispuzzleid)
    const existingAttempt = UPAttempts.find((each) => each.puzzle_id === thispuzzleid && each.user_id === user.id)
    console.log(existingAttempt)

    createPositionsDict(puzzleWords, letterPositions)
    createPositionsDict(currentGuesses, guessPositions)

    console.log(thispuzzle.words)

    useEffect(() => {

            setCurrentTab(location.pathname)
    
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

    function postGuess(id) {

        const new_guess = {
            name: guessInput,
            direction: getDirection(),
            row_index: selectedCells[0][1],
            column_index: selectedCells[0][2],
            upattempt_id: id
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
            console.log("new guess")

            setCurrentGuesses([...currentGuesses, data])

            navigate(`/solve/${thispuzzleid}`)

        })




    }


function addGuess() {

    if (guessInput.length === selectedCells.length) {

    
    if (existingAttempt) {
        setUPAttemptId(existingAttempt.id)

        postGuess(existingAttempt.id)

    } else {

        const new_upattempt = {
            user_id: user.id,
            puzzle_id: thispuzzleid
        }

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
            setUPAttemptId(data.id)

            postGuess(data.id)
        })

        }

        console.log(UPAttemptId)

        }}

        console.log(currentGuesses)


    
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

        fetch(`/api/upattempt/${UPAttemptId}/guesses`, {
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
        let positionsArray = []

        for (const each in wordDirectionInfo) {

            if (positionsArray.find(item => item.toString() === wordDirectionInfo[each][0].toString())) {

                const originalInstance = wordDirectionInfo.find(ele => ele[0].toString() === wordDirectionInfo[each][0].toString())
                const originalNumber = originalInstance[3]
                wordDirectionInfo[each].push(originalNumber)

            } else {

                positionsArray.push(wordDirectionInfo[each][0])
                count = count + 1
                wordDirectionInfo[each].push(count)

            }}
            console.log(wordDirectionInfo)

        setOrderedPositions(wordDirectionInfo)
        }}
    
    
    //this function takes an array of word objects and arranges them in an object with [row_index column_index]: letter
    function createPositionsDict(array, resultObj) {
    
        //naive solution - this is not very efficient, can optimize later
            for (const each in array) {
                const length = array[each].length
                
    
                let count = -1
                for (const letter in array[each].name) {
                    const ind_letter = array[each].name[letter]
    
                    //the count variable keeps track of which index of the word we are at
                    count = count + 1
                    
                    let row_result
                    let column_result
    
    
                    if (array[each].direction === "across") {
                        row_result = array[each].row_index
                        column_result = array[each].column_index + (count)
    
                    } else if (array[each].direction === "down") {
                        row_result = array[each].row_index + (count)
                        column_result = array[each].column_index
                    }
    
                    resultObj[`${row_result} ${column_result}`] = `${ind_letter}`
    
                    }
            }
    
        }

    console.log(letterPositions)
    console.log(guessPositions)
    console.log(currentGuesses)
    console.log(existingAttempt)
    console.log(puzzleWords)
    console.log(UPAttemptId)



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


    function checkAccuracy() {

        const letterLocations = Object.keys(letterPositions)

        let all_accurate = true

        for (const each in letterLocations) {
            if (guessPositions[letterLocations[each]] === letterPositions[letterLocations[each]]) {
            } else {
                all_accurate = false
            }}

        if (all_accurate) {
            setAccuracy(true)
        }
        setShowPopup(true)
}

function handlePopupClose() {
    setShowPopup(!showPopup)

}

function clearPuzzleandExit() {
    handlePopupClose()
    clearAllGuesses()
    window.location.reload(true)
}

    
    return(
        <main id="solvepage-container">
            <div>
                <div> </div>
                <h1 id="solvepuzzletitle">{thispuzzle.name}</h1>
                <div id="solve-details">
                    <form id="newword-form" onSubmit={handleSubmit}>
                        <input name="new-guess" placeholder="Enter Guess Here" onChange={handleGuessTyping}></input>
                        <button type="submit">Confirm Guess</button>
                    </form>  
                <button onClick={clearGuess}>To clear a word from the board, select all its cells, then click this button</button>
                <button onClick={clearAllGuesses}>To clear the whole board, click here</button>
                <button onClick={checkAccuracy}>Check Accuracy</button>
                <Dialog id="accuracypopup" open={showPopup} onClose={handlePopupClose}>
                {accuracy ?
                    <DialogContent >
                        <DialogContentText>Congrats! All the words are correct!</DialogContentText>
                        <Button onClick={handlePopupClose}>Stay on Page</Button>
                        <Button onClick={clearPuzzleandExit}>Clear and go home</Button>
                        </DialogContent>
                        :
                        <DialogContent>
                            <DialogContentText>Something in the puzzle isn't quite right.</DialogContentText>
                            <DialogContentText>{"(Or, it's not finished! Why are you checking the answers already?!)"}</DialogContentText>
                            <DialogContentText>Keep trying!</DialogContentText>
                        </DialogContent>
                }
                </Dialog>
                </div>
            </div>
            <GridSolve 
            guessInput={guessInput} 
            selectedCells={selectedCells} 
            setSelectedCells={setSelectedCells} 
            puzzleWords={puzzleWords}
            orderedPositions={orderedPositions}
            guessPositions={guessPositions}
            currentGuesses={currentGuesses}
            letterPositions={letterPositions}
            />
            <div id="solveclues">
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
        </main>
    )
}

export default SolvePage