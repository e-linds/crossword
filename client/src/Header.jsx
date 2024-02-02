import { Link } from 'react-router-dom'

function Header() {
    return(
        <div id="header-container">
            <span></span>
            <div id="header-details">
                <Link to="/createoptions">Create</Link>
                <Link to="/solve">Solve</Link>
                <Link to="/myaccount">My Account</Link>
            </div>
        </div>
    )
}

export default Header