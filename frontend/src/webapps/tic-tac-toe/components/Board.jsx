import '../styles/board.css'


export default function Board({boardState, setBoardState, isHumanOpponent = false, turn, setTurn}){
    let tileKey = 0



    function move(e){
        // playing against AI, only move if it's the human's turn
        if(!isHumanOpponent && turn){
            setBoardState([...boardState.slice(0,e.target.id), 'X', ...boardState.slice(e.target.id+1)])
            setTurn(false)
        }
        // playing against a human, place the correct symbol accordingly
        if(isHumanOpponent){
            setBoardState([...boardState.slice(0,e.target.id), turn ? 'X' : 'O', ...boardState.slice(e.target.id+1)])
            setTurn(!turn)
        }
    }

    return(
        <div className="board">
            {boardState.map(tile => {
                if(tile === '-'){
                    return (
                        <button className="tile" key={++tileKey} id={tileKey} onClick={move}>
                            {" "}
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
    )
}