import Board from "./DomainObjects/Board";
import BoardObsticle from "./DomainObjects/BoardObsticle";
import MoveStatus from "./DomainObjects/MoveStatus";
import Player from "./DomainObjects/Player";
import GameEngine from "./GameEngine";
import IGameState from "./IGameState";

describe('GameEngine', () => {
    
    describe('movePlayer', () => {
        
        it(`finds the player from the game state, 
        adds the number of spaces to the token
        updates state and returns the move result`, () => {
            // Arrange
            const playerId: number = 2;
            const spaces: number = 3;

            const player1: Player = {
                id: 1,
                token: {
                    position: 1
                }
            } 
            const player2: Player = {
                id: 2,
                token: {
                    position: 1
                }
            } 
            const board: Board = {
                players: [player1, player2],
                spaces: 100,
                snakes: [],
                ladders: []
            }

            const gameState: IGameState = {
                getBoard: jest.fn().mockReturnValue(board),
                updatePlayer: jest.fn()
            }

            const gameEngine = new GameEngine(gameState)

            // Act
            const result = gameEngine.movePlayer(playerId, spaces)

            // Assert
            expect(gameState.getBoard).toHaveBeenCalled();
            const updatedPlayer: Player = {
                id: playerId,
                token: {
                    position: 4
                }
            }
            expect(gameState.updatePlayer).toHaveBeenCalledWith(updatedPlayer)

            expect(result).toEqual({
                status: MoveStatus.OK,
                player: updatedPlayer
            })
        })

        it(`returns the result status is WINNER, 
            if the tokens new position equal to the number of board spaces`, ()=>{
            // Arrange
            const playerId: number = 1;
            const spaces: number = 3;

            const player1: Player = {
                id: 1,
                token: {
                    position: 97
                }
            }
            const board: Board = {
                players: [player1],
                spaces: 100,
                snakes: [],
                ladders: []
            }

            const gameState: IGameState = {
                getBoard: jest.fn().mockReturnValue(board),
                updatePlayer: jest.fn()
            }

            const gameEngine = new GameEngine(gameState)

            // Act
            const result = gameEngine.movePlayer(playerId, spaces)

            // Assert
            const updatedPlayer: Player = {
                id: playerId,
                token: {
                    position: 100
                }
            }
            expect(gameState.updatePlayer).toHaveBeenCalledWith(updatedPlayer)

            expect(result).toEqual({
                status: MoveStatus.WINNER,
                player: updatedPlayer
            })
        })

        it(`returns the result status is NO_CHANGE,
        if the tokens new position is greater than board spaces  
        and the board is not updated`, () => {
            // Arrange
            const playerId: number = 1;
            const spaces: number = 4;

            const player1: Player = {
                id: 1,
                token: {
                    position: 97
                }
            }
            const board: Board = {
                players: [player1],
                spaces: 100,
                snakes:[],
                ladders: []
            }

            const gameState:IGameState = {
                getBoard: jest.fn().mockReturnValue(board),
                updatePlayer: jest.fn()
            }

            const gameEngine = new GameEngine(gameState)

            // Act
            const result = gameEngine.movePlayer(playerId, spaces)

            // Assert
            expect(gameState.updatePlayer).not.toHaveBeenCalled()

            expect(result).toEqual({
                status: MoveStatus.NO_CHANGE,
                player: player1
            })
        })

        it(`returns the result status is HIT_SNAKE 
        and moves the players token to the bottom of the snake,
        if there is the top of a snake on the tokens new position 
        and the board is updated`, () => {
            // Arrange
            const playerId: number = 1;
            const spaces: number = 3;

            const player1: Player = {
                id: 1,
                token: {
                    position: 73
                }
            }

            const snake1: BoardObsticle = {
                top: 36,
                bottom: 23
            }
            
            const snake2: BoardObsticle = {
                top: 76,
                bottom: 59
            }
            const board: Board = {
                players: [player1],
                snakes: [snake1, snake2],
                ladders: [],
                spaces: 100
            }

            const gameState: IGameState = {
                getBoard: jest.fn().mockReturnValue(board),
                updatePlayer: jest.fn()
            }

            const gameEngine = new GameEngine(gameState)

            // Act
            const result = gameEngine.movePlayer(playerId, spaces)

            // Assert
            const updatedPlayer: Player = {
                id: playerId,
                token: {
                    position: snake2.bottom
                }
            }
            expect(gameState.updatePlayer).toHaveBeenCalledWith(updatedPlayer)

            expect(result).toEqual({
                status: MoveStatus.HIT_SNAKE,
                player: updatedPlayer
            })
        })

        it(`returns the result status is OK 
        and moves the players token number of spaces,
        if there is the bottom of a snake on the tokens new position 
        and the board is updated`, () => {
            // Arrange
            const playerId: number = 1;
            const spaces: number = 3;

            const player1: Player = {
                id: 1,
                token: {
                    position: 20
                }
            }

            const snake1: BoardObsticle = {
                top: 36,
                bottom: 23
            }
            
            const snake2: BoardObsticle = {
                top: 76,
                bottom: 59
            }
            const board: Board = {
                players: [player1],
                snakes: [snake1, snake2],
                ladders: [],
                spaces: 100
            }

            const gameState: IGameState = {
                getBoard: jest.fn().mockReturnValue(board),
                updatePlayer: jest.fn()
            }

            const gameEngine = new GameEngine(gameState)

            // Act
            const result = gameEngine.movePlayer(playerId, spaces)

            // Assert
            const updatedPlayer: Player = {
                id: playerId,
                token: {
                    position: snake1.bottom
                }
            }
            expect(gameState.updatePlayer).toHaveBeenCalledWith(updatedPlayer)

            expect(result).toEqual({
                status: MoveStatus.OK,
                player: updatedPlayer
            })
        })

        it(`returns the result status is HIT_LADDER 
        and moves the players token to the top of the ladder,
        if there is the bottom of a ladder on the tokens new position 
        and the board is updated`, () => {
            // Arrange
            const playerId: number = 1;
            const spaces: number = 3;

            const player1: Player = {
                id: 1,
                token: {
                    position: 56
                }
            }

            const ladder1: BoardObsticle = {
                top: 36,
                bottom: 23
            }
            
            const ladder2: BoardObsticle = {
                top: 76,
                bottom: 59
            }
            const board: Board = {
                players: [player1],
                snakes: [],
                ladders: [ladder1, ladder2],
                spaces: 100
            }

            const gameState: IGameState = {
                getBoard: jest.fn().mockReturnValue(board),
                updatePlayer: jest.fn()
            }

            const gameEngine = new GameEngine(gameState)

            // Act
            const result = gameEngine.movePlayer(playerId, spaces)

            // Assert
            const updatedPlayer: Player = {
                id: playerId,
                token: {
                    position: ladder2.top
                }
            }
            expect(gameState.updatePlayer).toHaveBeenCalledWith(updatedPlayer)

            expect(result).toEqual({
                status: MoveStatus.HIT_LADDER,
                player: updatedPlayer
            })
        })

        it(`returns the result status is OK 
        and moves the players token number of spaces,
        if there is the top of a ladder on the tokens new position 
        and the board is updated`, () => {
            // Arrange
            const playerId: number = 1;
            const spaces: number = 3;

            const player1: Player = {
                id: 1,
                token: {
                    position: 33
                }
            }

            const ladder1: BoardObsticle = {
                top: 36,
                bottom: 23
            }
            
            const ladder2: BoardObsticle = {
                top: 76,
                bottom: 59
            }
            const board: Board = {
                players: [player1],
                snakes: [],
                ladders: [ladder1, ladder2],
                spaces: 100
            }

            const gameState: IGameState = {
                getBoard: jest.fn().mockReturnValue(board),
                updatePlayer: jest.fn()
            }

            const gameEngine = new GameEngine(gameState)

            // Act
            const result = gameEngine.movePlayer(playerId, spaces)

            // Assert
            const updatedPlayer: Player = {
                id: playerId,
                token: {
                    position: 36
                }
            }
            expect(gameState.updatePlayer).toHaveBeenCalledWith(updatedPlayer)

            expect(result).toEqual({
                status: MoveStatus.OK,
                player: updatedPlayer
            })
        })
        
    })
})