import Board from "./DomainObjects/Board";
import Player from "./DomainObjects/Player";
import MoveResult from "./DomainObjects/MoveResult"
import MoveStatus from "./DomainObjects/MoveStatus";
import IGameState from "./IGameState";

const getMoveResult = (newPosition: number, board: Board): 
        { position: number, status: MoveStatus } => 
    {

    const snake = board.snakes.find(snake => snake.top === newPosition)
    if(snake) {
        return { 
            position: snake.bottom, 
            status: MoveStatus.HIT_SNAKE
        }
    }

    const ladder = board.ladders.find(ladder => ladder.bottom === newPosition)
    if(ladder) {
        return { 
            position: ladder.top, 
            status: MoveStatus.HIT_LADDER
        }
    }

    if(newPosition === board.spaces){
        return { 
            position: newPosition, 
            status: MoveStatus.WINNER
        }
    }
    
    if(newPosition > board.spaces){
        return {
            position: newPosition, 
            status: MoveStatus.NO_CHANGE
        }
    }

    return {
        position: newPosition, 
        status: MoveStatus.OK 
    }
}

class GameEngine {

    constructor(private gameState: IGameState){}

    movePlayer(playerId: number, spaces: number): MoveResult
    {
        const board: Board = this.gameState.getBoard()
        const player: Player = board.players.find(
                item => playerId === item.id
            )

        const currentPosition = player.token.position
        const newPosition = currentPosition + spaces;
        
        const {position, status} = getMoveResult(newPosition, board)

        if (status !== MoveStatus.NO_CHANGE) {
            player.token.position = position;
            this.gameState.updatePlayer(player)
        }
        
        return {
            status,
            player
        }
    }
}

export default GameEngine;