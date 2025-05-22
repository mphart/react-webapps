import {useEffect, useState} from 'react'
import '../styles/board.css'
import bestMove, {evaluate, numX, numO, isTerminalState} from './board.js'


export default function Board({boardState, setBoardState, turn, setTurn, gameOver, setGameOver}){
    let tileKey = 0

    useEffect(() => {
        if(!turn && !isTerminalState(boardState)){
            // calculate the best move from the given position
            // include a timeout to give the illusion of thought
            let newBoard = bestMove(boardState)
            setTimeout(()=>{setBoardState(newBoard)},500)
            setTurn(true)
        }
        console.log(isTerminalState(boardState))
        if(isTerminalState(boardState)){
            setGameOver(true)
        }
    }, [turn, boardState])

    function move({target}){
        let square = target.id
        // only move if it's the human's turn and the square is not taken
        if(boardState[square] === '-'){
            // update the board with the player's move
            let newBoard = boardState
            newBoard[square] = numX(boardState) === numO(boardState) ? 'X' : 'O'
            setTurn(false)
            setBoardState(newBoard)
        }
    }

    return(
        <>
        {gameOver && <h1>Game Over</h1>}
        <div className="board">
            {boardState.map(tile => {
                if(tile === '-'){
                    return (
                        <button className="tile" key={++tileKey} id={tileKey} onClick={move}>
                        </button>
                    )
                } else if(tile === 'X') {
                    return (
                        <button className="tile" key={++tileKey} id={tileKey} style={{color:"red"}} onClick={move}>
                            {tile}
                        </button>
                    )
                } else if(tile === 'O') {
                    return (
                        <button className="tile" key={++tileKey} id={tileKey} style={{color:"blue"}} onClick={move}>
                            {tile}
                        </button>
                    )
                }
            })}
        </div>
        </>
    )
}