import React, { useState, useEffect } from "react";
import changeIcon from "./assets/change.png";

function RootGame() {
  const [number, setNumber] = useState(null);
  const [correctRoot, setCorrectRoot] = useState("");
  const [userInput, setUserInput] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highscore, setHighscore] = useState(0);
  const [mode, setMode] = useState("easy");

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
    <div className="card">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "12px" }}>
        <h2 style={{ margin: 0 }}>
          Modus: {mode === "easy" ? "Einfach" : "Schwer"}
        </h2>
        <button
          onClick={() => setMode(mode === "easy" ? "hard" : "easy")}
          style={{
            cursor: "pointer"
          }}
        >
          <img
            className="change"
            src={changeIcon}
            style={{ height: "1rem", overflow: "hidden"}}
          />
        </button>
      </div>

      <p>Highscore: {highscore}</p>

      {number && !gameOver ? (
        <>
          <p>
            Wurzel von: <strong>{number}</strong>
          </p>
          <input
            type="text"
            placeholder={
              mode === "easy"
                ? "Ganzzahlige Wurzel"
                : "Wurzel mit Nachkommastellen"
            }
            value={userInput}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="input-field"
          />
          <p>Punkte: {score}</p>
        </>
      ) : gameOver ? (
        <>
          <p style={{ color: "var(--danger)", fontWeight: "bold" }}>
            Spiel vorbei!
          </p>
          <p>Richtige Wurzel: {correctRoot}</p>
          <p>Dein Score: {score}</p>
          <button
            onClick={() => {
              setScore(0);
              setGameOver(false);
              startNewGame();
            }}
          >
            Neues Spiel
          </button>
        </>
      ) : (
        <p>Zahl wird geladen...</p>
      )}
    </div>
  );
}

export default RootGame;
