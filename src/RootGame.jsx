import React, { useState, useEffect } from "react";

function RootGame() {
  const [number, setNumber] = useState(null);
  const [correctRoot, setCorrectRoot] = useState("");
  const [userInput, setUserInput] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highscore, setHighscore] = useState(0);
  const [mode, setMode] = useState("hard");

  useEffect(() => {
    startNewGame();
  }, [mode]);

  const startNewGame = () => {
    const randomNum = Math.floor(Math.random() * 1000) + 1;
    const root = Math.sqrt(randomNum);
    setNumber(randomNum);
    setCorrectRoot(root.toFixed(5));
    setUserInput("");
    setGameOver(false);
  };

  const handleChange = (e) => {
    setUserInput(e.target.value);

    if (mode === "hard") {
      const value = e.target.value;
      if (!value.includes(".")) return;

      if (correctRoot.startsWith(value)) {
        const correctChars = value.length - correctRoot.indexOf(".") - 1;
        setScore(correctChars);
      } else {
        setGameOver(true);
        if (score > highscore) setHighscore(score);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (mode === "easy" && (e.key === "Enter" || e.key === " ")) {
      const inputValue = userInput.trim();
      const correctInt = Math.floor(parseFloat(correctRoot)).toString();

      if (inputValue === correctInt) {
        setScore((prev) => prev + 1);
        startNewGame();
      } else {
        setGameOver(true);
        if (score > highscore) setHighscore(score);
      }
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto text-center">
      <h2 className="text-2xl font-bold mb-2">
        Modus: {mode === "easy" ? "Einfach" : "Schwer"}
      </h2>

      <button
        onClick={() => setMode(mode === "easy" ? "hard" : "easy")}
        className="mb-4 px-4 py-1 bg-gray-700 text-white rounded"
      >
        Modus wechseln
      </button>

      <p className="mb-2 text-lg">Highscore: {highscore}</p>

      {number && !gameOver ? (
        <>
          <p className="mb-2">
            Wurzel von: <strong>{number}</strong>
          </p>
          <input
            type="text"
            className="border px-4 py-2 rounded w-full text-center text-xl"
            placeholder={
              mode === "easy"
                ? "Ganzzahlige Wurzel (Enter bestätigen)"
                : "Wurzel mit Nachkommastellen"
            }
            value={userInput}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
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
            onClick={() => {
              setScore(0);
              setGameOver(false);
              startNewGame();
            }}
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
