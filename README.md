# Whack-a-Mole

Technical assignment for Gaming1.

## Prerequisites

- Node.js 18 or higher
- npm

## Installation

Install dependencies at the root of the project:

``bash
npm install


## Run tests

- Run the test suite from the project root:
    "npm run test:run"

## Tech Stack

- React
- TypeScript
- Vite
- Redux Toolkit
- React Router
- RxJS
- Tailwind CSS
- Vitest
- React Testing Library

## Features

### Game
- 3x4 board by default
- random mole spawning
- score increases when the active mole is hit
- countdown timer
- reset game action
- hit animation and hammer feedback

### Leaderboard
- top 10 scores
- player name submission at game end
- leaderboard page with podium for top 3

### Settings
- change mole speed
- change board size
- change game duration
- settings modal

### Testing
- unit tests for Redux game logic
- unit tests for leaderboard utilities
- integration-style tests with React Testing Library