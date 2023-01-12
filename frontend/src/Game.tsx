import React, { useState } from "react";
import { Card, CardHeader, CardBody, CardFooter, useToast, Progress } from '@chakra-ui/react'

import "./Game.css";

interface GameProps { }

interface Result {
  winner: string;
  message: string;
}

interface Score {
  computer: number
  player: number
}

const Game: React.FC<GameProps> = () => {
    const [playerChoice, setPlayerChoice] = useState("");
    const [result, setResult] = useState<Result>({ message: "", winner: "" });
    const [score, setScore] = useState<Score>({ player: 0, computer: 0 })
    const toast = useToast()

    const handleChoice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerChoice(e.target.value);
  };

  const playGame = async () => {
    try {
      await fetch("http://127.0.0.1:8000/play", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({"choice": playerChoice}),
      })
      .then((response) => response.json())
      .then((data) => {
        setResult(data.result);
        switch (data.result.winner) {
          case "Player":
            setScore({ player: score.player += 1, computer: score.computer })
            break
          case "Computer":
            setScore({ player: score.player, computer: score.computer += 1 })
            break
        }
        toast({
          title: `${data.result.winner} won!`,
          description: data.result.message,
          status: data.result.winner === "Player" ? 'success' : data.result.winner === "Computer" ? 'error' : 'warning',
          position: "bottom-left",
          duration: 9000,
          isClosable: true,
        })
      })
    } catch (e) {
      console.error(e);
    }
  };

   return (
      <Card className="h-full bg-gray-200 p-5 flex flex-col items-center">
        <CardHeader>
          <h1 className="text-xl font-medium">Rock Paper Scissors Lizard Spock</h1>
        </CardHeader>
        <CardBody>
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
        </CardBody>
        <CardFooter>
          <p className="text-center">&copy; XOTEC Solutions </p>
        </CardFooter>
    </Card>
    );

};


export default Game;

