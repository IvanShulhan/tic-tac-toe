import {FC} from "react";

type BoardCellProps = {
    cell: string;
    rowIndex: number;
    colIndex: number;
    isWinningCell: boolean;
    handleCellClick: (row: number, col: number) => void;
}

export const BoardCell: FC<BoardCellProps> = ({ cell, rowIndex, colIndex, isWinningCell, handleCellClick }) =>
    <button
        key={`${rowIndex}-${colIndex}`}
        onClick={() => handleCellClick(rowIndex, colIndex)}
        className={`cell ${isWinningCell ? 'winning-cell' : ''}`}
    >
        {cell}
    </button>