import React, { useState } from "react";
import NewCard from "./NewCard";
import CardDisplay from "./CardDisplay";
import ContextMenu from "./ContextMenu";
import "./CardList.css";

const CardList = (props) => {
    const [selectedCards, setSelectedCards] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [menuCoord, setMenuCoord] = useState({ x: 0, y: 0 });

    const cardSelectHander = (card, shift) => {
        console.log("in cardSelectHandler");
        console.log("current selected cards:");
        console.log("(de)selecting card: "+card.card_id);
        setSelectedCards((prevState) => {
            var index = prevState.indexOf(card);
            console.log("index: "+index);
            if (index > -1) {
                console.log("deselected card");
                console.log(prevState.filter(e => e.card_id != card.card_id).map(e => e.card_id));
                return prevState.filter(e => e.card_id != card.card_id);
            }
            else {
                console.log("selected card");
                console.log([...prevState,card].map(e => e.card_id));
                return [...prevState,card];
            }
        })
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

    //console.log(props.visibleCards);

    return (
        <div className="card-list_container">
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
                <ContextMenu
                    handleContextMenu={contextMenuHandler}
                    x={menuCoord.x}
                    y={menuCoord.y}
                />
            ) : null}
        </div>
    );
};

export default CardList;
