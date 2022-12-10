import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import NewCard from "./NewCard";
import CardDisplay from "./CardDisplay";
import ContextMenu from "../CardsUI/ContextMenu";
import CardEditModal from "../CardsUI/CardEditModal";
import "./CardList.css";

const CardList = (props) => {
    /*** State Initialization ***/
    const [selectedCards, setSelectedCards] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [menuCoord, setMenuCoord] = useState({ x: 0, y: 0 });
    const [isCardModalOpen, setIsCardModalOpen] = useState(true);
    const [editingCard, setEditingCard] = useState(props.cards[0]);

    /*** Card Handlers ***/

    const cardSelectHander = (card, shift, hack = false) => {
        setSelectedCards((prevState) => {
            var index = prevState.indexOf(card);
            if (index >= 0 && shift) {
                var newSelected = prevState.filter(
                    (e) => e.card_id !== card.card_id
                );
                return newSelected ? newSelected : [];
            } else if ((index < 0 && shift) || hack) {
                return [...prevState, card];
            } else {
                return [card];
            }
        });
    };

    const generateCardHandler = (event) => {
        let newID = props.cards[0].card_id + 1;
        console.log("generating new card, id: " + newID);
        let newCard = {
            card_id: newID,
            name: "New Card",
            description: "Description",
            tags: [],
            fields: {},
            image: null,
            color: { r: 233, g: 233, b: 233, a: 255 },
        };
        props.handleNewCard(newCard);
        setEditingCard(newCard);
        setSelectedCards([newCard]);
        setIsCardModalOpen(true);
    };

    const cardDeleteSelectedHandler = () => {
        if (selectedCards.length <= 0) {
            return;
        }
        let cardsToDelete = [].concat(selectedCards);
        setSelectedCards([]);
        props.handleCardDelete(cardsToDelete);
    };

    /*** ContextMenu Handlers ***/

    const contextMenuHandler = (event) => {
        event.preventDefault();
        console.log("context menu requested");
        spawnContextMenu(event.clientX, event.clientY);
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
        return;
    };

    const closeCardModalHandler = (event) => {
        setIsCardModalOpen(false);
        setEditingCard(null);
    };

    return (
        <React.Fragment>
            <Overlay onClick={overlayClickHandler}></Overlay>
            <ul className="card-list">
                <div
                    className="member"
                    key={Math.random().toString()}
                    onClick={generateCardHandler}
                >
                    <NewCard />
                </div>
                {props.visibleCards.map((card) => (
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
                    deleteCard={cardDeleteSelectedHandler}
                />
            ) : null}
            {isCardModalOpen ? (
                <CardEditModal
                    card={editingCard}
                    activeTags={props.activeTags}
                    handleTagUpdate={props.handleTagUpdate}
                    closeCardModal={closeCardModalHandler}
                />
            ) : null}
        </React.Fragment>
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
