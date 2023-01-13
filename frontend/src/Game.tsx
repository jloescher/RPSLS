import React, { useState } from "react";
import YouTubeVideo from "./YouTube-Video";
import { Card, CardHeader, CardBody, CardFooter, useToast, Progress, Divider, Box, Center } from '@chakra-ui/react'
import rock from "./images/rock.jpeg"
import paper from "./images/paper.png"
import scissors from "./images/scissors.png"
import lizard from "./images/lizard.jpeg"
import spock from "./images/spock.jpeg"
import "./Game.css";

interface GameProps { }

interface Result {
  winner: string;
  message: string;
}

interface Score {
  computer: number
  player: number
  tie: number
}

const Game: React.FC<GameProps> = () => {
    const [playerChoice, setPlayerChoice] = useState("");
    const [result, setResult] = useState<Result>({ message: "", winner: "" });
    const [score, setScore] = useState<Score>({ player: 0, computer: 0, tie: 0 })
    const toast = useToast()

    const handleChoice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerChoice(e.target.value);
  };

  const playGame = async () => {
    try {
      await fetch(`${window.location.origin}/play`, {
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
            setScore({ player: score.player += 1, computer: score.computer, tie: score.tie })
            break
          case "Computer":
            setScore({ player: score.player, computer: score.computer += 1, tie: score.tie })
            break
          case "Tie":
            setScore({ player: score.player, computer: score.computer, tie: score.tie += 1 })
            break
        }
        toast({
          title: data.result.winner !== "Tie" ? `${data.result.winner} won!` : `${data.result.winner}`,
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

  let scoreHack = (): number => {
    const combinedScore = score.computer + score.player + score.tie
    if ((combinedScore) > 0) {
      return combinedScore
    }
    
    return 1
  }

  let resetScore = (): void => {
    setScore({
      computer: 0,
      player: 0,
      tie: 0,
    })
    let radios: any = document.querySelector('input[name="choice"]') // Hacked with any
    if (radios != null) {
      for (let i=0; i < radios.length; i++) {
        let radioButton = radios[i]
        radioButton.checked = false
      }
    }
    
  }

   return (
      <Card className="bg-gray-200 p-5">
        <CardHeader>
          <h1 className="text-xl font-medium text-center">Rock Paper Scissors Lizard Spock</h1>
        </CardHeader>
        <CardBody>
          <Center>
            <Box className="flex flex-wrap flex-row">
              <div className="flex flex-col">
                  <h3 className="w-24 m-4">Player: {score.player}</h3>
                  <Progress className="w-24 m-4" colorScheme={score.player > score.computer ? 'green' : 'red'} size='md' max={scoreHack()} value={score.player} />
              </div>
              <div className="flex flex-col">
                  <h3 className="w-24 m-4">Computer: {score.computer}</h3>
                  <Progress className="w-24 m-4" colorScheme={score.computer > score.player ? 'green' : 'red'} size='md' max={scoreHack()} value={score.computer} />
              </div>
              <div className="flex flex-col">
                  <h3 className="w-24 m-4">Tie: {score.computer}</h3>
                  <Progress className="w-24 m-4" colorScheme={'yellow'} size='md' max={scoreHack()} value={score.tie} />
              </div>
            </Box>
          </Center>
          <Divider />
          <Center>
            <Box className="flex flex-wrap flex-row">
              <input
                id="Rock"
                className="input-hidden"
                type="radio"
                name="choice"
                value="rock"
                onChange={handleChoice}
              />
              <label className="inline-block p-4" htmlFor="Rock">
                <img
                  src={rock}
                  alt="Rock" />
              </label>
              
              <input
                id="Paper"
                className="input-hidden"
                type="radio"
                name="choice"
                value="paper"
                onChange={handleChoice}
              />
              <label className="inline-block p-4" htmlFor="Paper">
                <img
                  src={paper}
                  alt="Paper" />
              </label>
              
              <input
                id="Scissors"
                className="input-hidden"
                type="radio"
                name="choice"
                value="scissors"
                onChange={handleChoice}
              />
              <label className="inline-block p-4" htmlFor="Scissors">
                <img
                  src={scissors}
                  alt="scissors" />
              </label>
              
              <input
                id="Lizard"
                className="input-hidden"
                type="radio"
                name="choice"
                value="lizard"
                onChange={handleChoice}
              />
              <label className="inline-block p-4" htmlFor="Lizard">
                <img 
                  src={lizard} 
                  alt="lizard" />
              </label>
              
              <input
                id="Spock"
                className="input-hidden"
                type="radio"
                name="choice"
                value="spock"
                onChange={handleChoice}
              />
              <label className="inline-block p-4" htmlFor="Spock">
                <img 
                  src={spock}
                  alt="spock" />
              </label>

            </Box>
          </Center>
          <Center>
            <Box className="flex flex-wrap w-100">
              <button
                className="bg-teal-600 text-gray-200 px-4 py-2 mt-4 w-40 font-bold m-4"
                onClick={playGame}
              >
                Play
              </button>

              <button
                className="bg-red-600 text-gray-200 px-4 py-2 mt-4 w-40 font-bold m-4"
                onClick={resetScore}
              >
                Reset
              </button>
            </Box>
          </Center>
          

          <YouTubeVideo />
          

        </CardBody>
        <CardFooter className="flex flex-row w-full">
          <p className="text-center w-full">
            Copyright &copy; {(new Date().getFullYear())} by XOTEC Solutions, LLC with 💙 in Florida, USA
          </p>
        </CardFooter>
    </Card>
    );

};


export default Game;

