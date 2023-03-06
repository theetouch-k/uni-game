export interface Card {
  value: string;
  color: string;
}

export interface Player {
  id: number;
  hp: number;
  name: string;
  hand: Card[];
}

export interface GameState {
  deck: Card[];
  discardPile: Card[];
  players: Player[];
  currentPlayerIndex: number;
  currentPlayerDrawable: boolean;
}

const COLORS = ["red", "green", "blue", "yellow"];
const VALUES = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "skip", "reverse"];

function createDeck(): Card[] {
  const deck: Card[] = [];
  // Add the cards
  for (const color of COLORS) {
    for (const value of VALUES) {
      deck.push({ value, color });
    }
  }
  return deck;
}

export function initializeGame(numPlayers: number): GameState {
  if (numPlayers < 2 || numPlayers > 10) {
    throw new Error("Invalid number of players. Must be between 2 and 10.");
  }
  // create and shuffle deck
  const deck = createDeck();
  shuffle(deck);

  const players: Player[] = [];
  for (let i = 0; i < numPlayers; i++) {
    const hand: Card[] = [];
    for (let j = 0; j < 7; j++) {
      hand.push(deck.pop()!);
    }
    players.push({ id: i, hp: 100, name: `Player ${i + 1}`, hand });
  }

  const topCard = deck.pop()!;
  const discardPile: Card[] = [topCard];

  return {
    deck,
    discardPile,
    players,
    currentPlayerIndex: 0,
    currentPlayerDrawable: true,
  };
}

export function canPlayCard(card: Card, topCard: Card): boolean {
  return card.color === topCard.color || card.value === topCard.value;
}

export function shuffle<T>(array: T[]): void {
  // Fisher-Yates shuffle
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export function playCard(gameState: GameState, cardIndex: number): GameState {
  const currentPlayer = gameState.players[gameState.currentPlayerIndex];
  const card = currentPlayer.hand[cardIndex];

  if (
    !canPlayCard(card, gameState.discardPile[gameState.discardPile.length - 1])
  ) {
    throw new Error("Invalid play");
  }

  currentPlayer.hand.splice(cardIndex, 1);
  gameState.discardPile.push(card);

  if (currentPlayer.hand.length === 0) {
    // Player has won
    return gameState;
  }

  let drawCards = 0;
  switch (card.value) {
    case "draw2":
      drawCards = 2;
      break;
    case "skip":
      gameState.currentPlayerIndex = getNextPlayerIndex(gameState, 2);
      gameState.currentPlayerDrawable = true;
      break;
    case "reverse":
      gameState.players.reverse();
      gameState.currentPlayerIndex = getNextPlayerIndex(gameState, 1);
      gameState.currentPlayerDrawable = true;
      break;
    default:
      gameState.currentPlayerIndex = getNextPlayerIndex(gameState, 1);
      gameState.currentPlayerDrawable = true;
  }

  for (let i = 0; i < drawCards; i++) {
    const nextPlayerIndex = getNextPlayerIndex(gameState, 1);
    gameState.players[nextPlayerIndex].hand.push(gameState.deck.pop()!);
  }

  return gameState;
}

export function drawCard(gameState: GameState): GameState {
  const currentPlayer = gameState.players[gameState.currentPlayerIndex];
  // check if the current player can play any cards in their hand
  currentPlayer.hand.push(gameState.deck.pop()!);
  currentPlayer.hand.forEach((card) => {
    if (
      canPlayCard(card, gameState.discardPile[gameState.discardPile.length - 1])
    ) {
      gameState.currentPlayerDrawable = false;
      return;
    }
  });
  return gameState;
}

function getNextPlayerIndex(gameState: GameState, increment: number): number {
  let nextPlayerIndex = gameState.currentPlayerIndex + increment;
  if (nextPlayerIndex >= gameState.players.length) {
    nextPlayerIndex = 0;
  }
  return nextPlayerIndex;
}
