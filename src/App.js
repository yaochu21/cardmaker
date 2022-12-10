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
import styled, { css } from "styled-components";

function App() {
    /*** Sample Initialization ***/
    let sampleDeck = Array(1).fill({
        card_id: 1,
        name: "Your New Card",
        description: "Your Card Description",
        tags: ["basic"],
        fields: { cost: 5 },
        image: null,
        color: { r: 233, g: 233, b: 233, a: 1 },
    });



    const [activeDeck, setActiveDeck] = useState(sampleDeck);
    const [activeTags, setActiveTags] = useState(["basic"]);
    const [visibleDeck, setVisibleDeck] = useState(sampleDeck);

    console.log(visibleDeck);

    /*** Filter Handlers ***/
    const updateFilterHandler = (newFilter) => {
        console.log("update filter called");
        console.log(newFilter);
        let newVisibleDeck = applyFilter(newFilter, activeDeck);
        setVisibleDeck(newVisibleDeck);
    };

    const applyFilter = (filter, deck) => {
        let newDeck = [].concat(deck);

        console.log(newDeck[0]);

        if (filter.tags.length > 0) {
            newDeck = newDeck.filter((card) => {
                for (let i = 0; i < filter.tags.length; i++) {
                    let match = false;
                    for (let j = 0; j < card.tags.length; j++) {
                        let cardTag = card.tags[j];
                        let searchTag = filter.tags[i];
                        if (cardTag.indexOf(searchTag) >= 0) {
                            match = true;
                            break;
                        }
                    }

                    if (!match) {
                        return false;
                    }

                    // if (card.tags.indexOf(filter.tags[i]) < 0) {
                    //     return false;
                    // }
                }
                return true;
            });
        }

        if (filter.names.length > 0) {
            newDeck = newDeck.filter((card) => {
                return (
                    card.name.toUpperCase() ===
                    filter.names[filter.names.length - 1].toUpperCase()
                );
            });
        }

        if (filter.plain.length > 0) {
            newDeck = newDeck.filter((card) => {
                return (
                    card.description
                        .toUpperCase()
                        .indexOf(filter.plain.toUpperCase()) > -1
                );
            });
        }

        console.log(newDeck);
        return newDeck;
    };

    /*** Load Handlers ***/

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
            } else {
                newEntries.push(updatedTags[i]);
            }
        }
        if (newEntries.length > 0) {
            setActiveTags((prev) => {
                return prev.concat(newEntries);
            });
        }
    };

    /*** Deck Management Handlers */

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
        <React.Fragment>
            <PageContainer>
                <ExplorerContainer>
                    <ProjectLoader
                        handleLoadProject={loadProjectHandler}
                        getActiveDeck={getActiveDeckHandler}
                    />
                    <CardFilter updateFilter={updateFilterHandler} />
                </ExplorerContainer>
                <CardList
                    cards={activeDeck}
                    visibleCards={visibleDeck}
                    handleNewCard={addCardHandler}
                    handleCardDelete={removeCardsHandler}
                    handleTagUpdate={updateTagMapHandler}
                    activeTags={activeTags}
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
