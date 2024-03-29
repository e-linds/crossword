import { useEffect } from 'react'
import { Link, useLocation } from "react-router-dom"

function SolveOptions({ userPuzzles, setCurrentTab }) {
    const location = useLocation()

    const solve = location.pathname

    useEffect(() => {
        // window.location.reload(true);
        setCurrentTab(solve)

    },[])

    console.log(userPuzzles)


    return(
        <div>
            <h2>Choose a puzzle to solve...</h2>
            <div>
                {userPuzzles.map((each) => {
                    return  <>
                            <button id="existingpuzzle-link"><Link to={`/solve/${each.id}`} self={each}>{each.name}</Link></button>
                            <br></br>
                            </>
                })}</div>
        </div>
    )
}

export default SolveOptions