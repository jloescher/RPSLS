from fastapi import FastAPI, Request
from game import Human, Computer, Game

app = FastAPI()


@app.post("/play")
async def play_game(request: Request, choice: str):
    human = Human()
    # clean up choice
    choice = choice.strip()
    choice = choice.lower()
    human_choice = human.get_input(choice)
    if human_choice["error"]:
        return human_choice

    computer = Computer()
    computer.get_input()
    game = Game(human, computer)
    result = game.check_winner()

    return {"result": result}
