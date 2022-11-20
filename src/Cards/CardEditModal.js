import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import Draggable, { DraggableCore } from "react-draggable";
import { GithubPicker } from "react-color";
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
    ModalImage,
} from "./CardEditModalStyles";

const CardEditModal = (props) => {
    const [dragDisabled, setDragDisabled] = useState(false);
    const [card, setCard] = useState(props.card);
    const [imageURL, setImageURL] = useState(null);

    /*** Check editing card ***/
    useEffect(() => {
        console.log("CardEditModal use effect");
        if (props.card.card_id != card.card_id) {
            setCard(props.card);
        }
    })

    /*** Drag Control ***/

    const disableDrag = (event) => {
        setDragDisabled(true);
    };

    const enableDrag = (event) => {
        setDragDisabled(false);
    };

    /*** Input Control ***/

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

    /*** Color Control ***/

    const colorChangeCompleteHandler = (col) => {
        var rgba = col.rgb;
        console.log(rgba);
        setCard((prevState) => {
            return { ...prevState, color: rgba };
        });
    };

    const palette = [
        "#EB9694",
        "#FAD0C3",
        "#FEF3BD",
        "#C1E1C5",
        "#BEDADC",
        "#C4DEF6",
        "#BED3F3",
        "#D4C4FB",
        "#E9E9E9"
    ];

    const paletteWidth = "237px"

    /*** Image Control ***/

    const imageChangeHandler = (event) => {
        var file = event.target.files[0];
        console.log(file);
        var url = URL.createObjectURL(file);
        setImageURL(url);
        setCard((prevState) => {
            return { ...prevState, image: url };
        });
    };

    const imageClearHandler = (event) => {
        setImageURL(null);
        setCard((prevState) => {
            return { ...prevState, image: null };
        });
    };

    /*** Saving Control ***/

    const saveHandler = (event) => {
        props.card.name = card.name;
        props.card.description = card.description;
        props.card.image = card.url;
        props.card.color = card.color;
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

    /*** Closing Control ***/

    const closeModal = (event) => {
        props.closeCardModal();
    };

    return (
        <React.Fragment>
            {ReactDOM.createPortal(
                <Draggable disabled={dragDisabled}>
                    <ModalContainer color={card.color}>
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
                                ></ModalInput>
                            </CardFieldName>
                            <CardFieldThumbnail>
                                {card.image && (
                                    <ModalImage alt="none" src={imageURL} />
                                )}
                                <input
                                    type="file"
                                    id="thumbnail-upload"
                                    onChange={imageChangeHandler}
                                    style={{
                                        color: "transparent",
                                        position: "absolute",
                                        top: "18rem",
                                        left: "5.5rem",
                                        fontSize: "10px",
                                    }}
                                />
                                <button
                                    style={{
                                        position: "absolute",
                                        top: "18rem",
                                        left: "9.9rem",
                                        fontSize: "10px",
                                    }}
                                    onClick={imageClearHandler}
                                >
                                    Clear
                                </button>
                            </CardFieldThumbnail>
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
                                ></ModalInput>
                            </CardFieldDescription>
                        </ModalBody>
                        <div style={{ position: "absolute", top: "29.3rem" }}>
                            <GithubPicker
                                onChangeComplete={colorChangeCompleteHandler}
                                width={paletteWidth}
                                colors={palette}
                            />
                        </div>
                    </ModalContainer>
                </Draggable>,
                document.getElementById("modal-root")
            )}
        </React.Fragment>
    );
};

export default CardEditModal;
