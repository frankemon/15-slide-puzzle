import React, { useEffect, useState } from "react";
import Board from "./components/Board";
import Button from "./components/Button";
import Modal from "./components/Modal";
import solvedImg from "./assets/solved.png";

// Constants for board and testing solved state for modal popup
const COLS = 5;
const SOLVED = false;

// Returns new array of randomized tiles by swapping elements at random indices
// Fisher-Yates shuffle algorithm (Stackoverflow), which is better than sort which I previously used
// Better in the sense of true randomness and unbiased results (sort is prone to bias but probably fine for this use case (small data set))
const randomizeTiles: (tiles: number[]) => number[] = (tiles) => {
  // Create a copy of the initial tiles array to avoid mutating original array
  const randomized = [...tiles];
  // Loop from last element to first element, decrementing by 1 each iteration
  for (let i = randomized.length - 1; i > 0; i--) {
    // Generate a random index between 0 and i (inclusive)
    const j = Math.floor(Math.random() * (i + 1));
    // Swap elements at indices i and j
    [randomized[i], randomized[j]] = [randomized[j], randomized[i]];
  }
  return randomized;
};

// Loop from 0 to tiles.length, if a tile is not in the correct position (i + 1), return false
// i + 1 because the tiles are 1-indexed
const checkIfSolved = (tiles: number[]) => {
  for (let i = 0; i < tiles.length - 1; i++) {
    if (tiles[i] !== i + 1) {
      return false;
    }
  }
  // Check if the last tile is 0
  return tiles[tiles.length - 1] === 0;
};

const saveScoreToLocalStorage = (score: number) => {
  const newScore = score;
  try {
    localStorage.setItem("previousScore", newScore.toString());
  } catch (error) {
    console.log("Failed to save score to localStorage", error);
  }
};

const App: React.FC = () => {
  // Initial state of tiles, including empty tile. Used for randomization and checking if puzzle is solved
  const [tiles, setTiles] = useState<number[]>([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 0,
  ]);
  // Track empty tile
  const [emptyTile, setEmptyTile] = useState<number>(0);
  const [showModal, setShowModal] = useState<{
    init: boolean;
    solved: boolean;
  }>({ init: true, solved: false });
  const [moveCount, setMoveCount] = useState<number>(0);
  const [previousScore, setPreviousScore] = useState<number>(0);
  const [isSolved, setIsSolved] = useState<boolean>(false);

  useEffect(() => {
    if (SOLVED) {
      // Set game to solved for testing and show modal
      setTiles(tiles);
      setEmptyTile(0);
      setShowModal({ init: false, solved: true });
    } else {
      // Normal game start with shallow copy of tiles array and randomize
      const shuffledTiles = randomizeTiles([...tiles]);
      setTiles(shuffledTiles);
    }
    getScoreFromLocalStorage();
  }, []);

  useEffect(() => {});

  // Randomize tiles and set empty tile to 0
  // Used in useEffect and button click
  const handleRandomize = () => {
    // Pass in initial tiles array and create new randomized array
    // This way we keep the initial array untouched and can re-use for reference or more randomizing
    const shuffledTiles = randomizeTiles([...tiles]);
    setTiles(shuffledTiles);
    setEmptyTile(0);
    setMoveCount(0);
    setIsSolved(false);
  };

  // Toggle modal visibility
  // Used in modal button click
  // Uses functional update instead of directly modifying state
  const handleShowModal = () => {
    setShowModal({ init: false, solved: false });
    saveScoreToLocalStorage(moveCount);
    setIsSolved(true);
  };

  // Play again button click from modal
  // Randomize tiles and set empty tile to 0 and toggles modal visibility
  // Uses functional update instead of directly modifying state
  const handlePlayAgain = () => {
    setTiles((prevTiles) => randomizeTiles([...prevTiles]));
    saveScoreToLocalStorage(moveCount);
    setShowModal({ init: false, solved: false });
    setMoveCount(0);
    setIsSolved(false);
    getScoreFromLocalStorage();
  };

  const getScoreFromLocalStorage = (): number | null => {
    try {
      const storedScore = localStorage.getItem("previousScore");
      if (storedScore) {
        // Parse to int because localStorage only takes strings
        setPreviousScore(parseInt(storedScore, 10));
      }
    } catch (error) {
      console.log("Failed to fetch score from localStorage", error);
    }
    return null;
  };

  const handleTileClick = (index: number): void => {
    if (isSolved) return;

    // Find index of empty tile in game tiles array
    const emptyTileIndex = tiles.indexOf(emptyTile);

    // Find row and column of empty tile
    const emptyTileRow = Math.floor(emptyTileIndex / COLS);
    const emptyTileCol = emptyTileIndex % COLS;

    // Find row and column of clicked tile
    const clickedTileRow = Math.floor(index / COLS);
    const clickedTileCol = index % COLS;

    // Check if clicked tile is next to empty tile, if not, do nothing
    if (clickedTileRow !== emptyTileRow && clickedTileCol !== emptyTileCol) {
      return;
    }

    // Make new array of game tiles
    const newTiles = [...tiles];

    // If both clicked and empty tile are in the same row, shift horizontally
    if (clickedTileRow === emptyTileRow) {
      if (clickedTileCol < emptyTileCol) {
        // Shift tiles right
        for (let col = emptyTileCol; col > clickedTileCol; col--) {
          newTiles[emptyTileRow * COLS + col] =
            newTiles[emptyTileRow * COLS + col - 1];
        }
      } else if (clickedTileCol > emptyTileCol) {
        // Shift tiles left
        for (let col = emptyTileCol; col < clickedTileCol; col++) {
          newTiles[emptyTileRow * COLS + col] =
            newTiles[emptyTileRow * COLS + col + 1];
        }
      }
      newTiles[emptyTileRow * COLS + clickedTileCol] = emptyTile;

      // If both clicked and empty tile are in the same column, shift vertically
    } else if (clickedTileCol === emptyTileCol) {
      if (clickedTileRow < emptyTileRow) {
        // Shift tiles down
        for (let row = emptyTileRow; row > clickedTileRow; row--) {
          newTiles[row * COLS + emptyTileCol] =
            newTiles[(row - 1) * COLS + emptyTileCol];
        }
      } else if (clickedTileRow > emptyTileRow) {
        // Shift tiles up
        for (let row = emptyTileRow; row < clickedTileRow; row++) {
          newTiles[row * COLS + emptyTileCol] =
            newTiles[(row + 1) * COLS + emptyTileCol];
        }
      }
      newTiles[clickedTileRow * COLS + emptyTileCol] = emptyTile;
    }

    // Set tiles to new array and set empty tile to clicked tile
    setTiles(newTiles);
    setEmptyTile(newTiles[index]);
    setMoveCount((prevCount) => {
      const newCount = prevCount + 1;

      if (checkIfSolved(newTiles)) {
        setShowModal({ init: false, solved: true });
        setIsSolved(true);
        saveScoreToLocalStorage(prevCount); // Pass the current move count
      }

      return newCount;
    });
  };

  return (
    <div className="flex items-center justify-center h-screen p-4">
      {showModal.init && (
        <Modal
          headline="Solve the puzzle"
          text={"Click single tiles, entire rows or parts of a row to move"}
          promptText="Good luck!"
          button="Got it"
          onClick={handleShowModal}
          imgSrc={solvedImg}
        />
      )}
      {showModal.solved && (
        <Modal
          headline="Great job!"
          promptText="Want to play again?"
          button="Yes"
          onClick={handlePlayAgain}
          closeText="No"
          onClose={handleShowModal}
          moveCount={moveCount}
        />
      )}
      <div className="flex flex-col space-y-4 w-full lg:w-1/2">
        <div className="flex justify-between items-center font-bold">
          <div>Previous score: {previousScore}</div>
          <div>Moves: {moveCount}</div>
        </div>
        <Board tiles={tiles} onTileClick={handleTileClick} cols={COLS} />
        <div className="flex items-center justify-center">
          <Button text={"Randomize"} onClick={handleRandomize} />
        </div>
      </div>
    </div>
  );
};

export default App;
