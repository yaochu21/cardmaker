import React, {
    useState,
    useRef,
    useEffect,
    useContext,
    createContext,
} from "react";
import CardList from "./Cards/CardList";
import CardFilter from "./Explorer/CardFilter";
import ProjectLoader from "./Explorer/ProjectLoader";
import TagInput from "./Explorer/TagInput";
import { getIterableKeys } from "./Utilities/Iterable";

function App() {
    /*** Sample Initialization ***/
    let sampleDeck = Array(10).fill({
        card_id: 1,
        name: "Strike",
        description: "Deal 5 damage",
        tags: ["basic"],
        fields: { cost: 5 },
        image: null,
        color: { r: 233, g: 233, b: 233, a: 1 },
    });

    let i = 0;
    for (i = 0; i < 10; i++) {
        sampleDeck[i] = { ...sampleDeck[i], card_id: 9 - i };
    }

    const [activeDeck, setActiveDeck] = useState(sampleDeck);
    const [activeTags, setActiveTags] = useState(["basic"]);

    const loadProjectHandler = (deck) => {
        console.log("load called");
        for (const card in activeDeck) {
            if (card.image != null) {
                URL.revokeObjectURL(card.image);
            }
        }
        setActiveDeck(deck);
        loadTags(deck);
    };

    const loadTags = (deck) => {
        const l = deck.length;
        let allTagsMap = new Map();
        for (let i = 0; i < l; i++) {
            let cardTags = deck[i].tags;
            for (let j = 0; j < cardTags.length; j++) {
                if (allTagsMap.has(cardTags[j])) {
                    allTagsMap.set(
                        cardTags[j],
                        allTagsMap.get(cardTags[j]) + 1
                    );
                } else {
                    allTagsMap.set(cardTags[j], 1);
                }
            }
        }
        setActiveTags(allTagsMap);
    };

    const getActiveDeckHandler = () => {
        return activeDeck;
    };

    const updateTagMapHandler = (card) => {
        console.log("update tag handler called");
        let updatedTags = card.tags;
        let newEntries = [];
        for (let i = 0; i < updatedTags.length; i++) {
            if (activeTags.indexOf(updatedTags[i]) > -1) {
                continue;
            }
            else {
                newEntries.push(updatedTags[i]);
            }
        }
        if (newEntries.length > 0) {
            setActiveTags((prev) => {
                return prev.concat(newEntries);
            })
        }
    }

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
                handleTagUpdate={updateTagMapHandler}
                activeTags={activeTags}
            />
            {/* <CardFilter /> */}
            {/* <TagInput /> */}
        </div>
    );
}

export default App;
