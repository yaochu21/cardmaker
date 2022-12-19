import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CardList from "./CardDisplay/CardList";
import CardFilter from "./Explorer/CardFilter";
import ProjectLoader from "./Explorer/ProjectLoader";
import styled, { css } from "styled-components";
import { setDeck,setExistingTags } from "./Store/deckDataSlice";

function App() {

  const fullDeck = useSelector(state => state.deckData.deck);
  const activeTags = useSelector(state => state.deckData.existingTags)
  const dispatch = useDispatch();

  /*** Load Handlers ***/

  const loadProjectHandler = (deck) => {
    console.log("load called, new deck:");
    console.log(deck);
    for (const card in fullDeck) {
      if (card.image != null) {
        URL.revokeObjectURL(card.image);
      }
    }
    dispatch(setDeck(deck));
    loadTags(deck);
  };

  const loadTags = (deck) => {
    const l = deck.length;
    let allTags = [];
    for (let i = 0; i < l; i++) {
      let cardTags = deck[i].tags;
      for (let j = 0; j < cardTags.length; j++) {
        if (allTags.indexOf(cardTags[j]) >= 0) {
          continue;
        }
        allTags.push(cardTags[j]);
      }
    }
    dispatch(setExistingTags(allTags));
  };

  /*** Deck Management Handlers */

  const removeCardsHandler = (cards) => {
    let card_ids = fullDeck.map((card) => {
      return card.card_id;
    });
    let newActiveDeck = [].concat(fullDeck);
    console.log("active deck length:" + newActiveDeck.length);

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      let index = card_ids.indexOf(card.card_id);
      if (index > -1) {
        console.log("removing card: id: " + card.card_id);
        newActiveDeck = newActiveDeck.filter((card, i) => i !== index);
      }
    }
    console.log("active deck length:" + newActiveDeck.length);
    dispatch(setDeck(newActiveDeck));
  };

  const addCardHandler = (card) => {
    console.log("try adding card");
    let card_ids = fullDeck.map((card) => card.card_id);
    let i = card_ids.indexOf(card.card_id);
    if (i > -1) {
      return -1;
    }
    console.log("adding card");
    dispatch(setDeck([...fullDeck, card]));
  };

  return (
    <React.Fragment>
      <PageContainer>
        <ExplorerContainer>
          <ProjectLoader
            handleLoadProject={loadProjectHandler}
          />
          <CardFilter/>
        </ExplorerContainer>
        <CardList
          handleNewCard={addCardHandler}
          handleCardDelete={removeCardsHandler}
        />
      </PageContainer>
    </React.Fragment>
  );
}

const PageContainer = styled.div(css`
  margin-left: 10rem;
  margin-top: 3rem;
  display: flex;
  flex-direction: row;
  gap: 2rem;
`);

const ExplorerContainer = styled.div(css`
  margin-top: 0.9rem;
  width: 30rem;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
`);

export default App;
