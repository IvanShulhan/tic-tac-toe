import {Player} from "./TickTacToe";
import {FC} from "react";

type GameStatusProps = {
    winner: Player | null;
    currentPlayer: Player;
}

export const GameStatus: FC<GameStatusProps> = ({ winner, currentPlayer }) => (
    <>
        {winner ?
            (
                <h2 className="winner">
                    Winner: <span>{winner}</span>!
                </h2>
            ) : (
                <h2 className="current-player">Current Player: {currentPlayer}</h2>
            )
        }
    </>
)