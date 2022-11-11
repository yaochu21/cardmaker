import React, { useState } from "react";
import "./CardDisplay.css";
import styled from "styled-components";

const CardDisplay = (props) => {

    //console.log("card display: selected: "+props.selected);

    const cardClickHandler = (event) => {
        console.log("card clicked");
        props.handleCardSelect(props.card, event.shiftKey);
    };

    const cardDoubleClickHandler = (event) => {
        console.log("card double clicked");
    };

    const openContextMenu = (event) => {
        props.handleContextMenu(event, true);
    };

    return (
        <CardContainer
            selected={props.isSelected}
            onClick={cardClickHandler}
            onDoubleClick={cardDoubleClickHandler}
            onContextMenu={openContextMenu}
        />
    );
};

const CardContainer = styled.div`
    align-self: center;
    margin: auto;
    width: 80%;
    height: 100%;
    background: rgb(222, 222, 222);
    border-color: ${(props) => (props.selected ? "blue" : "black")};
    border-style: solid;
    border-width: 0.1rem;
    box-shadow: 4px 4px 8px rgba(183, 183, 183, 0.25);
`;

export default CardDisplay;
