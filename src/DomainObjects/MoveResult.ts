import Player from './Player'
import MoveStatus from './MoveStatus'

type MoveResult = {
    status: MoveStatus;
    player: Player;
};

export default MoveResult