import {ChangeEvent, FC} from "react";
import {Button} from "./Button";
import {MAX_SIZE, MIN_SIZE, Player} from "./TickTacToe";

type ActionBlockProps = {
    size: number;
    onChangeSize: (e: ChangeEvent<HTMLInputElement>) => void;
    isComputerPlayer: boolean;
    onChangePlayMode: (e: ChangeEvent<HTMLInputElement>) => void;
    resetGame: () => void;
    winner: Player | null;
}

export const ActionBlock: FC<ActionBlockProps> = ({
    size,
    onChangeSize,
    isComputerPlayer,
    onChangePlayMode,
    resetGame,
    winner
}) => (
    <div className="controls">
        <label className="label">
            Board Size:
            <input
                type="number"
                min={MIN_SIZE}
                max={MAX_SIZE}
                value={size}
                onChange={onChangeSize}
                className="input"
            />
        </label>
        <label className="label">
            <input
                type="checkbox"
                checked={isComputerPlayer}
                onChange={onChangePlayMode}
            />
            Play against Computer
        </label>
        <Button onClick={resetGame}>{winner ? 'Play Again' : 'Restart Game'}</Button>
    </div>
)