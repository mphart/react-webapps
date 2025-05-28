import {useState} from 'react'
import '../styles/signup.css'


export default function SignupPage(){
    const apiUrl = "http://127.0.0.1:8000/api/signup"

    const [signupInfo, setSignupInfo] = useState({
        email : "",
        username : "",
        password : "",
        confirmPassword : ""
    })

    // temporary state variable, move this to App.jsx
    const [username, setUsername] = useState(null)
    
    async function handleSubmit(e){
        e.preventDefault()
        if(validateForm()){
            try{
                const response = await fetch(apiUrl, {
                    method: "POST",
                    headers : {"Content-Type": "application/json",},
                    body: JSON.stringify(signupInfo)
                })
                const data = await response.json()
                console.log(data)
                setUsername(data.username)
            }catch(err){
                const msg = err.error || "Something went wrong"
                alert(msg)
            }
        }
    }

    function validateForm(){
        const {email, username, password, confirmPassword} = signupInfo
        // check if any fields are empty
        if(!email || !username || !password || !confirmPassword){
            alert("All fields must be filled")
            return false
        }
        // check if email is valid
        let emailSplit = email.split("@")
        if(emailSplit.length !== 2){
            alert("Invalid email")
            return false
        } else if(!emailSplit[0].length || !emailSplit[1].length){
            alert("Invalid email")
            return false
        }
        // ensure password fields match
        if(password !== confirmPassword){
            alert("Passwords must match")
            return false
        }
        // form looks good on first pass
        return true
    }

    function handleChange(e){
        const {name, value} = e.target
        setSignupInfo({...signupInfo, [name] : value})
    }

    return(
        <div className="signup">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input type="text" name="email" onChange={handleChange} className="login-input" maxLength="255" />
                <br />
                <label>Username</label>
                <input type="text" name="username" onChange={handleChange} className="login-input" maxLength="16" />
                <br />
                <label>Password</label>
                <input type="password" name="password" onChange={handleChange} className="login-input" maxLength="32" />
                <br />
                <label>Confirm Password</label>
                <input type="password" name="confirmPassword" onChange={handleChange} className="login-input" maxLength="32" />
                <br />
                <input type="submit" value="Submit" />
            </form>
            {username && <h1>Welcome, {username}!</h1>}
        </div>
    )
}