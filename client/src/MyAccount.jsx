function MyAccount({ user, setUser }) {


    function handleClick() {

        fetch("/api/logout", {
          method: "DELETE"
      })
      .then(r => setUser(null)
      ) }



    return(
        <>
        <div>my account</div>
        <button onClick={handleClick}>Logout</button>
        </>
    )
}

export default MyAccount