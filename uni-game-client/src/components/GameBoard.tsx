import React from "react";
import "./GameBoard.css";
import { GameState } from "../utils/gameLogic";
import Deck from "./Deck";
import DiscardPile from "./DiscardPile";
import PlayerHand from "./PlayerHand";

interface Props {
  gameState: GameState;
  onDrawCard: () => void;
  onPlayCard: (cardIndex: number) => void;
}

function GameBoard({ gameState, onDrawCard, onPlayCard }: Props) {
  const currentPlayer = gameState.players[gameState.currentPlayerIndex];

  return (
    <div className="game-board">
      <div className="players">
        {gameState.players.map((player, index) => (
          <div
            key={index}
            className={`player ${
              player.id === currentPlayer.id ? "current" : ""
            }`}
          >
            <div className="name">{player.name}</div>
            <PlayerHand
              cards={player.hand}
              onCardClick={(cardIndex) => onPlayCard(cardIndex)}
            />
          </div>
        ))}
      </div>
      <div className="deck-and-discard">
        <Deck gameState={gameState} onClick={onDrawCard} />
        <DiscardPile
          card={gameState.discardPile[gameState.discardPile.length - 1]}
        />
      </div>
    </div>
  );
}

export default GameBoard;
