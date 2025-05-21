// function for calculating the best move given a new board
export default function bestMove(board){
    // sum up the number of x's and o's and empty tiles
    let x = numX(board)
    let o = numO(board) 
    let depth = board.length - x - o

    // calculate which symbol is next to move given x always goes first
    let isMax = x === o
    let nextSymbol = x === o ? 'X' : 'O'

    // find the index of the best move    TODO fix
    let bestMoveIndex = board.indexOf('-')
    let index = 0
    board.map(tile => {
        if(tile === '-'){
            let nextBoard = [...board.slice(0,index), nextSymbol, ...board.slice(index+1,board.length), ]
            let nextBoardEval = minimax(nextBoard, !isMax, depth-1)
            if(nextBoardEval >= 1 && isMax) bestMoveIndex = index
            if(nextBoardEval <= -1 && !isMax) bestMoveIndex = index
        }
        index += 1;
    })

    // finally, return the updated board state
    return [...board.slice(0,bestMoveIndex), isMax ? 'X' : 'O', ...board.slice(bestMoveIndex+1,board.length), ]
}

// returns the index of the best position to move
// X is the maximizing player and O is the minimizing player
function minimax(board, isMax, depth){
    // basecase - board is terminal
    let boardVal = evaluate(board)
    if(boardVal == -1 || boardVal == 1 || depth <= 0){
        return boardVal
    }

    let remainingSpaces = depth
    // player with X
    if(isMax){
        let maxEval = -100
        // for every remaining space, call minimax again
        // to do this, construct the new board state using index of, starting after
        // the index of the previous child
        let lastChildIndex = -1
        for(let i = 0; i < remainingSpaces; i++){
            let childIndex = board.indexOf('-',lastChildIndex+1)
            let childBoard = [...board.slice(0,childIndex), isMax ? 'X' : 'O', ...board.slice(childIndex+1,board.length), ]
            let childEval = minimax(childBoard, false, depth-1)
            maxEval = max(childEval, maxEval)
            lastChildIndex = childIndex
        }
        return maxEval
    }
    // player with O
    else{
        let minEval = -100
        let lastChildIndex = -1
        for(let i = 0; i < remainingSpaces; i++){
            let childIndex = board.indexOf('-',lastChildIndex+1)
            let childBoard = [...board.slice(0,childIndex), isMax ? 'X' : 'O', ...board.slice(childIndex+1,board.length), ]
            let childEval = minimax(childBoard, false, depth-1)
            minEval = min(childEval, minEval)
            lastChildIndex = childIndex
        }
        return minEval
    }
}

// evaluates whether the board is in a terminal state
// return -1 if board is in a terminal state in which O wins
// return 1 if board is in a terminal state in which X wins
// return 0 if board is not in a terminal state, or is in a terminal state in which there is a tie
export function evaluate(board){
    for(let i = 0; i < 3; i++){
        // full rows
        if(board[3*i] === board[3*i+1] && board[3*i+1] === board[3*i+2] && board[3*i] != '-'){
            return board[3*i] === 'X' ? 1 : -1
        }
        // full columns
        if(board[i] === board[i+3] && board[i+3] === board[i+6] && board[3*i] != '-'){
            return board[i] === 'X' ? 1 : -1
        }
    }
    // diagonals
    if(board[0] === board[4] && board[4] === board[8] && board[4] != '-'){
        return board[0] === 'X' ? 1 : -1
    }
    if(board[2] === board[4] && board[4] === board[6] && board[4] != '-'){
        return board[0] === 'X' ? 1 : -1
    }
    // board is not terminal
    else return 0
}

export function isTerminalState(board){
    return evaluate(board) !== 0 || board.indexOf('-') === -1
}

export function numX(board){
    return board.filter(tile => tile === 'X').length
}

export function numO(board){
    return board.filter(tile => tile === 'O').length
}

function max(lhs, rhs){
    return lhs > rhs ? lhs : rhs
}

function min(lhs, rhs){
    return lhs < rhs ? lhs : rhs
}