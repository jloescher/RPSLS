from random import randint

list_choice = ["rock", "paper", "scissors", "lizard", "spock"]


# Create a basic player
class Player:
    def __init__(self) -> None:
        self.choice = None
        self.score = 0

    def return_choice(self):
        return self.choice

    def return_score(self):
        return self.score