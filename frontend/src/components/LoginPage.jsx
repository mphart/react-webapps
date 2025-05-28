import {useState} from 'react'
import {Link} from 'react-router-dom'
import '../styles/login.css'


export default function LoginPage(){
    const apiUrl = "http://127.0.0.1:8080/api/login"   // <=== input server address

    const [loginInfo, setLoginInfo] = useState({
        email : "",
        password : ""
    })

    async function handleSubmit(e){
        if(validateForm()){
            console.log("fetching user data")
            try{
                const response = await fetch(apiUrl, {
                    method: "POST",
                    headers: {"Content-Type" : "application/json"},
                    body: JSON.stringify(loginInfo),
                }) 
                const userData = await response.json()
                console.log(userData)
            } catch (err){
                console.error(err)
            }
        } else{
            e.preventDefault()
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
        if(emailSplit.length > 2){
            alert("Must input a valid email")
            return false
        }
        if(emailSplit[1].length <= 0){
            alert("Must input a valid email")
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
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input type="text" name="email" onChange={handleChange} className="login-input" maxLength="255" />
                <br />
                <label>Password</label>
                <input type="text" name="password" onChange={handleChange} className="login-input" maxLength="32" />
                <br />
                <input type="submit" value="Submit" />
            </form>
            <Link to="/login/forgot-password">Forgot Password?</Link>
        </div>
    )
}