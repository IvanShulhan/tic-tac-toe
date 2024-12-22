import { BoardStructure, WinningCells } from "./TickTacToe";
import { FC } from "react";
import { BoardCell } from "./BoardCell";

type BoardProps = {
    size: number;
    board: BoardStructure;
    winningCells: WinningCells;
    handleCellClick: (row: number, col: number) => void;
};

export const Board: FC<BoardProps> = ({ size, board, winningCells, handleCellClick }) => (
    <div
        className="board"
        style={{
            display: "grid",
            gridTemplateColumns: `repeat(${size}, 1fr)`,
        }}
    >
        {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
                const isWinningCell = winningCells?.some(
                    ([r, c]) => r === rowIndex && c === colIndex
                );

                return (
                    <BoardCell
                        key={`${rowIndex}-${colIndex}`}
                        cell={cell}
                        rowIndex={rowIndex}
                        colIndex={colIndex}
                        isWinningCell={isWinningCell || false}
                        handleCellClick={handleCellClick}
                    />
                );
            })
        )}
    </div>
);
