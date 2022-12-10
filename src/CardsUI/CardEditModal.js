import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { saveAs } from "file-saver";
import Draggable, { DraggableCore } from "react-draggable";
import { GithubPicker } from "react-color";
import {
    CardFieldName,
    CardFieldThumbnail,
    CardFieldDescription,
} from "../Cards/CardDisplayStyles";
import {
    ModalContainer,
    ModalCardContainer,
    ModalLabel,
    ModalHeader,
    ModalButton,
    ModalBody,
    ModalInput,
    ModalImage,
    ModalInputButtonContainer,
} from "./CardEditModalStyles";
import TagInput from "../Explorer/TagInput";

const CardEditModal = (props) => {
    const [dragDisabled, setDragDisabled] = useState(false);
    const [card, setCard] = useState(props.card);
    const [imageURL, setImageURL] = useState(props.card.image);
    const [tags, setTags] = useState(
        props.card.tags.map((tag) => {
            return { label: tag, value: tag };
        })
    );

    const saveButtonRef = useRef(null);

    /*** Check editing card ***/
    useEffect(() => {
        // console.log("CardEditModal use effect");
        // console.log(props.card);
        if (props.card.card_id != card.card_id) {
            setCard(props.card);
            setImageURL(props.card.image);
        }
    },[props.card]);

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
        "#E9E9E9",
    ];

    const paletteWidth = "237px";

    /*** Image Control ***/

    const imageInputRef = useRef();

    const onChooseImageClickHandler = (event) => {
        imageInputRef.current.click();
    };

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

    const enterKeyHandler = (event) => {
        if (event.key === "Enter") {
            saveButtonRef.current.click();
        }
    };

    const saveHandler = (event) => {
        props.card.name = card.name;
        props.card.description = card.description;
        props.card.image = card.url;
        props.card.color = card.color;
        props.card.tags = tags.map((tagObject) => {
            return tagObject.label;
        });
        props.handleTagUpdate(props.card);
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
                    <ModalContainer onKeyDown={enterKeyHandler}>
                        <ModalCardContainer
                            color={{ r: 243, g: 243, b: 243, a: 255 }}
                            style={{
                                marginTop: "7%",
                                width: "12rem",
                                height: "93%",
                                borderStyle: "dashed",
                            }}
                        >
                            <TagInput
                                tagColor={card.color}
                                currTags={tags}
                                allTags={props.activeTags}
                                setTags={setTags}
                            />
                        </ModalCardContainer>
                        <ModalCardContainer color={card.color}>
                            <ModalHeader>
                                <ModalButton
                                    onClick={saveHandler}
                                    ref={saveButtonRef}
                                    leftMost={true}
                                >
                                    Save
                                </ModalButton>
                                <ModalButton onClick={saveFileHandler}>
                                    Download
                                </ModalButton>
                                <ModalButton
                                    onClick={closeModal}
                                    rightMost={true}
                                >
                                    X
                                </ModalButton>
                            </ModalHeader>

                            <ModalBody>
                                <CardFieldName>
                                    <ModalInput
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
                                    <ModalInputButtonContainer>
                                        <input
                                            type="file"
                                            onChange={imageChangeHandler}
                                            ref={imageInputRef}
                                            style={{
                                                opacity: 0,
                                                position: "absolute",
                                                top: "100vh",
                                            }}
                                        />
                                        <button
                                            onClick={onChooseImageClickHandler}
                                        >
                                            Choose Image
                                        </button>
                                        <button onClick={imageClearHandler}>
                                            Clear
                                        </button>
                                    </ModalInputButtonContainer>
                                </CardFieldThumbnail>
                                <CardFieldDescription>
                                    <ModalInput
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
                            <div
                                style={{ position: "absolute", top: "29.3rem" }}
                            >
                                <GithubPicker
                                    onChangeComplete={
                                        colorChangeCompleteHandler
                                    }
                                    width={paletteWidth}
                                    colors={palette}
                                />
                            </div>
                        </ModalCardContainer>
                    </ModalContainer>
                </Draggable>,
                document.getElementById("modal-root")
            )}
        </React.Fragment>
    );
};

export default CardEditModal;
