import {useState} from 'react'
import {Link} from 'react-router-dom'
import '../styles/login.css'


export default function LoginPage(){
    const apiUrl = "http://127.0.0.1:8000/api/login"   // <=== input server address

    const [loginInfo, setLoginInfo] = useState({
        email : "",
        password : ""
    })

    // temporary state variable, move this to App.jsx
    const [username, setUsername] = useState(null)

    async function handleSubmit(e){
        e.preventDefault()
        if(validateForm()){
            try{
                const response = await fetch(apiUrl, {
                    method : "POST",
                    headers : {"Content-Type": "application/json",},
                    body: JSON.stringify(loginInfo)
                })
                const data = await response.json()
                setUsername(data.username)
            } catch(err) {
                console.error(err)
            }
        }
    }

    // return true if the form is valid on first pass, else false
    function validateForm(){
        let email = loginInfo.email
        let password = loginInfo.password
        // check that the email is an email
        if(!email.includes("@")){
            alert("Must input a valid email")
            return false
        }
        // further validation of email
        const emailSplit = email.split("@")
        if(emailSplit.length !== 2){
            alert("Invalid email")
            return false
        } else if(!emailSplit[0].length || !emailSplit[1].length){
            alert("Invalid email")
            return false
        }
        // check password
        if(password.length <= 0){
            alert("Must input a valid password")
            return false
        }
        // form looks good
        return true
    }

    function handleChange(e){
        const {name, value} = e.target
        setLoginInfo({...loginInfo, [name]: value})
    }

    return (
        <div className="login">
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input type="text" name="email" onChange={handleChange} className="login-input" maxLength="255" />
                <br />
                <label>Password</label>
                <input type="password" name="password" onChange={handleChange} className="login-input" maxLength="16" />
                <br />
                <input type="submit" value="Submit" />
            </form>
            <Link to="/login/forgot-password">Forgot Password?</Link>
            {username && <h1>Welcome, {username}!</h1>}
        </div>
    )
}