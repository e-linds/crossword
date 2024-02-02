import { Link } from 'react-router-dom'
import { useState } from 'react'
import CreatePage from "./CreatePage"


function CreateOptions({ userPuzzles }) {
    const [showExisting, setShowExisting] = useState(false)

function handleClick() {
    setShowExisting(!showExisting)
}

    return(
        <div>
            <button><Link to="/create">Create New Puzzle</Link></button>
            <button onClick={handleClick}>Edit Existing Puzzle</button>
            {showExisting ?
            userPuzzles.map((each) => {
                return <Link to={`/create/${each.id}`} self={each}>{each.name}</Link>
            })
            :
            null
        }
        </div>
    )
}

export default CreateOptions