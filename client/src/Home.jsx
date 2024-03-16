import { useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

function Home({ user, setUser }) {
    const [noUser, setNoUser] = useState(null)


    function handleLoginSubmit(e) {
        e.preventDefault()

        const userinfo = {
            email: e.target.email.value,
            password: e.target.password.value,
        }

        if (userinfo.email && userinfo.password) {
           
            fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: userinfo.email,
                    password: userinfo.password,
                    // stay: stay
                })
            })
            .then(r => {
                if (r.ok) {
                    return r.json()
                } else {
                    setNoUser(true)
                    console.log("not a user")
                    return null
                }
            })
            
            .then(data => setUser(data))
        }


    }

    function handleSignupSubmit(e) {
        e.preventDefault()

        const new_user = {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value,
        }

        if (new_user.email && new_user.password) {
           
            fetch("/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(new_user)
            })
            .then(r => r.json())
            .then(data => setUser(data))
        }

    }

    function handleClose() {
        setNoUser(false)
    }


    return(
        <div id="home-container">
            {user ? 
            <>
            <h1>Hello, {user.name}.</h1>
            <h1>Welcome to Crossword.</h1>
            <h3>Choose an option above to start. Or, play the daily puzzles:</h3>
            <a href="https://www.nytimes.com/crosswords/game/mini" target="_blank">Daily NYT Mini Crossword</a>
            <br></br>
            <a href="https://www.nytimes.com/games/wordle/index.html" target="_blank">Wordle</a>
            <br></br>
            <a href="https://www.nytimes.com/games/connections" target="_blank">NYT Connections</a>
            </>
            :
            <>
            
            <div id="homeforms-container">
                <h1>Crossword</h1>
                <form onSubmit={handleLoginSubmit} className="home-form">
                    <input name="email" placeholder="Email"></input>
                    <br></br>
                    <input name="password" placeholder="Password"></input>
                    <br></br>
                    <button type="submit">Login</button>
                    <Dialog id="nouserpopup" open={noUser} onClose={handleClose}>
                        <DialogContent >
                            <DialogContentText>No user found with these credentials. Please try again.</DialogContentText>
                            <Button onClick={handleClose}>OK</Button>
                        </DialogContent>
                    </Dialog>
                    
                </form>
                <form onSubmit={handleSignupSubmit} className="home-form">
                    <input name="name" placeholder="Name"></input>
                    <br></br>
                    <input name="email" placeholder="Email"></input>
                    <br></br>
                    <input name="password" placeholder="Password"></input>
                    <br></br>
                    <button type="submit">Signup</button>
                </form>
            </div>
            </>
        }
        </div>
        
    )
}

export default Home