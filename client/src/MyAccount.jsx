import { useState, useEffect } from 'react'

function MyAccount({ user, setUser, userPuzzles }) {
    const [longestWord, setLongestWord] = useState("")
    const [mostUsedLetter, setMostUsedLetter] = useState("")


    useEffect(() => {
        findWordRecords()

    }, [])


    function handleClick() {

        fetch("/api/logout", {
          method: "DELETE"
      })
      .then(r => setUser(null)
      ) }

      //there is certainly a more efficient way to do this - current time complexity is n squared
    function findWordRecords() {
        let wordarray = []
        for (const each in userPuzzles) {
            wordarray.push(userPuzzles[each].words)
        }
        let wordnamearray = []
        for (const each in wordarray) {
            for (const item in wordarray[each]) {
                wordnamearray.push(wordarray[each][item].name)
            }
        }
        let count = 1
        for (const each in wordnamearray) {
            if (wordnamearray[each].length > count) {
                count = wordnamearray[each].length
                setLongestWord(wordnamearray[each])
            }
        }
        let all_letters = []
        for (const each in wordnamearray) {
            for (const item in wordnamearray[each]) {
                all_letters.push(wordnamearray[each][item])
            }
     
        }
        let letterdict = {}
        for (const each in all_letters) {
            const existingCount = letterdict[all_letters[each]]
            letterdict[all_letters[each]] = existingCount ? existingCount + 1 : 1

        }
        const all_letter_counts = Object.values(letterdict)
        let count2 = 0
        let highestcount = ""
        for (const each in all_letter_counts) {
            if (all_letter_counts[each] > count2) {
                count2 = all_letter_counts[each]
                highestcount = count2
            }
            const highestcountletter = Object.keys(letterdict).find(each => letterdict[each] === highestcount)
            setMostUsedLetter(highestcountletter)
        }
    }

    
      

    return(
        <>
        <div>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
        </div>
        <button onClick={handleClick}>Logout</button>
        <div>
            <h3>Records</h3>
            <p>Number of puzzles built: {userPuzzles.length}</p>
            <p>Longest Word: {longestWord.toUpperCase()}, {longestWord.length} letters</p>
            <p>Most-Used Letter: {mostUsedLetter.toUpperCase()}</p>
        </div>
        </>
    )
}

export default MyAccount