import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import styled, { css } from "styled-components";
import Draggable, { DraggableCore } from "react-draggable";
import {
    CardFieldName,
    CardFieldThumbnail,
    CardFieldDescription,
} from "./CardDisplayStyles";
import {
    ModalContainer,
    ModalHeader,
    ModalButton,
    ModalBody,
    ModalInput,
} from "./CardEditModalStyles";
import UploadAndDisplayImage from "./ImageUpload";

const CardEditModal = (props) => {
    const [dragDisabled, setDragDisabled] = useState(false);
    const [card, setCard] = useState(props.card);

    const nameInputRef = useRef();
    const desInputRef = useRef();

    const disableDrag = (event) => {
        setDragDisabled(true);
    };

    const enableDrag = (event) => {
        setDragDisabled(false);
    };

    const nameChangeHandler = (event) => {
        setCard((prevState) => {
            return { ...prevState, name: event.target.value };
        });
    };

    const descriptionChangeHandler = (event) => {
        setCard((prevState) => {
            return { ...prevState, description: event.target.value };
        });
    };

    const saveHandler = (event) => {
        props.card.name = card.name;
        props.card.description = card.description;
    };

    const saveFileHandler = (event) => {
        console.log("save to file");
        var dataStr =
            "data:text/json;charset=utf-8," +
            encodeURIComponent(JSON.stringify(card));
        var downloadAnchorNode = document.createElement("a");
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", `${card.name}.json`);
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    const closeModal = (event) => {
        props.closeCardModal();
    };

    return (
        <React.Fragment>
            {ReactDOM.createPortal(
                <Draggable disabled={dragDisabled}>
                    <ModalContainer>
                        <ModalHeader>
                            <ModalButton
                                style={{
                                    marginLeft: "0.1rem",
                                }}
                                onClick={saveHandler}
                            >
                                Save
                            </ModalButton>
                            <ModalButton
                                style={{
                                    marginRight: "auto",
                                    marginLeft: "0.1rem",
                                }}
                                onClick={saveFileHandler}
                            >
                                Download
                            </ModalButton>
                            <ModalButton onClick={closeModal}>X</ModalButton>
                        </ModalHeader>
                        <ModalBody>
                            <CardFieldName>
                                <ModalInput
                                    style={{ fontSize: "1.2rem" }}
                                    value={card.name}
                                    autoComplete="off"
                                    autoCapitalize="off"
                                    spellCheck={false}
                                    onChange={nameChangeHandler}
                                    onFocus={disableDrag}
                                    onBlur={enableDrag}
                                    ref={nameInputRef}
                                ></ModalInput>
                            </CardFieldName>
                            <CardFieldThumbnail><UploadAndDisplayImage /></CardFieldThumbnail>
                            <CardFieldDescription>
                                <ModalInput
                                    style={{ fontSize: "1.2rem" }}
                                    value={card.description}
                                    autoComplete="off"
                                    autoCapitalize="off"
                                    spellCheck={false}
                                    onChange={descriptionChangeHandler}
                                    onFocus={disableDrag}
                                    onBlur={enableDrag}
                                    ref={desInputRef}
                                ></ModalInput>
                            </CardFieldDescription>
                        </ModalBody>
                    </ModalContainer>
                </Draggable>,
                document.getElementById("modal-root")
            )}
        </React.Fragment>
    );
};

export default CardEditModal;
