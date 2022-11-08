import React, { useState } from "react";
import "./CardDisplay.css";

const CardDisplay = (props) => {

    const cardClickHandler = (event) => {
        console.log("card clicked");
    };
    
    const cardDoubleClickHandler = (event) => {
        console.log("card double clicked");
    };

    return (
        <div
            className="card-container"
            onClick={cardClickHandler}
            onDoubleClick={cardDoubleClickHandler}
        >
        </div>
    );
};

export default CardDisplay;
