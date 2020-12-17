import BoardObsticle from "./DomainObjects/BoardObsticle";
import GameState from "./GameState";
import IGameState from "./IGameState";

describe('GameState', () => {
    
    describe('getBoard', () => {
        
        it(`returns a new board 
        with the number of players,
        sets the players tokens at position 1,
        and adds the snakes and ladders provided,
        if no updates have been made`, () => {
            // Arrange
            const numberOfPlayers: number = 2;
            const ladder: BoardObsticle = {
                top: 36,
                bottom: 23
            }
            const ladders: Array<BoardObsticle> = [ladder]

            const snake: BoardObsticle = {
                top: 86,
                bottom: 54
            }
            const snakes: Array<BoardObsticle> = [snake]
 
            const gameState: IGameState = new GameState(numberOfPlayers, ladders, snakes)

            // Act
            const result = gameState.getBoard()
            
            // Assert
            expect(result.players).toHaveLength(2)
            
            const [player1, player2] = result.players;
            expect(player1.token.position).toEqual(1);
            expect(player2.token.position).toEqual(1);

            expect(result.ladders).toHaveLength(1)
            const [boardLadder] = result.ladders;
            expect(boardLadder).toEqual(ladder)

            expect(result.snakes).toHaveLength(1)
            const [boardSnake] = result.snakes;
            expect(boardSnake).toEqual(snake)
        })

        it(`returns a new board 
         with updated players after update player has been called`, () => {
            // Arrange
            const numberOfPlayers: number = 2;
            const ladder: BoardObsticle = {
                top: 36,
                bottom: 23
            }
            const ladders: Array<BoardObsticle> = [ladder]

            const snake: BoardObsticle = {
                top: 86,
                bottom: 54
            }
            const snakes: Array<BoardObsticle> = [snake]
 
            const gameState: IGameState = new GameState(numberOfPlayers, ladders, snakes)
            
            const board = gameState.getBoard()
            const [playerToUpdate] = board.players
            playerToUpdate.token.position = 5
            gameState.updatePlayer(playerToUpdate)

            // Act
            const result = gameState.getBoard()
            
            // Assert
            const [updatedPlayer] = result.players;
            expect(updatedPlayer).toEqual(playerToUpdate)
        }) 

        it(`returns new instances of player objects 
        to prevent mutation of state without calling update`, ()=>{
            const numberOfPlayers: number = 2;
            const ladder: BoardObsticle = {
                top: 36,
                bottom: 23
            }
            const ladders: Array<BoardObsticle> = [ladder]

            const snake: BoardObsticle = {
                top: 86,
                bottom: 54
            }
            const snakes: Array<BoardObsticle> = [snake]
 
            const gameState: IGameState = new GameState(numberOfPlayers, ladders, snakes)
            
            const board = gameState.getBoard()
            const [playerToUpdate] = board.players
            playerToUpdate.token.position = 5

            // Act
            const result = gameState.getBoard()
            
            // Assert
            const [updatedPlayer] = result.players;
            expect(updatedPlayer).not.toEqual(playerToUpdate)
        })
    })
})