import React, { useState } from "react";
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
    const delay = 50;

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
        >
            <CardFieldName>{props.card.name}</CardFieldName>
            <CardFieldThumbnail></CardFieldThumbnail>
            <CardFieldDescription>{props.card.description}</CardFieldDescription>
        </CardContainer>
    );
};

const CardFieldTemplate = styled.div(
    (props) => css`
        & {
            display: flex;
            background-color: inherit;
            border: 1px dashed black;
            border-radius: 2px;
            width: 100%;
            padding: 0.1rem;
            font-family: "Kreon";
            align-items: center;
            text-align: center;
            justify-content: center;
        }
    `
)

const CardFieldName = styled(CardFieldTemplate)`
    height: 20%;
    font-size: 15px;
`

const CardFieldThumbnail = styled(CardFieldTemplate)`
    height: 40%;
`

const CardFieldDescription = styled(CardFieldTemplate)`
    height: 40%;
    font-size: 12px;
`

const CardContainer = styled.div(
    (props) => css`
        & {
            display: flex;
            flex-direction: column;
            align-self: center;
            gap: 2px;
            margin: auto;
            width: 80%;
            height: 100%;
            background-color: #e6e6e6;
            border-style: solid;
            border-width: 0.1rem;
            border-radius: 4px;
            box-shadow: 4px 4px 8px rgba(183, 183, 183, 0.25);
            padding: 0.3rem;
        }

        &:hover {
            background-color: #ededed;
        }

        ${props.isSelected &&
        css`
            outline-style: solid;
            outline-color: #00bfbf;
            outline-width: 0.1rem;
            box-shadow: 0 0 10px #9ecaed;
        `}
        
        /* ${props.isSelected &&
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
