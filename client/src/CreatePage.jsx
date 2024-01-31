import Grid2 from "./Grid2"
import { useState } from 'react'

function CreatePage() {
    const [wordInput, setWordInput] = useState("")

    function handleTyping(e) {
        const input = e.target.value
        setWordInput(input)
    }

    // console.log(wordInput)


    return(
        <main id="createpage-container">
            <Grid2 wordInput={wordInput}/>
            <div id="create-details">
                <form id="newword-form">
                    <input placeholder="new word here" onChange={handleTyping}></input>
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