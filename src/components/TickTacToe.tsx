import {useState, useEffect, useRef, FC, useCallback, ChangeEvent} from 'react';
import { checkWinner, getAvailableCells } from "../utils/utils";
import {Board} from "./Board";
import {GameStatus} from "./Winner";
import {ActionBlock} from "./ActionBlock";

export type BoardStructure = string[][];
export type WinningCells = number[][] | null;
export type Player = 'X' | 'O';

export const MAX_SIZE = 8;
export const MIN_SIZE = 3;

export const TicTacToe: FC = () => {
    const [size, setSize] = useState<number>(3);
    const [board, setBoard] = useState<BoardStructure>(Array(3).fill(Array(3).fill('')));
    const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
    const [isComputerPlayer, setIsComputerPlayer] = useState<boolean>(true);
    const [winner, setWinner] = useState<Player | null>(null);
    const [winningCells, setWinningCells] = useState<WinningCells>(null);
    const computerTurnRef = useRef<boolean>(false);

    const generateBoard = (newSize: number) => {
        setBoard(Array(newSize).fill(Array(newSize).fill('')));
        setWinner(null);
        setWinningCells(null);
        setCurrentPlayer('X');
        computerTurnRef.current = false;
    };

    const handleCellClick = useCallback((row: number, col: number): void => {
        if (winner || board[row][col]) return;

        const updatedBoard = board.map((r, rIndex) =>
            rIndex === row ? r.map((c, cIndex) => (cIndex === col ? currentPlayer : c)) : r
        );
        setBoard(updatedBoard);

        const result = checkWinner(updatedBoard, currentPlayer, size);
        if (result.won) {
            setWinner(currentPlayer);
            setWinningCells(result.cells);
        } else {
            const nextPlayer = currentPlayer === 'X' ? 'O' : 'X';
            setCurrentPlayer(nextPlayer);

            if (isComputerPlayer && nextPlayer === 'O') {
                computerTurnRef.current = true;
            }
        }
    }, [board, currentPlayer, isComputerPlayer, size, winner]);

    const computerMove = useCallback((): void => {
        if (winner) return;

        const availableCells = getAvailableCells(board);
        if (availableCells.length === 0) return;

        const [row, col] = availableCells[Math.floor(Math.random() * availableCells.length)];
        handleCellClick(row, col);
    }, [board, handleCellClick, winner]);

    useEffect(() => {
        if (isComputerPlayer && currentPlayer === 'O' && computerTurnRef.current) {
            setTimeout(() => {
                computerMove();
                computerTurnRef.current = false;
            }, 500);
        }
    }, [currentPlayer, isComputerPlayer, board, winner, computerMove]);

    const resetGame = (): void => {
        generateBoard(size);
    };

    const handleChangePlayMode = (e: ChangeEvent<HTMLInputElement>) => {
        setIsComputerPlayer(e.target.checked)
    }

    const handleChangeSize = (e: ChangeEvent<HTMLInputElement>) => {
        const newSize = Math.min(Math.max(MIN_SIZE, parseInt(e.target.value) || MIN_SIZE), MAX_SIZE);
        setSize(newSize);
        generateBoard(newSize);
    }

    return (
        <div className="container">
            <h1 className="title">Tic Tac Toe</h1>
            <ActionBlock
                size={size}
                onChangeSize={handleChangeSize}
                isComputerPlayer={isComputerPlayer}
                onChangePlayMode={handleChangePlayMode}
                resetGame={resetGame}
                winner={winner}
            />
            <Board
                size={size}
                board={board}
                winningCells={winningCells}
                handleCellClick={handleCellClick}
            />
            <GameStatus winner={winner} currentPlayer={currentPlayer} />
        </div>
    );
};
