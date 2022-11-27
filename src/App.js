import React, { useState, useRef, useEffect } from "react";
import CardList from "./Cards/CardList";
import ProjectLoader from "./Explorer/ProjectLoader";

function App() {

    /*** Sample Initialization ***/
    var sampleDeck = Array(10).fill({
        card_id: 1,
        name: "Strike",
        description: "Deal 5 damage",
        tags: ["basic"],
        fields: { cost: 5 },
        image: null,
        color: {r:233,g:233,b:233,a:255}
    });

    var i = 0;
    for (i = 0; i < 10; i++) {
        sampleDeck[i] = { ...sampleDeck[i], card_id: i };
    }

    const [activeDeck,setActiveDeck] = useState(sampleDeck);

    const loadProjectHandler = (deck) => {
        console.log("load called");
        setActiveDeck(deck);
    }

    console.log("I was rendered");
    console.log(activeDeck);

    return (
        <div>
            <ProjectLoader handleLoadProject={loadProjectHandler}/>
            <CardList cards={activeDeck}/>
        </div>
    );
}

export default App;
