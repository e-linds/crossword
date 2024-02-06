import GridCreate from "./GridCreate"
import { useEffect, useInsertionEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function CreatePage({ user, userPuzzles, setUserPuzzles, deletePuzzle }) {
    const navigate = useNavigate()
    const [wordInput, setWordInput] = useState("")
    const [clueInput, setClueInput] = useState("")
    const [savedWords, setSavedWords] = useState({})
    const [savedClues, setSavedClues] = useState({})
    const [displayClues, setDisplayClues] = useState([])
    const [selectedCells, setSelectedCells] = useState([])
    const [orderedPositions, setOrderedPositions] = useState([])
     


    let { puzzleid } = useParams();
    const thispuzzleid = parseInt(Object.values({ puzzleid }))

    useEffect(() => {
    
            const thispuzzle = userPuzzles.find(each => each.id === thispuzzleid)
            setSavedWords(thispuzzle ? thispuzzle.words : {})
            setSelectedCells([])

        if (thispuzzle) {
            let dict = {}
            for (const each in thispuzzle.words) {
                const wordid = thispuzzle.words[each].id
                const clue = thispuzzle.words[each]["clue"]
                dict[wordid] = clue

                setSavedClues(dict)
            }
            }

    }, [])

    useEffect(() => {

        assignNumberedCells()

    }, [savedWords])


    useEffect(() => {
        if (orderedPositions) {

            createDisplayClues()

    }}, [orderedPositions, savedWords])


    function getDirection() {

        if (selectedCells.length > 1) {

            if (selectedCells[0][1] === selectedCells[1][1]) {
                return "across"
            } else if (selectedCells[0][2] === selectedCells[1][2]) {
                return "down"
            }

    }}


    function handleWordTyping(e) {
        const input = e.target.value
        setWordInput(input)
    }

    function handleClueTyping(e) {
        const input = e.target.value
        setClueInput(input)
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

        if (wordInput.length > 1) {

        const new_word = {
            name: wordInput,
            clue: clueInput,
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

            let array = []

            setSelectedCells(array)
            setWordInput("")
            setClueInput("")

            const array2 = savedWords
            array2.push(data)

            setSavedWords(array2)

            let dict = savedClues
            dict[data.id] = data.clue
            setSavedClues(dict)

            //lots more to add here
            

        })}
    }

    console.log(selectedCells)

    //add the first word, which saves the puzzle and saves the word to that new puzzle
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

        const wordToClear = savedWords.find((each) => {
            const position = [(each.row_index + each.column_index), each.row_index, each.column_index]
            if (position.toString() === firstIndex.toString()) {
                return each
            }

        })
    
        fetch(`/api/words/${wordToClear.id}`, {
            method: "DELETE"
        })
        .then(r => {})
        .then(data => {
            let array = savedWords
            const index = array.indexOf(wordToClear)
            array.splice(index, 1)
            console.log(array)
            setSavedWords(array)
        })

    
    }

    function assignNumberedCells() {

        if (savedWords) {

    //this is creating a nested array in which each saved word is organized like this [[position, row, column], id, direction, ranking]
        let wordDirectionInfo = []
        for (const each in savedWords) {
            if (savedWords[each].name.length > 0) {
            const direction = savedWords[each].direction
            if (direction) {
            const id = savedWords[each].id
            const row = savedWords[each].row_index
            const column = savedWords[each].column_index
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
        const clueText = savedClues[id]
        const finishedClue = `${displayNumber} ${direction}: ${clueText}`
        array.push(finishedClue)  
    }
    setDisplayClues(array)
}
    
    function deleteThisPuzzle() {
        deletePuzzle(thispuzzleid)
        navigate("/home")
    }



    return(
        <main id="createpage-container">
            <div>
            {displayClues.length > 0 ?
            <>
            <h2>Clues</h2>
            {displayClues.map((each) => {
                return <p>{each}</p>
            })}
            </>
            :
            <h3>Clues will display here</h3>
            }
            </div>
            <GridCreate 
            wordInput={wordInput} 
            selectedCells={selectedCells} 
            setSelectedCells={setSelectedCells} 
            savedWords={savedWords}
            orderedPositions={orderedPositions}
            />
            <div id="create-details">
                    <form id="newword-form" onSubmit={handleSubmit}>
                        <input name="new-word" placeholder="new word here" onChange={handleWordTyping}></input>
                        <div>other text about other words</div>
                        <p>suggestion</p>
                        <p>suggestion</p>
                        <p>suggestion</p>
                        <textarea name="new-clue" placeholder="clue goes here" onChange={handleClueTyping}></textarea>
                        <div>text about suggested clue from AI</div>
                        <p>suggestion</p>
                        <p>suggestion</p>
                        <button type="submit">Confirm Word & Clue</button>
                    </form>  
                <button onClick={clearWord}>To clear a word from the board, select all its cells, then click this button</button>
                <button id="deletepuzzle-button" onClick={deleteThisPuzzle}>{"Delete Puzzle :("}</button>
            </div>
        </main>
    )
}

export default CreatePage