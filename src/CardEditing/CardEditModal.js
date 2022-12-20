import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import Draggable, { DraggableCore } from "react-draggable";
import { GithubPicker } from "react-color";
import {
  CardFieldName,
  CardFieldThumbnail,
  CardFieldDescription,
} from "../CardDisplay/CardDisplayStyles";
import {
  ModalContainer,
  ModalCardContainer,
  ModalHeader,
  ModalLabel,
  ModalButton,
  ModalBody,
  ModalInput,
  ModalImage,
  ModalInputButtonContainer,
} from "./CardEditModalStyles";
import TagInput from "./TagInput";
import PropertyInput from "./PropertyInput";
import { setDeck, setExistingTags } from "../Store/deckDataSlice";

const CardEditModal = (props) => {
  console.log("edit modal rerendered");

  const [dragDisabled, setDragDisabled] = useState(false);

  const dispatch = useDispatch();
  const allTags = useSelector((state) => state.deckData.existingTags);
  const allCards = useSelector((state) => state.deckData.deck);

  const placeholder = {
    card_id: -1,
    name: "",
    description: "",
    tags: [],
    properties: {},
    image: null,
    color: { r: 233, g: 233, b: 233, a: 1 },
  };
  let myCard = allCards.find((card) => card.card_id === props.card_id);
  if (myCard === undefined) {
    myCard = placeholder;
  }

  const [card, setCard] = useState(myCard);
  const [cardTags, setCardTags] = useState(
    myCard.tags.map((tag) => {
      return { label: tag, value: tag };
    })
  );
  const [imageURL, setImageURL] = useState(myCard.image);

  const saveButtonRef = useRef(null);

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
    var url = URL.createObjectURL(file);

    event.target.value = null;
    URL.revokeObjectURL(imageURL);

    setImageURL(url);
    setCard((prevState) => {
      return { ...prevState, image: url };
    });
    console.log("new image url: " + url);
  };

  const imageClearHandler = (event) => {
    URL.revokeObjectURL(imageURL);
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
    let newDeck = allCards.filter((card) => {
      return card.card_id != myCard.card_id;
    });
    let newCard = {
      ...myCard,
      name: card.name,
      description: card.description,
      image: card.image,
      color: card.color,
      tags: cardTags.map((tagObject) => {
        return tagObject.label;
      }),
    };
    newDeck.push(newCard);
    newDeck.sort((a, b) => a.card_id - b.card_id);

    dispatch(setDeck(newDeck));
    updateTagList(newCard);
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

  const updateTagList = (card) => {
    console.log("update tag handler called");
    let updatedTags = card.tags;
    let newEntries = [];
    for (let i = 0; i < updatedTags.length; i++) {
      if (allTags.indexOf(updatedTags[i]) > -1) {
        continue;
      } else {
        newEntries.push(updatedTags[i]);
      }
    }
    if (newEntries.length > 0) {
      dispatch(setExistingTags(allTags.concat(newEntries)));
    }
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
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "90%",
                  justifyContent: "left",
                  marginTop: "10px",
                }}
              >
                <ModalLabel>Tags</ModalLabel>{" "}
              </div>
              <TagInput
                tagColor={card.color}
                currValues={cardTags}
                allValues={allTags}
                setValues={setCardTags}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "90%",
                  justifyContent: "left",
                  marginTop: "10px",
                }}
              >
                <ModalLabel>Properties</ModalLabel>{" "}
              </div>

              <PropertyInput />
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
                <ModalButton onClick={saveFileHandler}>Download</ModalButton>
                <ModalButton onClick={closeModal} rightMost={true}>
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
                  {card.image && <ModalImage alt="none" src={imageURL} />}
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
                    <button onClick={onChooseImageClickHandler}>
                      Choose Image
                    </button>
                    <button onClick={imageClearHandler}>Clear</button>
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
              <div style={{ position: "absolute", top: "29.3rem" }}>
                <GithubPicker
                  onChangeComplete={colorChangeCompleteHandler}
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
