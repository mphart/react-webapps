
export default function GamePanel({boardState, setBoardState, children}){

    const newGame = () => setBoardState(['-','-','-','-','-','-','-','-','-'])


    return(
        <div className="gamepanel">
            <button onClick={newGame}>New Game</button>
            {children}
        </div>
    )
}