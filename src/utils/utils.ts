import {Player} from "../components/TickTacToe";

export const checkWinner = (board: string[][], player: Player, size: number): { won: boolean, cells: number[][] } => {
    for (let row = 0; row < size; row++) {
        if (board[row].every(cell => cell === player)) {
            return { won: true, cells: board[row].map((_, col) => [row, col]) };
        }
    }

    for (let col = 0; col < size; col++) {
        if (board.every(row => row[col] === player)) {
            return { won: true, cells: board.map((_, row) => [row, col]) };
        }
    }

    if (board.every((_, i) => board[i][i] === player)) {
        return { won: true, cells: board.map((_, i) => [i, i]) };
    }

    if (board.every((_, i) => board[i][size - 1 - i] === player)) {
        return {
            won: true,
            cells: board.map((_, i) => [i, size - 1 - i]),
        };
    }

    return { won: false, cells: [] };
};

export const getAvailableCells = (board: string[][]): [number, number][] => {
    const cells: [number, number][]  = [];
    board.forEach((row, rowIndex) =>
        row.forEach((cell, colIndex) => {
            if (!cell) cells.push([rowIndex, colIndex]);
        })
    );
    return cells;
};