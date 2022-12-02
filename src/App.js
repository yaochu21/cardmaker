import React, { useState, useRef, useEffect } from "react";
import CardList from "./Cards/CardList";
import ProjectLoader from "./Explorer/ProjectLoader";

function App() {
    /*** Sample Initialization ***/
    let sampleDeck = Array(10).fill({
        card_id: 1,
        name: "Strike",
        description: "Deal 5 damage",
        tags: ["basic"],
        fields: { cost: 5 },
        image: null,
        color: { r: 233, g: 233, b: 233, a: 255 },
    });

    let i = 0;
    for (i = 0; i < 10; i++) {
        sampleDeck[i] = { ...sampleDeck[i], card_id: 9 - i };
    }

    const [activeDeck, setActiveDeck] = useState(sampleDeck);

    const loadProjectHandler = (deck) => {
        console.log("load called");
        for (const card in activeDeck) {
            if (card.image != null) {
                URL.revokeObjectURL(card.image);
            }
        }
        setActiveDeck(deck);
    };

    const getActiveDeckHandler = () => {
        return activeDeck;
    };

    const removeCardsHandler = (cards) => {
        let card_ids = activeDeck.map((card) => {
            return card.card_id;
        });
        let newActiveDeck = [].concat(activeDeck);
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
        setActiveDeck(newActiveDeck);
    };

    const addCardHandler = (card) => {
        console.log("try adding card");
        let card_ids = activeDeck.map((card) => card.card_id);
        let i = card_ids.indexOf(card.card_id);
        if (i > -1) {
            return -1;
        }
        console.log("adding card");
        setActiveDeck((prevState) => {
            return [card, ...prevState];
        });
    };

    return (
        <div>
            <ProjectLoader
                handleLoadProject={loadProjectHandler}
                getActiveDeck={getActiveDeckHandler}
            />
            <CardList
                cards={activeDeck}
                handleNewCard={addCardHandler}
                handleCardDelete={removeCardsHandler}
            />
        </div>
    );
}

export default App;
