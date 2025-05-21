import {useState} from 'react'
import './styles/calculator.css'


export default function Calculator(){

    const [storedInput, setStoredInput] = useState("0")       // stored number
    const [displayInput, setDisplayInput] = useState("0")     // currently displayed number
    const [operator, setOperator] = useState("")          // chosen operator

    const maxLength = 20
    
    // functions for button functionality
    const allClr = () => {
        setDisplayInput("0")
        setStoredInput("0")
        setOperator("")
    }
    const clr = () => {
        setDisplayInput("0")
    }
    const pct = () => {
        let displayValue = parseFloat(displayInput)
        let pctValue = displayValue / 100.
        pctValue = "" + pctValue
        if(pctValue.length > maxLength){
            pctValue = pctValue.substring(0,maxLength)
        }
        setDisplayInput(pctValue)
    }
    const divide = () => {
        if(displayInput !== ""){
            setOperator("/")
            setStoredInput(displayInput)
            setDisplayInput("0")
        }
    }
    const add = () => {
        if(displayInput !== ""){
            setOperator("+")
            setStoredInput(displayInput)
            setDisplayInput("0")
        }
    }
    const subtract = () => {
        if(displayInput !== ""){
            setOperator("-")
            setStoredInput(displayInput)
            setDisplayInput("0")
        }
    }
    const multiply = () => {
        if(displayInput !== ""){
            setOperator("X")
            setStoredInput(displayInput)
            setDisplayInput("0")
        }
    }
    const addNumber = n => {
        if(displayInput === "0"){
            setDisplayInput(n)
        } else if (displayInput === "-0"){
            setDisplayInput("-" + n)
        } else if(displayInput.length < maxLength){
            setDisplayInput(displayInput + n)
        }
    }
    const dot = () => {
        if(!displayInput.includes(".")){
            setDisplayInput(displayInput + ".")
        }
    }
    const negate = () => {
        if(displayInput.includes("-")){
            setDisplayInput(displayInput.substring(1))
        } else{
            setDisplayInput("-" + displayInput)
        }
    }
    const calc = () => {
        if(operator !== "" && displayInput !== "NaN" && storedInput !== "NaN"){
            let storedValue = parseFloat(storedInput)
            let displayValue = parseFloat(displayInput)
            let finalValue = 0
            switch(operator){
                case "+":
                    finalValue = storedValue + displayValue
                    break
                case "-":
                    finalValue = storedValue - displayValue
                    break
                case "/":
                    finalValue = storedValue / displayValue
                    break
                case "X":
                    finalValue = storedValue * displayValue
                    break
                default:
                    setDisplayInput(displayInput)
                    break
            }
            finalValue = "" + finalValue
            // check if the final value is out of the bounds
            if(finalValue.length > maxLength){
                finalValue = finalValue.substring(0,maxLength)
            }
            setDisplayInput(finalValue)
            setStoredInput("0")
        }
    }

    // list of display buttons
    const buttons = [
        {text:"AC", onClick:allClr, color:"red"},
        {text:"C", onClick:clr, color:"red"},
        {text:"%", onClick:pct, color:"orange"},
        {text:"/", onClick:divide, color:"orange"},
        {text:"1", onClick:addNumber, color:"gray"},
        {text:"2", onClick:addNumber, color:"gray"},
        {text:"3", onClick:addNumber, color:"gray"},
        {text:"+", onClick:add, color:"orange"},
        {text:"4", onClick:addNumber, color:"gray"},
        {text:"5", onClick:addNumber, color:"gray"},
        {text:"6", onClick:addNumber, color:"gray"},
        {text:"–", onClick:subtract, color:"orange"},
        {text:"7", onClick:addNumber, color:"gray"},
        {text:"8", onClick:addNumber, color:"gray"},
        {text:"9", onClick:addNumber, color:"gray"},
        {text:"X", onClick:multiply, color:"orange"},
        {text:".", onClick:dot, color:"gray"},
        {text:"0", onClick:addNumber, color:"gray"},
        {text:"-", onClick:negate, color:"gray"},
        {text:"=", onClick:calc, color:"orange"},
    ]

    return(
        <div className="calculator">
            <div className="output">
                <div className="display">
                    {displayInput}
                </div>
            </div>
            <div className="input">
                {buttons.map((b)=>
                    <button 
                    key={b.text} 
                    onClick={() => b.onClick(b.text)} 
                    style={{backgroundColor:b.color}}>
                        {b.text}
                    </button>
                )}
            </div>
        </div>
    )
}