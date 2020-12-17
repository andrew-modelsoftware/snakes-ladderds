import Board from "./DomainObjects/Board";
import BoardObsticle from "./DomainObjects/BoardObsticle";
import Player from "./DomainObjects/Player";
import IGameState from "./IGameState";

class GameState implements IGameState {
    
    private players: {
        [id: number]: Player
    } = {}

    constructor(
        numberOfPlayers: number, 
        private ladders: Array<BoardObsticle>, 
        private snakes: Array<BoardObsticle>,
        private spaces: number = 100
    ){
        for(let i = 1; i <= numberOfPlayers; i++){
            this.players[i] = {
                id: i,
                token: {
                    position: 1
                }
            }
        }
    }

    getBoard(): Board {
        return {
            ladders: this.ladders,
            players: this.getPlayersList(),
            snakes: this.snakes,
            spaces: this.spaces
        }
    }


    updatePlayer({id, token}: Player): void {
        this.players[id] = {
            id,
            token: {
                position: token.position
            }
        }
    }

    private getPlayersList(): Array<Player> {
        const playerList: Array<Player> = []

        Object.values(this.players)
            .forEach( ({id, token}: Player) => {
                
                const playerClone: Player = {
                    id,
                    token: {
                        position: token.position
                    }
                }

            playerList.push(playerClone)
        })


        return playerList
    }
}

export default GameState
