import React, { useState } from "react";
import { CardContainer } from "./CardDisplayStyles";
import styled from "styled-components";

const NewCard = (props) => {
    return (
        <NewCardContainer
            color={{ r: 233, g: 233, b: 233, a: 255 }}
        ></NewCardContainer>
    );
};

const NewCardContainer = styled(CardContainer)`
    & {
        border-color: rgba(50,50,50,255);
    }
    &::before {
        content: "+";
        height: 100%;
        width: 100%;
        font-size: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: serif;
        color: rgba(210,210,210,255);
        margin-bottom: 10px;
    }
`;

export default NewCard;
