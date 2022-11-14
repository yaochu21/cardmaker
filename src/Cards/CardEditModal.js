import { toBePartiallyChecked } from "@testing-library/jest-dom/dist/matchers";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import styled, { css } from "styled-components";
import Draggable, { DraggableCore } from "react-draggable";

const CardEditModal = (props) => {
    const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);

    const closeModal = (event) => {
        props.closeCardModal();
    };

    const modalFile = (event) => {
        console.log("File");
    };

    const modalDragHandler = (event) => {
        console.log("dragging");
    };

    return (
        <React.Fragment>
            {ReactDOM.createPortal(
                <Draggable>
                    <ModalContainer x={modalPosition.x} y={modalPosition.y}>
                        <ModalHeader onDrag={modalDragHandler}>
                            <ModalButton
                                style={{
                                    marginRight: "auto",
                                    marginLeft: "3px",
                                }}
                                onClick={modalFile}
                            >
                                File
                            </ModalButton>
                            <ModalButton onClick={closeModal}>X</ModalButton>
                        </ModalHeader>
                        <ModalBody />
                    </ModalContainer>
                </Draggable>,
                document.getElementById("modal-root")
            )}
        </React.Fragment>
    );
};

const ModalContainer = styled.div(
    (props) => css`
        position: absolute;
        top: ${props.y};
        left: ${props.x};
        display: flex;
        flex-direction: column;
        border: 2px solid black;
        border-radius: 5px;
        width: 18rem;
        height: 30rem;
        background-color: #e6e6e6;
    `
);

// This doesn't have to be a separate component if performance is on the line
const ModalHeader = styled.div(
    (props) => css`
        width: 100%;
        height: 5%;
        border-bottom: 2px solid black;
        display: flex;
    `
);

const ModalBody = styled.div(
    (props) => css`
        width: 100%;
        height: 95%;
    `
);

const ModalButton = styled.button(
    (props) => css`
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 7%;
        border: none;
        background-color: inherit;
    `
);

export default CardEditModal;
