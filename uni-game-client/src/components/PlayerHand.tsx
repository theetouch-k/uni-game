import React from 'react';
import './PlayerHand.css';
import { Card as CardType } from '../utils/gameLogic';
import Card from './Card';

interface Props {
  cards: CardType[];
  onCardClick?: (cardIndex: number) => void;
}

function PlayerHand({ cards, onCardClick }: Props) {
  return (
    <div className="player-hand">
      {cards.map((card, index) => (
        <Card key={index} card={card} onClick={() => onCardClick && onCardClick(index)} isClicked={false} />
      ))}
    </div>
  );
}

export default PlayerHand;
