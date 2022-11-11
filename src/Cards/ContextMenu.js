import React, { useState } from "react";
import styled from "styled-components";

const ContextMenu = (props) => {
    const contextMenuClickHandler = (event) => {
        console.log(event);
    };

    return (
        <div>
            <ContextMenuContainer style={{ top: props.y, left: props.x }}>
                <ContextMenuButton onClick={contextMenuClickHandler}>
                    <span>Edit</span>
                </ContextMenuButton>
            </ContextMenuContainer>
        </div>
    );
};

const ContextMenuContainer = styled.div`
    position: absolute;
`;

const ContextMenuButton = styled.button`
    font-size: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 4rem;
    height: 2rem;
    background-color: white;
    border-style: solid;
    border-width: 1px;
`;

export default ContextMenu;
