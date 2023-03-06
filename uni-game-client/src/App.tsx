import React, { useState } from "react";
import Card from "./components/Card";
import Deck from "./components/Deck";
import DiscardPile from "./components/DiscardPile";
import {
  drawCard,
  GameState,
  initializeGame,
  playCard,
  Player,
} from "./utils/gameLogic";

function App() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(
    null
  );

  function handleStartGame(numPlayers: number) {
    const newGameState = initializeGame(numPlayers);
    setGameState(newGameState);
  }

  function handleCardClick(index: number) {
    setSelectedCardIndex(index);
  }

  function handlePlayCard() {
    if (gameState && selectedCardIndex !== null) {
      const newGameState = playCard(gameState, selectedCardIndex);
      setGameState(newGameState);
      setSelectedCardIndex(null);
    }
  }

  function handleDrawCard() {
    if (gameState) {
      const newGameState = drawCard(gameState);
      // get the current player index and hand
      const currentPlayerIndex = newGameState.currentPlayerIndex;
      const currentPlayerHand = newGameState.players[currentPlayerIndex].hand;
      // update the state with the new hand and currentPlayerDrawable value
      setGameState({
        ...newGameState,
        players: [
          ...newGameState.players.slice(0, currentPlayerIndex),
          {
            ...newGameState.players[currentPlayerIndex],
            hand: currentPlayerHand,
          },
          ...newGameState.players.slice(currentPlayerIndex + 1),
        ],
        currentPlayerDrawable: newGameState.currentPlayerDrawable,
      });
    }
  }

  // Create boxes with numbers 1-10
  const boxes: number[] = [];
  for (let i = 2; i <= 4; i++) {
    boxes.push(i);
  }

  return (
    <div>
      {!gameState && (
        <div>
          <p>Enter number of players:</p>
          <div>
            {boxes.map((box, index) => (
              <button key={index} onClick={(e) => handleStartGame(Number(box))}>
                {box} Players
              </button>
            ))}
          </div>
        </div>
      )}
      {gameState && (
        <div>
          <p>Number or players: {gameState.players.length}</p>
          <p>
            Current player:{" "}
            {gameState.players[gameState.currentPlayerIndex].name}
          </p>
          <p>
            Top card:{" "}
            <Card card={gameState.discardPile[gameState.discardPile.length - 1]} isClicked={false}></Card>
          </p>
          <div>
            {gameState.players[gameState.currentPlayerIndex].hand.map(
              (card, index) => (
                <Card
                  key={index}
                  card={card}
                  isClicked={index === selectedCardIndex}
                  onClick={() => handleCardClick(index)}
                />
              )
            )}
          </div>
          <button onClick={handlePlayCard}>Play Card</button>
          <button
            onClick={handleDrawCard}
            disabled={!gameState.currentPlayerDrawable}
          >
            Draw Card
          </button>
          <hr></hr>
          <div>
            {gameState.players.map((player: Player, index: number) => (
              <li key={index}>
                Player {index + 1} : {player.hand.length} cards left
              </li>
            ))}
          </div>
          <div>
            <Deck gameState={gameState}></Deck>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
