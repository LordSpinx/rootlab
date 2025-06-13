import React, { useState, useEffect } from "react";

function RootGame() {
  const [number, setNumber] = useState(null);
  const [correctRoot, setCorrectRoot] = useState("");
  const [userInput, setUserInput] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highscore, setHighscore] = useState(0);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const randomNum = Math.floor(Math.random() * 500) + 1;
    const root = Math.sqrt(randomNum).toFixed(5);
    setNumber(randomNum);
    setCorrectRoot(root);
    setUserInput("");
    setGameOver(false);
    setScore(0);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setUserInput(value);

    if (!value.includes(".")) return; // Noch keine Nachkommastellen

    if (correctRoot.startsWith(value)) {
      const correctChars = value.length - correctRoot.indexOf(".") - 1;
      setScore(correctChars); // Punkte = korrekt eingegebene Nachkommastellen
    } else {
      setGameOver(true);
      if (score > highscore) {
        setHighscore(score);
      }
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto text-center">
      <p className="mb-2 text-lg">Highscore: {highscore}</p>
      {number && !gameOver ? (
        <>
          <p className="mb-2">Wurzel von: <strong>{number}</strong></p>
          <input
            type="text"
            className="border px-4 py-2 rounded w-full text-center text-xl"
            placeholder="Wurzel eingeben"
            value={userInput}
            onChange={handleChange}
          />
          <p className="mt-2">Punkte: {score}</p>
        </>
      ) : gameOver ? (
        <div className="text-red-600 font-bold text-xl space-y-2">
          <p>Spiel vorbei!</p>
          <p>Richtige Wurzel: {correctRoot}</p>
          <p>Dein Score: {score}</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
            onClick={startNewGame}
          >
            Neues Spiel starten
          </button>
        </div>
      ) : (
        <p>Zahl wird geladen...</p>
      )}
    </div>
  );
}

export default RootGame;
