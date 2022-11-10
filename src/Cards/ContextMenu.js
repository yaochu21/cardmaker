import React, { useState } from "react";
import styled from "styled-components";

const ContextMenu = (props) => {
    const contextMenuClickHandler = (event) => {
        console.log(event);
    };

    const contextMenuCloseHandler = (event) => {
        console.log(event);
        props.handleContextMenu(event, false);
    };

    const contextMenuReOpenHandler = (event) => {
        console.log(event);
        props.handleContextMenu(event, false);
        props.handleContextMenu(event, true);
    };

    return (
        <div>
            <Overlay
                onClick={contextMenuCloseHandler}
                onContextMenu={contextMenuReOpenHandler}
            />
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

const Overlay = styled.div`
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(255, 255, 255, 0.1);
`;

export default ContextMenu;
