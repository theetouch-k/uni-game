import React from "react";
import { Card as CardType } from "../utils/gameLogic";

interface Props {
  card: CardType;
}

function DiscardPile({ card }: Props) {
  return (
    <div className={`discard-pile ${card.color}`}>
      <div className="value">{card.value} of {card.color}</div>
    </div>
  );
}

export default DiscardPile;
