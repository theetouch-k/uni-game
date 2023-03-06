import React from "react";
import { Card as CardType } from "../utils/gameLogic";
import styled from "styled-components";

interface Props {
  card: CardType;
  onClick?: () => void;
  isClicked: boolean;
}

const Container = styled.button<{ isClicked: boolean; color: string }>`
  font-size: 1.5em;
  text-align: center;
  display: inline-block;
  margin: 5px;
  padding: 5px;
  background-color: ${(props) => (props.isClicked ? props.color : "white")};
`;

function Card({ card, onClick, isClicked }: Props) {
  return (
    <Container
      className={`card ${card.color}`}
      isClicked={isClicked}
      color={card.color}
      onClick={onClick}
    >
      {card.value} of {card.color}
    </Container>
  );
}

export default Card;
