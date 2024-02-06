import { useState } from 'react'

function CreatedClue({ text, savedClues, savedWords }) {
    const [clueEditMode, setClueEditMode] = useState(false)

    function getWordId() {

        // console.log(Object.keys(savedClues))

        // let count = -1
        // for (const each of Object.keys(savedClues)) {
        //     count = count + 1
        //     const id = Object.keys(savedClues)[count]
        //     console.log(savedClues[id].toString())
        //     console.log(text.toString())

            
        

            // if (savedClues[id].toString() === text.toString()) {
            //     console.log(text)
            // }
            // if (savedClues[Object.keys(savedClues)[each]] === text) {
            //     console.log("hello")
            // }
        // }
        

        // const 

        // const word = savedWords.find(each => each["id"] === 1)
        // console.log(word)

        //WORKING ON GETTING THE WORD ID ASSOCIATED WITH THE CLUE TO THEN PATCH IT

        let swappedDict = {}

        function swap(dict){
            for(const key in dict){
              swappedDict[dict[key]] = key;
            }
          }

          

        const index = text.indexOf(":")
        const justText = text.slice(index + 2)
        // console.log(justText)

        // console.log(swappedDict[justText.toString()])
    }

    getWordId()

    function handleSubmit(e) {
        e.preventDefault()
        setClueEditMode(false)
        const input = e.target.clue.value
        console.log(input)
  
    }


    return(
        <>
        {clueEditMode ? 
        <form onSubmit={handleSubmit}>
            <input placeholder={text} name="clue"></input>
            <button type="submit">ok</button>
            <button type="button" onClick={() => setClueEditMode(false)}>X</button>
        </form>
        :
        <p onDoubleClick={() => setClueEditMode(true)}>{text}</p>
        }
        </>
        
    )

}
export default CreatedClue