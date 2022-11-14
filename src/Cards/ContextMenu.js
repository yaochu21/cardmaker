import React, { useState } from "react";
import ReactDOM from "react-dom";
import styled, { css } from "styled-components";
import CardEditModal from "./CardEditModal";

const ContextMenu = (props) => {
    const contextMenuEditHandler = (event) => {
        event.stopPropagation();
        event.preventDefault();
        props.openCardModal();
    };

    const contextMenuDeleteHandler = (event) => {};

    const contextMenuMoveHandler = (event) => {};

    return (
        <React.Fragment>
            {ReactDOM.createPortal(
                <ContextMenuContainer style={{ top: props.y, left: props.x }}>
                    <ContextMenuButton onClick={contextMenuEditHandler}>
                        Edit
                    </ContextMenuButton>
                    <MidContextMenuButton onClick={contextMenuDeleteHandler}>
                        Delete
                    </MidContextMenuButton>
                    <ContextMenuButton onClick={contextMenuMoveHandler}>
                        Move
                    </ContextMenuButton>
                </ContextMenuContainer>
            ,document.getElementById("context-menu-root"))}
        </React.Fragment>
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
`;

const MidContextMenuButton = styled(ContextMenuButton)`
    border-top: none;
    border-bottom: none;
`;

export default ContextMenu;
