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
        color: {r:233,g:233,b:233,a:255}
    });

    let i = 0;
    for (i = 0; i < 10; i++) {
        sampleDeck[i] = { ...sampleDeck[i], card_id: i };
    }

    const [activeDeck,setActiveDeck] = useState(sampleDeck);

    const loadProjectHandler = (deck) => {
        console.log("load called");
        for (const card in activeDeck) {
            if (card.image != null) {
                URL.revokeObjectURL(card.image);
            }
        }
        setActiveDeck(deck);
    }

    const getActiveDeckHandler = () => {
        return activeDeck;
    }

    return (
        <div>
            <ProjectLoader handleLoadProject={loadProjectHandler} getActiveDeck={getActiveDeckHandler}/>
            <CardList cards={activeDeck}/>
        </div>
    );
}

export default App;
