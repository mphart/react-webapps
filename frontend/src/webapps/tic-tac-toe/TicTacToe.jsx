import {useState} from 'react'
import './styles/tictactoe.css'

import Board from './components/Board.jsx'
import GamePanel from './components/GamePanel.jsx'


export default function TicTacToe(){
    const [boardState, setBoardState] = useState(['-','-','-','-','-','-','-','-','-'])
    const [turn, setTurn] = useState("X")

    return(
        <div className="tictactoe">
            <GamePanel boardState={boardState} setBoardState={setBoardState} setTurn={setTurn}>
                <Board 
                boardState={boardState} 
                setBoardState={setBoardState} 
                isHumanOpponent={true} 
                turn={turn} 
                setTurn={setTurn}/>
            </GamePanel>
            
        </div>
    )
}