
export default function GamePanel({boardState, setBoardState, setTurn, children}){

    const newGame = () => {
        setBoardState(['-','-','-','-','-','-','-','-','-'])
        setTurn(true)
    }


    return(
        <div className="gamepanel">
            <button onClick={newGame}>New Game</button>
            {children}
        </div>
    )
}