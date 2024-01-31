function Home({ user, setUser }) {


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


    return(
        <div>
            {user ? 
            <h1>Welcome, {user.name}</h1>
            :
            <>
            <form onSubmit={handleLoginSubmit}>
                <input name="email" placeholder="Email"></input>
                <br></br>
                <input name="password" placeholder="Password"></input>
                <br></br>
                <button type="submit">Login</button>
            </form>
            <form onSubmit={handleSignupSubmit}>
                <input name="name" placeholder="Name"></input>
                <br></br>
                <input name="email" placeholder="Email"></input>
                <br></br>
                <input name="password" placeholder="Password"></input>
                <br></br>
                <button type="submit">Signup</button>
            </form>
            </>
        }
        </div>
    )
}

export default Home