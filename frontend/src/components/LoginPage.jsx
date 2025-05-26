import {useState} from 'react'
import '../styles/login.css'


export default function LoginPage(){
    const [loginInfo, setLoginInfo] = useState({
        email : "",
        password : ""
    })

    function handleSubmit(e){
        if(validateForm()){
            alert("Success")
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
        console.log(loginInfo)
    }

    function forgotPassword(){

    }


    return (
        <div className="login">
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input type="text" name="email" onChange={handleChange} className="login-input" />
                <br />
                <label>Password</label>
                <input type="text" name="password" onChange={handleChange} className="login-input" />
                <br />
                <input type="submit" value="Submit" />
            </form>
            <button onClick={forgotPassword}>Forgot Password?</button>
        </div>
    )
}