import React, { useState } from "react";
import styled, { css } from "styled-components";

const ContextMenu = (props) => {
    const contextMenuClickHandler = (event) => {
        console.log(event);
        // bring up modal
    };

    return (
        <div>
            <ContextMenuContainer style={{ top: props.y, left: props.x }}>
                <TopContextMenuButton onClick={contextMenuClickHandler}>
                    <span>Edit</span>
                </TopContextMenuButton>
                <ContextMenuButton onClick={contextMenuClickHandler}>
                    <span>Delete</span>
                </ContextMenuButton>
                <ContextMenuButton onClick={contextMenuClickHandler}>
                    <span>Move</span>
                </ContextMenuButton>
            </ContextMenuContainer>
        </div>
    );
};

const ContextMenuContainer = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
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
    border-top: 0px;
`;

const TopContextMenuButton = styled(ContextMenuButton)`
    border-top: 1px;
`

export default ContextMenu;
