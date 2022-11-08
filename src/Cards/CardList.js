import React, { useState } from "react";
import NewCard from "./NewCard";
import CardDisplay from "./CardDisplay";
import "./CardList.css";

const CardList = (props) => {

    const [selectedCards,setSelectedCards] = useState([]);

    const clearSelectedCards = () => {
        setSelectedCards([]);
    }


    return (
        <div className="card-list_container">
            <ul className="card-list">
                <NewCard />
                {props.visibleCards.map((card) => (
                    <div className="member" key={Math.random().toString()}>
                        <CardDisplay
                            name={card.name}
                            tags={card.tags}
                            description={card.description}
                            fields={card.fields}
                            image={card.image}
                            id={card.id}
                        />
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default CardList;
