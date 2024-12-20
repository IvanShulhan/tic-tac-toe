import React, { useState, useEffect, useRef } from 'react';
import '../styles/TicTacToe.css';
import {checkWinner, getAvailableCells} from "../utils/utils";

const TicTacToe = () => {
    const [size, setSize] = useState(3);
    const [board, setBoard] = useState(Array(3).fill(Array(3).fill('')));
    const [currentPlayer, setCurrentPlayer] = useState('X');
    const [isComputerPlayer, setIsComputerPlayer] = useState(true);
    const [winner, setWinner] = useState(null);
    const [winningCells, setWinningCells] = useState(null);
    const computerTurnRef = useRef(false);

    const generateBoard = (newSize) => {
        setBoard(Array(newSize).fill(Array(newSize).fill('')));
        setWinner(null);
        setWinningCells(null);
        setCurrentPlayer('X');
        computerTurnRef.current = false;
    };

    const computerMove = () => {
        if (winner) return;

        const availableCells = getAvailableCells(board);
        if (availableCells.length === 0) return;

        const [row, col] = availableCells[Math.floor(Math.random() * availableCells.length)];
        handleCellClick(row, col);
    };

    const handleCellClick = (row, col) => {
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
                computerTurnRef.current = true; // Встановлюємо флаг, що комп'ютер може ходити
            }
        }
    };

    useEffect(() => {
        if (isComputerPlayer && currentPlayer === 'O' && computerTurnRef.current) {
            setTimeout(() => {
                computerMove();
                computerTurnRef.current = false;
            }, 500);
        }
    }, [currentPlayer, isComputerPlayer, board, winner]);

    const resetGame = () => {
        generateBoard(size);
    };

    return (
        <div className="container">
            <h1 className="title">Tic Tac Toe</h1>

            <div className="controls">
                <label className="label">
                    Board Size:
                    <input
                        type="number"
                        min="3"
                        value={size}
                        onChange={(e) => {
                            const newSize = Math.max(3, parseInt(e.target.value) || 3);
                            setSize(newSize);
                            generateBoard(newSize);
                        }}
                        className="input"
                    />
                </label>
                <label className="label">
                    <input
                        type="checkbox"
                        checked={isComputerPlayer}
                        onChange={(e) => setIsComputerPlayer(e.target.checked)}
                    />
                    Play against Computer
                </label>
                <button onClick={resetGame} className="button">
                    {winner ? 'Play Again' : 'Restart Game'}
                </button>
            </div>

            <div
                className="board"
                style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
            >
                {board.map((row, rowIndex) =>
                    row.map((cell, colIndex) => {
                        const isWinningCell =
                            winningCells?.some(([r, c]) => r === rowIndex && c === colIndex) || false;

                        return (
                            <button
                                key={`${rowIndex}-${colIndex}`}
                                onClick={() => handleCellClick(rowIndex, colIndex)}
                                className={`cell ${isWinningCell ? 'winning-cell' : ''}`}
                            >
                                {cell}
                            </button>
                        );
                    })
                )}
            </div>

            {winner && (
                <h2 className="winner">
                    Winner: <span>{winner}</span>!
                </h2>
            )}
            {!winner && <h2 className="current-player">Current Player: {currentPlayer}</h2>}
        </div>
    );
};

export default TicTacToe;
