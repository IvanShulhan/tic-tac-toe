import React, { useState } from 'react';

const TicTacToe = () => {
    const [size, setSize] = useState(3); // Розмір гри
    const [board, setBoard] = useState(Array(3).fill(Array(3).fill('')));
    const [currentPlayer, setCurrentPlayer] = useState('X'); // Поточний гравець
    const [winner, setWinner] = useState(null);
    const [winningCells, setWinningCells] = useState(null); // Виграшні клітинки

    // Генерація порожньої дошки
    const generateBoard = (newSize) => {
        setBoard(Array(newSize).fill(Array(newSize).fill('')));
        setWinner(null);
        setWinningCells(null);
        setCurrentPlayer('X');
    };

    // Обробка кліку на клітинку
    const handleCellClick = (row, col) => {
        if (winner || board[row][col]) return;

        const updatedBoard = board.map((r, rIndex) =>
            rIndex === row ? r.map((c, cIndex) => (cIndex === col ? currentPlayer : c)) : r
        );
        setBoard(updatedBoard);

        const result = checkWinner(updatedBoard, currentPlayer);
        if (result.won) {
            setWinner(currentPlayer);
            setWinningCells(result.cells);
        } else {
            setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
        }
    };

    // Перевірка переможця
    const checkWinner = (board, player) => {
        const winLine = Array(size).fill(player);

        // Перевірка рядків
        for (let row = 0; row < size; row++) {
            if (board[row].every(cell => cell === player)) {
                return { won: true, cells: board[row].map((_, col) => [row, col]) };
            }
        }

        // Перевірка стовпців
        for (let col = 0; col < size; col++) {
            if (board.every(row => row[col] === player)) {
                return { won: true, cells: board.map((_, row) => [row, col]) };
            }
        }

        // Перевірка головної діагоналі
        if (board.every((_, i) => board[i][i] === player)) {
            return { won: true, cells: board.map((_, i) => [i, i]) };
        }

        // Перевірка побічної діагоналі
        if (board.every((_, i) => board[i][size - 1 - i] === player)) {
            return {
                won: true,
                cells: board.map((_, i) => [i, size - 1 - i]),
            };
        }

        return { won: false, cells: [] };
    };

    // Перезапуск гри (з тим самим розміром)
    const resetGame = () => {
        generateBoard(size);
    };

    const changeBoardSize = (e) => {
        const newSize = Math.max(3, parseInt(e.target.value) || 3);
        setSize(newSize);
        generateBoard(newSize);
    }

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Tic Tac Toe</h1>

            <div style={styles.controls}>
                <label style={styles.label}>
                    Board Size:
                    <input
                        type="number"
                        min="3"
                        max="8"
                        value={size}
                        onChange={changeBoardSize}
                        style={styles.input}
                    />
                </label>
                <button onClick={resetGame} style={styles.button}>
                    {winner ? 'Play Again' : 'Restart Game'}
                </button>
            </div>

            <div
                style={{
                    ...styles.board,
                    gridTemplateColumns: `repeat(${size}, 1fr)`,
                }}
            >
                {board.map((row, rowIndex) =>
                    row.map((cell, colIndex) => {
                        const isWinningCell =
                            winningCells?.some(([r, c]) => r === rowIndex && c === colIndex) || false;

                        return (
                            <button
                                key={`${rowIndex}-${colIndex}`}
                                onClick={() => handleCellClick(rowIndex, colIndex)}
                                style={{
                                    ...styles.cell,
                                    backgroundColor: isWinningCell ? '#d4edda' : 'white',
                                    color: isWinningCell ? '#155724' : '#333',
                                }}
                            >
                                {cell}
                            </button>
                        );
                    })
                )}
            </div>

            {winner && (
                <h2 style={styles.winner}>
                    Winner: <span style={{ color: '#28a745' }}>{winner}</span>!
                </h2>
            )}
            {!winner && <h2 style={styles.currentPlayer}>Current Player: {currentPlayer}</h2>}
        </div>
    );
};

const styles = {
    container: {
        textAlign: 'center',
        padding: '20px',
        fontFamily: '"Arial", sans-serif',
    },
    title: {
        fontSize: '2.5rem',
        marginBottom: '20px',
        color: '#007bff',
    },
    controls: {
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
    },
    label: {
        fontSize: '1.2rem',
    },
    input: {
        fontSize: '1rem',
        padding: '5px',
        marginLeft: '10px',
        width: '60px',
        textAlign: 'center',
        border: '1px solid #ced4da',
        borderRadius: '4px',
    },
    button: {
        padding: '10px 20px',
        fontSize: '1rem',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    board: {
        margin: '20px auto',
        display: 'grid',
        gap: '5px',
        maxWidth: 'max-content',
    },
    cell: {
        width: '60px',
        height: '60px',
        fontSize: '24px',
        fontWeight: 'bold',
        cursor: 'pointer',
        border: '2px solid #dee2e6',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background-color 0.3s, color 0.3s',
    },
    winner: {
        fontSize: '1.5rem',
        color: '#333',
        marginTop: '20px',
    },
    currentPlayer: {
        fontSize: '1.2rem',
        color: '#6c757d',
    },
};

export default TicTacToe;
