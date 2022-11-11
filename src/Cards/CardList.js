import React, { useState } from "react";
import NewCard from "./NewCard";
import CardDisplay from "./CardDisplay";
import ContextMenu from "./ContextMenu";
import "./CardList.css";
import styled from "styled-components";

const CardList = (props) => {
    const [selectedCards, setSelectedCards] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [menuCoord, setMenuCoord] = useState({ x: 0, y: 0 });

    const cardSelectHander = (card, shift) => {
        console.log("(de)selecting card: " + card.card_id);
        setSelectedCards((prevState) => {
            var index = prevState.indexOf(card);
            console.log("index: " + index);
            if (index >= 0 && shift) {
                console.log("shift deselected card");
                var newSelected = prevState.filter(
                    (e) => e.card_id != card.card_id
                );
                console.log(newSelected.map((e) => e.card_id));
                return newSelected ? newSelected : [];
            } else if (index < 0 && shift) {
                console.log("shift select card");
                console.log([...prevState, card].map((e) => e.card_id));
                return [...prevState, card];
            } else {
                console.log("select card");
                console.log([card.card_id]);
                return [card];
            }
        });
    };

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

    return (
        <div className="card-list_canvas">
            <ul className="card-list">
                <NewCard />
                {props.visibleCards.map((card) => (
                    <div className="member" key={Math.random().toString()}>
                        <CardDisplay
                            selected={selectedCards.includes(card)}
                            card={card}
                            handleContextMenu={contextMenuHandler}
                            handleCardSelect={cardSelectHander}
                        />
                    </div>
                ))}
            </ul>
            {isMenuOpen ? (
                <ContextMenu x={menuCoord.x} y={menuCoord.y} />
            ) : null}
        </div>
    );
};

const Overlay = styled.div`
    z-index: -1;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(255, 255, 255, 0.5);
`;

export default CardList;

