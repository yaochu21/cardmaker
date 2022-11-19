import React, { useState } from "react";
import styled, { css } from "styled-components";
import {
    CardFieldName,
    CardFieldThumbnail,
    CardFieldDescription,
    CardContainer,
} from "./CardDisplayStyles";

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
            <CardFieldDescription>
                {props.card.description}
            </CardFieldDescription>
        </CardContainer>
    );
};

export default CardDisplay;
