import React from 'react';
import { GameState } from '../utils/gameLogic';

interface Props {
  gameState: GameState;
  onClick?: () => void;
}

function Deck({ gameState, onClick }: Props) {
  const numCards = gameState.deck.length;
  const topCard = gameState.deck[numCards - 1];

  return (
    <div className="deck" onClick={onClick}>
      {numCards > 0 ? (
        <div className={`card ${topCard.color}`}>
          <div className="value">{topCard.value}  {topCard.color}</div>
        </div>
      ) : (
        <div className="empty">Empty</div>
      )}
    </div>
  );
}

export default Deck;
