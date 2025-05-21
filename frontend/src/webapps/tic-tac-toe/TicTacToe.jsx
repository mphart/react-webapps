import {useState} from 'react'
import './styles/tictactoe.css'

import Board from './components/Board.jsx'


export default function TicTacToe(){
    const [boardState, setBoardState] = useState(['-','-','-','-','-','-','-','-','-'])
    const [turn, setTurn] = useState("X")
    const [gameOver, setGameOver] = useState(false)

    function newGame(){
        setBoardState(['-','-','-','-','-','-','-','-','-'])
        setTurn('X')
    }

    return(
        <div className="tictactoe">
            <Board boardState={boardState} setBoardState={setBoardState} turn={turn} setTurn={setTurn}
            gameOver={gameOver} setGameOver={setGameOver}/>
            <div className="gamepanel">
                <button onClick={newGame}>New Game</button>
            </div>
        </div>
    )
}