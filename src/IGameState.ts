import Board from "./DomainObjects/Board";
import Player from "./DomainObjects/Player";

export default interface IGameState {
    getBoard: () => Board;
    updatePlayer: (player: Player) => void;
}
