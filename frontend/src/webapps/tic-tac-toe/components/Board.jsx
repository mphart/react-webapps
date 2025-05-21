import '../styles/board.css'


export default function Board({boardState, setBoardState, isHumanOpponent = false}){
    let tileKey = 0



    return(
        <div className="board">
            {boardState.map(tile => {
                if(tile === '-'){
                    return (
                        <div className="tile" key={++tileKey}>{" "}</div>
                    )
                } else if(tile === 'X') {
                    return (
                        <div className="tile" key={++tileKey} style={{color:"red"}}>{tile}</div>
                    )
                } else if(tile === 'O') {
                    return (
                        <div className="tile" key={++tileKey} style={{color:"blue"}}>{tile}</div>
                    )
                }
            })}
        </div>
    )
}