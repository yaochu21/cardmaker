import React, { useState } from "react";
import styled from "styled-components";
import NewCard from "./NewCard";
import CardDisplay from "./CardDisplay";
import ContextMenu from "./ContextMenu";
import CardEditModal from "./CardEditModal";
import "./CardList.css";

const CardList = (props) => {

    /*** Sample Initialization ***/
    var cards = Array(20).fill({
        card_id: 1,
        name: "Strike",
        description: "Deal 5 damage",
        tags: ["basic"],
        fields: { cost: 5 },
        image: null,
    });

    var i = 0;
    for (i = 0; i < 20; i++) {
        cards[i] = { ...cards[i], card_id: i };
    }
    //console.log(cards);

    /*** State Initialization ***/
    const [deck,setDeck] = useState(cards);
    const [selectedCards, setSelectedCards] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [menuCoord, setMenuCoord] = useState({ x: 0, y: 0 });
    const [isCardModalOpen, setIsCardModalOpen] = useState(false);
    const [editingCard, setEditingCard] = useState(null);

    /*** Card Handlers ***/

    const deckUpdateHandler = () => {

    }

    const cardSelectHander = (card, shift, hack = false) => {
        setSelectedCards((prevState) => {
            var index = prevState.indexOf(card);
            if (index >= 0 && shift) {
                var newSelected = prevState.filter(
                    (e) => e.card_id !== card.card_id
                );
                return newSelected ? newSelected : [];
            } else if ((index < 0 && shift) || hack) {
                console.log([...prevState, card].map((e) => e.card_id));
                return [...prevState, card];
            } else {
                console.log([card.card_id]);
                return [card];
            }
        });
    };

    /*** ContextMenu Handlers ***/

    const contextMenuHandler = (event, open) => {
        event.preventDefault();
        if (open) {
            console.log("context menu requested");
            spawnContextMenu(event.clientX, event.clientY);
        } else {
            console.log("context menu closing");
            closeContextMenu(event);
        }
    };

    const spawnContextMenu = (x, y) => {
        setIsMenuOpen(true);
        setMenuCoord({ x: x, y: y });
    };

    const closeContextMenu = () => {
        setIsMenuOpen(false);
    };

    const overlayClickHandler = (event) => {
        console.log("overlay clicked");
        setSelectedCards([]);
        setIsMenuOpen(false);
    };

    /*** Modal Handlers ***/

    const openCardModalHandler = () => {
        console.log("In openCardModalHandler");
        if (selectedCards.length > 0) {
            setEditingCard(selectedCards[selectedCards.length - 1]);
            setIsCardModalOpen(true);
        } else {
            console.log("no card selected");
        }
    };

    const closeCardModalHandler = (event) => {
        setIsCardModalOpen(false);
        setEditingCard(null);
    };

    return (
        <Overlay onClick={overlayClickHandler}>
            <ul className="card-list">
                <NewCard />
                {deck.map((card) => (
                    <div className="member" key={Math.random().toString()}>
                        <CardDisplay
                            isSelected={selectedCards.includes(card)}
                            card={card}
                            handleContextMenu={contextMenuHandler}
                            handleCardSelect={cardSelectHander}
                            openCardModal={openCardModalHandler}
                        />
                    </div>
                ))}
            </ul>
            {isMenuOpen ? (
                <ContextMenu
                    x={menuCoord.x}
                    y={menuCoord.y}
                    openCardModal={openCardModalHandler}
                    closeCardModal={closeCardModalHandler}
                />
            ) : null}
            {isCardModalOpen ? (
                <CardEditModal
                    card={editingCard}
                    closeCardModal={closeCardModalHandler}
                />
            ) : null}
        </Overlay>
    );
};

const Overlay = styled.div`
    z-index: -1;
    height: 100vh;
    width: 100vw;
    position: fixed;
    overflow-y: scroll;
    top: 0;
    left: 0;
    background-color: rgba(255, 255, 255, 0.5);
`;

export default CardList;
