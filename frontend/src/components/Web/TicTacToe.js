import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './TicTacToe.css';
import FeedbackForm from '../Feedbaackform'; // Ensure this path is correct

const TicTacToe = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const [isPlayingWithComputer, setIsPlayingWithComputer] = useState(false);
    const [playerNames, setPlayerNames] = useState({ X: '', O: '' });
    const [scores, setScores] = useState({ X: 0, O: 0, Draws: 0 });
    const [inputNamesVisible, setInputNamesVisible] = useState(false);
    const [playerInput, setPlayerInput] = useState('');
    const [highlightedInputs, setHighlightedInputs] = useState({ X: false, O: false }); // For highlighting inputs
    const navigate = useNavigate();
    const cheerEmoji = '\uD83D\uDC4F';

  
    useEffect(() => {
        const storedScores = JSON.parse(localStorage.getItem('tic-tac-toe-scores'));
        if (storedScores) {
            setScores(storedScores);
        }
    }, []);

    useEffect(() => {
        if (isPlayingWithComputer && !isXNext && !calculateWinner(board).length) {
            const timer = setTimeout(makeComputerMove, 500);
            return () => clearTimeout(timer);
        }
    }, [board, isXNext, isPlayingWithComputer]);

    const handleClick = (index) => {
        const newBoard = board.slice();
        if (calculateWinner(board).length || board[index]) return;
        newBoard[index] = isXNext ? 'X' : 'O';
        setBoard(newBoard);
        setIsXNext(!isXNext);
    };

    const handleBackToHome = () => {
        navigate('/'); // Adjust the route as needed
    };

    const makeComputerMove = () => {
        const availableMoves = board.map((val, index) => (val === null ? index : null)).filter(val => val !== null);
        const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
        handleClick(randomMove);
    };

    const handleReplayClick = () => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
        setHighlightedInputs({ X: false, O: false }); // Reset input highlights
    };

    const handleFeedbackClick = () => {
        navigate('/FeedbackForm');
    };

    const handlePlayWithFriendClick = () => {
        setInputNamesVisible(true);
        setIsPlayingWithComputer(false);
    };

    const handlePlayWithComputerClick = () => {
        setInputNamesVisible(true);
        setIsPlayingWithComputer(true);
    };

    const handleViewScoresClick = () => {
        alert(`Scores:\n${playerNames.X || 'Player 1'}: ${scores.X}\n${playerNames.O || 'Player 2'}: ${scores.O}\nDraws: ${scores.Draws}:${String.fromCodePoint(0x1F3C6)}`);
    };

    const handleNameChange = (event, player) => {
        setPlayerNames({
            ...playerNames,
            [player]: event.target.value
        });
    };

    const handleInputChange = (event) => {
        setPlayerInput(event.target.value);
    };

    const handleStartGame = () => {
        if (isPlayingWithComputer) {
            if (playerInput) {
                setPlayerNames({ X: playerInput, O: 'Computer' });
                setInputNamesVisible(false);
                handleReplayClick();
            } else {
                alert('Please enter your name.');
            }
        } else {
            if (playerNames.X && playerNames.O) {
                setInputNamesVisible(false);
                handleReplayClick();
            } else {
                alert('Please enter names for both players.');
            }
        }
    };

    const winnerLine = calculateWinner(board);
    const winner = winnerLine.length ? board[winnerLine[0]] : null;
    const isDraw = !winner && board.every(square => square !== null);

    useEffect(() => {
        if (winner || isDraw) {
            let updatedScores = { ...scores };
            if (winner) {
                updatedScores[winner]++;
                setHighlightedInputs({
                    X: winner === 'X',
                    O: winner === 'O'
                }); // Highlight the winning input
            } else if (isDraw) {
                updatedScores.Draws++;
            }
            setScores(updatedScores);
            localStorage.setItem('tic-tac-toe-scores', JSON.stringify(updatedScores));
        }
    }, [winner, isDraw]);

    let status;
    if (winner) {
        status = 'Winner: ' + (playerNames[winner] || winner)+String.fromCodePoint(0x1F3C6);
    } else if (isDraw) {
        status = 'It\'s a Draw!'+ cheerEmoji  ;
        
    } else {
        status = 'Next player: ' + (isXNext ? playerNames.X || 'Player 1' : playerNames.O || 'Player 2');
    }

    const renderSquare = (i) => {
        const isWinningSquare = winnerLine.includes(i);
        const cellClass = board[i] === 'X' ? 'cell green' : 'cell red';
        return (
            <button
                className={`${cellClass} ${isWinningSquare ? 'winning-square' : ''}`}
                onClick={() => handleClick(i)}
            >
                {board[i]}
            </button>
        );
    };

    return (
        <div className="container1">
            <div className="marquee">Tic Tac Toe</div>

            <div className="button-group">
                <button onClick={handlePlayWithFriendClick} className="action-button">Play with Friend</button>
                <button onClick={handlePlayWithComputerClick} className="action-button">Play with Computer</button>
                <button onClick={handleViewScoresClick} className="action-button">View Scores</button>
                <button onClick={handleFeedbackClick} className="action-button">Give Feedback</button>
                <button onClick={handleBackToHome} className="action-button">Back to Home</button>
            </div>

            {inputNamesVisible && (
                <div className="player-name-inputs">
                    {isPlayingWithComputer ? (
                        <div>
                            <label htmlFor="playerInput">Your Name:</label>
                            <input
                                id="playerInput"
                                type="text"
                                value={playerInput}
                                onChange={handleInputChange}
                                placeholder="Enter your name"
                            />
                        </div>
                    ) : (
                        <>
                            <div className={highlightedInputs.X ? 'highlight-input' : ''}>
                                <label htmlFor="playerX">Player X Name:</label>
                                <input
                                    id="playerX"
                                    type="text"
                                    value={playerNames.X}
                                    onChange={(e) => handleNameChange(e, 'X')}
                                    placeholder="Enter name for Player X"
                                />
                            </div>
                            <div className={highlightedInputs.O ? 'highlight-input' : ''}>
                                <label htmlFor="playerO">Player O Name:</label>
                                <input
                                    id="playerO"
                                    type="text"
                                    value={playerNames.O}
                                    onChange={(e) => handleNameChange(e, 'O')}
                                    placeholder="Enter name for Player O"
                                />
                            </div>
                        </>
                    )}
                    <button onClick={handleStartGame} className="start-button">Start Game</button>
                </div>
            )}

            {!inputNamesVisible && (
                <div className="game-board">
                    <div className={`message ${winner ? 'winner-box' : isDraw ? 'draw-box' : ''}`}>{status}</div>
                    <div className="board">
                        {renderSquare(0)}
                        {renderSquare(1)}
                        {renderSquare(2)}
                        {renderSquare(3)}
                        {renderSquare(4)}
                        {renderSquare(5)}
                        {renderSquare(6)}
                        {renderSquare(7)}
                        {renderSquare(8)}
                    </div>
                    <button onClick={handleReplayClick} className="replay-button">Replay</button>
                </div>
            )}
        </div>
    );
};

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return [a, b, c];
        }
    }
    return [];
}

export default TicTacToe;
