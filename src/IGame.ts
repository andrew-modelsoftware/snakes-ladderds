import Board from "./DomainObjects/Board";
import MoveResult from "./DomainObjects/MoveResult";
import Player from "./DomainObjects/Player";

/**
 * @todo
 * Implement Public interface for game library
 */
interface IGame {
    
    /**
     * @todo
     * calls roll dice for each player
     * determines if there is a winner
     * returns the result
     */
    rollDiceToStart(): {
        results:  Array<{
            player:Player, 
            diceRoll: number
        }>, 
        starter: Player | null
    }

    /**
     * @todo 
     * returns next player 
     * or null if the first player has not been choosen
     */
    getNextPlayer(): Player | null

    /**
     * @todo
     * returns a random number using the dice object
     */
    rollDice(): number
    
    /**
     * @todo
     * calls the game engne to eveluate the move and update state
     * returns the result of the move
     */
    movePlayer(playerId:number, spaces: number): MoveResult

    /**
     * @todo
     * returns the current board object from game state
     */
    getBoardState(): Board

    /**
     * @todo
     * low level accessor to get player by ID
     * returns a clone of the player to prevent state mutation
     */
    getPlayer(playerId:number): Player
}

export default IGame