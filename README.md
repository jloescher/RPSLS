# Rock, Paper, Sissors, Lizard, Spock Game

## Development Launch
- Clone the repository.
- Change directory into frontend
- run: npm install
- run: npm run build
- Change directory into root of repository
- run: python3 -m venv .venv
- run: source .venv/bin/activate
- run: pip install -r requirements.txt
- run: python main.py

## Deploy
- Google Cloud Run, link to repo for CI and choose the Dockerfile

## Notes
Currently FastApi is hosting the SPA from the root of the domain, this requires use of docker to build a custom image.

## Things to do...
- Tweak UI better for mobile
- Clean up code, remove unused code
- Add multiplayer functionality
- Use openai to make selection for computer player vs random

Hosted at [https://rpsls.jloescher.com](https://rpsls.jloescher.com)
Email me @ <jonathan@jloescher.com>