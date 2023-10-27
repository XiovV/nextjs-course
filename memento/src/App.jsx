import React, { useState, useEffect } from "react";
import shuffle from "./utilities/shuffle";
import Card from "./components/Card";

function App() {
  const [cards, setCards] = useState(shuffle);
  const [pickOne, setPickOne] = useState(null);
  const [pickTwo, setPickTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [wins, setWins] = useState(0);

  const handleClick = (card) => {
    if (!disabled) {
      pickOne ? setPickTwo(card) : setPickOne(card);
    }
  };

  const handleTurn = () => {
    setPickOne(null);
    setPickTwo(null);
    setDisabled(false);
  };

  useEffect(() => {
    let pickTimer;

    if (!pickOne || !pickTwo) {
      return;
    }

    if (pickOne.image !== pickTwo.image) {
      setDisabled(true);

      pickTimer = setTimeout(() => {
        handleTurn();
      }, 1000);

      return;
    }

    setCards((prevCards) => {
      return prevCards.map((card) => {
        if (card.image !== pickOne.image) {
          return card;
        }

        return { ...card, matched: true };
      });
    });

    return () => {
      clearTimeout(pickTimer);
    };
  }, [cards, pickOne, pickTwo]);

  useEffect(() => {
    const checkWin = cards.filter((card) => !card.matched);
    if (cards.length && checkWin.length < 1) {
      console.log("You win!");
      setWins(wins + 1);
      handleTurn();
    }
  }, [cards, wins]);

  return (
    <>
      <div className="grid">
        {cards.map((card) => {
          const { image, id, matched } = card;

          return (
            <Card
              key={id}
              image={image}
              selected={card === pickOne || card === pickTwo || matched}
              onClick={() => handleClick(card)}
            />
          );
        })}
      </div>
    </>
  );
}

export default App;
