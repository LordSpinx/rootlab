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
    const root = Math.sqrt(randomNum).toFixed(7); // auf 7 Nachkommastellen runden
    setNumber(randomNum);
    setCorrectRoot(root);
    setUserInput("");
    setGameOver(false);
  };

  const normalizeInput = (value) => {
    return value.replace(",", "."); // , → .
  };

  const handleChange = (e) => {
    const raw = e.target.value;
    const value = normalizeInput(raw);
    setUserInput(value);

    if (mode === "hard") {
      if (!value.includes(".")) return;

      if (!correctRoot.startsWith(value)) {
        setGameOver(true);
        if (score > highscore) setHighscore(score);
      } else {
        const correctDecimals = correctRoot.split(".")[1] || "";
        const userDecimals = value.split(".")[1] || "";

        if (
          value === correctRoot &&
          userDecimals.length === correctDecimals.length
        ) {
          // Alle korrekt und vollständig
          setScore((prev) => prev + userDecimals.length + 5); // Bonus!
          startNewGame();
        }
      }
    }
  };

  const handleKeyDown = (e) => {
    if (mode === "hard" && e.key === "Enter") {
      const value = normalizeInput(userInput);
      if (!value.includes(".")) return;

      let correct = 0;
      for (let i = 0; i < value.length; i++) {
        if (value[i] === correctRoot[i]) {
          if (value[i] === ".") continue;
          correct++;
        } else {
          break;
        }
      }

      setScore((prev) => prev + correct);
      startNewGame();
    }

    if (mode === "easy" && (e.key === "Enter" || e.key === " ")) {
      const inputValue = normalizeInput(userInput.trim());
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
            style={{ height: "1rem", overflow: "hidden" }}
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
                : "Wurzel mit max. 7 Nachkommastellen"
            }
            value={userInput}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="input-field"
          />
          <p>Punkte: {score}</p>
          <p style={{ fontSize: "0.8rem", marginTop: "4px" }}>
              Du kannst <code>,</code> oder <code>.</code> als Komma nutzen.<br />
              Gib deine Antwort mit <strong>Enter</strong> ab.
          </p>
          {mode === "hard" && (
            <p style={{ fontSize: "0.8rem", marginTop: "4px" }}>
              Für alle 7 Nachkommastellen korrekt: <strong>+5 Bonuspunkte</strong>
            </p>
          )}
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
