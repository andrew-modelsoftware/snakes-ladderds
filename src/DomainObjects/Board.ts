import BoardObsticle from "./BoardObsticle";
import Player from "./Player";

type Board = {
    players: Array<Player>;
    spaces: number;
    snakes: Array<BoardObsticle>;
    ladders: Array<BoardObsticle>;
};

export default Board