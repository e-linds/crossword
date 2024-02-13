import { Link } from 'react-router-dom'

function Header({ currentTab, setCurrentTab }) {

    
    return(
        <div id="header-container">
            <span onClick={() => setCurrentTab("/home")}>
                <Link to="/home">
                    {currentTab.includes("home")
                    ?
                    <b>Home</b>
                    :
                    "Home"}
                </Link>
            </span>
            <div id="header-details">
                <Link to="/createoptions">
                    {currentTab.includes("create")
                    ?
                    <b>Create</b>
                    :
                    "Create"}
                </Link>
                <Link to="/solveoptions">
                    {currentTab.includes("solve")
                    ?
                    <b>Solve</b>
                    :
                    "Solve"}
                </Link>
                <Link to="/myaccount">
                    {currentTab.includes("myaccount")
                    ?
                    <b>My Account</b>
                    :
                    "My Account"}
                </Link>
            </div>
        </div>
    )
}

export default Header