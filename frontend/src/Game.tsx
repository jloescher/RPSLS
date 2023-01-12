import React, { useState } from "react";
import "./Game.css";

interface GameProps { }

interface Result {
  winner: string;
  message: string;
}

const Game: React.FC<GameProps> = () => {
    const [playerChoice, setPlayerChoice] = useState("");
    const [computerChoice, setComputerChoice] = useState("");
    const [result, setResult] = useState<Result>({ message: "", winner: "" });

    const handleChoice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerChoice(e.target.value);
  };

  const playGame = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/play", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ choice: playerChoice }),
      });
      const data = await response.json();
      setResult(data.result);
    } catch (e) {
      console.error(e);
    }
    };

   return (
      <div className="bg-gray-200 p-5 flex flex-col items-center">
      <h1 className="text-xl font-medium">Rock Paper Scissors Lizard Spock</h1>
      <div className="flex flex-col items-center mt-4">
        <label className="inline-block font-medium">
          <input
            className="mr-2"
            type="radio"
            name="choice"
            value="rock"
            onChange={handleChoice}
          />
          Rock
        </label>
        <label className="inline-block font-medium">
          <input
            className="mr-2"
            type="radio"
            name="choice"
            value="paper"
            onChange={handleChoice}
          />
          Paper
        </label>
        <label className="inline-block font-medium">
          <input
            className="mr-2"
            type="radio"
            name="choice"
            value="scissors"
            onChange={handleChoice}
          />
          Scissors
        </label>
        <label className="inline-block font-medium">
          <input
            className="mr-2"
            type="radio"
            name="choice"
            value="lizard"
            onChange={handleChoice}
          />
          Lizard
        </label>
        <label className="inline-block font-medium">
          <input
            className="mr-2"
            type="radio"
            name="choice"
            value="spock"
            onChange={handleChoice}
          />
          Spock
        </label>
      </div>
      <button
        className="bg-indigo-500 text-white px-4 py-2 mt-4"
        onClick={playGame}
      >
        Play
      </button>
      {result && (
        <h2 className={`text-center mt-4 font-medium ${result.winner === "Player" ? "text-green-600" : result.winner === "Computer" ? "text-red-600" : "text-gray-600"}`}>
          {result.message}
        </h2>
      )}
    </div>

    );

};


export default Game;

