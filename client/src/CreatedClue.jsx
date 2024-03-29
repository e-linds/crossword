import { useEffect, useState } from 'react'

function CreatedClue({ text, savedClues }) {
    const [clueEditMode, setClueEditMode] = useState(false)
    const [wordId, setWordId] = useState("")
    const [newClue, setNewClue] = useState("")

    const index = text.indexOf(":")
    const justClue = text.slice(index + 2)
    const justNumDirection = text.slice(0, index + 2)

    // console.log(justClue)
    // console.log(justNumDirection)

    useEffect(() => {
        getWordId()
        setNewClue(justClue)
    },[])


    function getWordId() {

        let swappedDict = {}

        for(const key in savedClues){
            swappedDict[savedClues[key]] = key;
        }
        
        const wordid = swappedDict[justClue.toString()]

        setWordId(wordid)        
    }

    function handleTyping(e) {
        e.preventDefault()

        const input = e.target.value

        setNewClue(input)

    }

    
    function handleSubmit(e) {
        e.preventDefault()
        setClueEditMode(false)

        fetch(`/api/words/${wordId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                clue: newClue
            })
        })
  
    }


    return(
        <>
        {clueEditMode ? 
        <div>
            <p id="clueedit-label">{justNumDirection}</p>
            <form onSubmit={handleSubmit}>
            <textarea id="editclue-input" style={{height: "80px"}} value={newClue} name="clue" onChange={handleTyping}></textarea>
            <br></br>
            <button className="editclue-btn" type="submit">ok</button>
            <button className="editclue-btn" type="button" onClick={() => setClueEditMode(false)}>nvm</button>
        </form>
        </div> 
        
        :
        <div onDoubleClick={() => setClueEditMode(true)}>
            <p>{justNumDirection}{newClue ? newClue : justClue}</p>
        </div> 
        }
        </>
        
    )

}
export default CreatedClue