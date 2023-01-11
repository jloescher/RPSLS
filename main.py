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


# Create the computer player
class Computer(Player):
    def __init__(self) -> None:
        super().__init__()

    def get_input(self):
        choice = list_choice[randint(0, len(list_choice) - 1)].lower()
        self.choice = choice
        return {
            "error": None,
            "choice": self.choice,
        }


# Create the Game Logic
class Game:
    def __init__(self, player: Human, computer: Computer, run: bool):
        self.player = player
        self.computer = computer
        self.run = True

    def check_winner(self):
        if self.player.choice == self.computer.choice:
            return {
                "winner": False,
                "message": "It's a tie!",
            }
        else:
            match self.player.choice:
                case "rock":
                    if self.computer.choice == "scissors":
                        return {
                            "winner": True,
                            "message": "You win!",
                        }
                    elif self.computer.choice == "paper":
                        return {
                            "winner": False,
                            "message": "Computer wins!",
                        }
                    elif self.computer.choice == "lizard":
                        return {
                            "winner": True,
                            "message": "You win!",
                        }
                    elif self.computer.choice == "spock":
                        return {
                            "winner": False,
                            "message": "Computer wins!",
                        }
                case "paper":
                    if self.computer.choice == "rock":
                        return {
                            "winner": True,
                            "message": "You win!",
                        }
                    elif self.computer.choice == "scissors":
                        return {
                            "winner": False,
                            "message": "Computer wins!",
                        }
                    elif self.computer.choice == "lizard":
                        return {
                            "winner": False,
                            "message": "Computer wins!",
                        }
                    elif self.computer.choice == "spock":
                        return {
                            "winner": True,
                            "message": "You win!",
                        }
                case "scissors":
                    if self.computer.choice == "rock":
                        return {
                            "winner": False,
                            "message": "Computer wins!",
                        }
                    elif self.computer.choice == "paper":
                        return {
                            "winner": True,
                            "message": "You win!",
                        }
                    elif self.computer.choice == "lizard":
                        return {
                            "winner": True,
                            "message": "You win!",
                        }
                    elif self.computer.choice == "spock":
                        return {
                            "winner": False,
                            "message": "Computer wins!",
                        }
                case "lizard":
                    if self.computer.choice == "rock":
                        return {
                            "winner": False,
                            "message": "Computer wins!",
                        }
                    elif self.computer.choice == "paper":
                        return {
                            "winner": True,
                            "message": "You win!",
                        }
                    elif self.computer.choice == "scissors":
                        return {
                            "winner": False,
                            "message": "Computer wins!",
                        }
                    elif self.computer.choice == "spock":
                        return {
                            "winner": True,
                            "message": "You win!",
                        }
                case "spock":
                    if self.computer.choice == "rock":
                        return {
                            "winner": True,
                            "message": "You win!",
                        }
                    elif self.computer.choice == "paper":
                        return {
                            "winner": False,
                            "message": "Computer wins!",
                        }
                    elif self.computer.choice == "scissors":
                        return {
                            "winner": True,
                            "message": "You win!",
                        }
                    elif self.computer.choice == "lizard":
                        return {
                            "winner": False,
                            "message": "Computer wins!",
                        }
                case _:
                    return "Invalid input! You have not entered rock, paper, scissors, lizard or spock"

    def run_game(self):
        while self.run:
            self.player.get_input()
            self.computer.get_input()
            computer_choice = self.computer.choice
            print(f"The computer chose {computer_choice.title()}")
            check = self.check_winner()
            if check["winner"] == True:
                self.run = False
            print(check["message"])