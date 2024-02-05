import { Link } from "react-router-dom"

function SolveOptions({ userPuzzles }) {
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