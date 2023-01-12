import uvicorn
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles

# from fastapi.middleware.cors import CORSMiddleware
from game import Human, Computer, Game

# origins = [
#     "http://localhost:3000",
#     "http://localhost:8000",
#     "http://localhost:54474",
#     "http://127.0.0.1:3000",
#     "http://127.0.0.1:8000",
#     "http://127.0.0.1:54474",
# ]

app = FastAPI(title="RPSLS API")

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

app.mount("/static", StaticFiles(directory="frontend/build/static"), name="static")


@app.get("/", response_class=HTMLResponse)
def home(request: Request):
    return open(
        "frontend/build/index.html",
        "r",
    ).read()


@app.post("/play")
async def play_game(request: Request, data: dict):
    human = Human()
    # clean up choice
    choice = data["choice"].strip()
    choice = choice.lower()
    human_choice = human.get_input(choice)
    if human_choice["error"]:
        return human_choice

    computer = Computer()
    computer.get_input()
    game = Game(human, computer)
    result = game.check_winner()

    return {"result": result}


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="127.0.0.1",
        port=8000,
        reload=True,
        log_level="debug",
    )
