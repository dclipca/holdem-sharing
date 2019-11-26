import cards from "./cards"
import getKeyByValue from "./getKeyByValue"
import randomProperty from "./randomProperty"

export default () => {
  let cardsClone = { ...cards };
  let card = randomProperty(cards);
  delete cards[getKeyByValue(card)];
  return cardsClone[getKeyByValue(cardsClone, card)];
};
