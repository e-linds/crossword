import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import CreatePage from "./CreatePage"


function CreateOptions({ userPuzzles, setCurrentTab }) {
    const location = useLocation()
    const [showExisting, setShowExisting] = useState(false)

    useEffect(() => {
        setCurrentTab(location.pathname)

    },[])

function handleClick() {
    setShowExisting(!showExisting)
}

    return(
        <div id="createoptions-container">
            <div id="createoptionsbutton-container">
                <button className="createoptions-mainbutton"><Link to="/create">Create New Puzzle</Link></button>
                <button className="createoptions-mainbutton" onClick={handleClick}>Edit Existing Puzzle</button>
                {showExisting ?
                <div id="existingpuzzles-container">
                {userPuzzles.map((each) => {
                    return  <>
                            <button id="existingpuzzle-link"><Link to={`/create/${each.id}`} self={each}>{each.name}</Link></button>
                            <br></br>
                            </>
                })}</div>
                :
                null
            }
            </div>
        </div>
    )
}

export default CreateOptions