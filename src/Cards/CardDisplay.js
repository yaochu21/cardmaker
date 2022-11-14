import React, { useState } from "react";
import "./CardDisplay.css";
import styled, { css } from "styled-components";

const CardDisplay = (props) => {
    /*console.log(
        "card display: id:" +
            props.card.card_id +
            "; selected: " +
            props.isSelected
    );*/

    let timer = 0;
    let prevent = false;
    const delay = 300;

    const cardClickHandler = (event) => {
        event.stopPropagation();
        let me = this;
        timer = setTimeout(function () {
            if (!prevent) {
                console.log("card clicked");
                props.handleCardSelect(props.card, event.shiftKey);
            }
            prevent = false;
        }, delay);
    };

    const cardDoubleClickHandler = (event) => {
        event.stopPropagation();
        clearTimeout(timer);
        prevent = true;
        console.log("card double clicked");
        props.openCardModal(props.card);
    };

    const openContextMenu = (event) => {
        event.preventDefault();
        props.handleContextMenu(event, true);
        props.handleCardSelect(props.card, event.shiftKey, true);
    };

    return (
        <CardContainer
            isSelected={props.isSelected}
            onClick={cardClickHandler}
            onDoubleClick={cardDoubleClickHandler}
            onContextMenu={openContextMenu}
        />
    );
};

const CardContainer = styled.div(
    (props) => css`
        align-self: center;
        margin: auto;
        width: 80%;
        height: 100%;
        background: rgb(222, 222, 222);
        border-style: solid;
        border-width: 0.1rem;
        box-shadow: 4px 4px 8px rgba(183, 183, 183, 0.25);
        ${props.isSelected &&
        css`
            outline-style: solid;
            outline-color: #00bfbf;
            outline-width: 0.1rem;
            box-shadow: 0 0 10px #9ecaed;
        `}/* ${props.isSelected &&
        css`
            &::after {
                border-color: red;
                border-style: solid;
                content: "";
            }
        `} */
    `
);

export default CardDisplay;
