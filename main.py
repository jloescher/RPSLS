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


# Create the human player
class Human(Player):
    def __init__(self):
        super().__init__()

    def get_input(self):
        print("Please choose from the below selection.")
        for item in list_choice:
            print(item.title())
        my_input = input("Please enter your choice: ").strip()
        choice = my_input.lower()
        if choice in list_choice:
            self.choice = choice
            return {
                "error": None,
                "choice": self.choice,
            }
        else:
            run = False
            return {
                "error": "Wrong Input",
                "choice": None,
            }
