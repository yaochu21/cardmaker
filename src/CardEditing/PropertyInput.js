import React, { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import PropertyInputDisplay from "./PropertyInputDisplay";

const PropertyInput = (props) => {

  console.log(props.currProperties);
  const [isAdding, setIsAdding] = useState(false);
  const [newInput, setNewInput] = useState("");
  const inputRef = useRef();

  const onNewInputChangeHandler = (event) => {
    setNewInput(event.target.value);
  };

  const onNewPropClickHandler = (event) => {
    setIsAdding(true);
  };

  const onKeyDownHandler = (event) => {
    if (event.key != "Enter") {
        return;
    }

    console.log("enter key pressed");
    inputRef.current.blur();

    let newProps = parsePropertyString(newInput);

    if (newProps.length > 0) {
      newProps = newProps.concat(props.currProperties);
      props.setProperties(newProps);
    }

    setIsAdding(false);
    setNewInput("");
  };

  const parsePropertyString = (s) => {
    const inputSemiColSplit = s.split(";");
    const allNewProps = [];

    for (let i = 0; i < inputSemiColSplit.length; i++) {
      let pair = inputSemiColSplit[i];
      const pairColonSplit = pair.split(":");

      if (pairColonSplit.length != 2) {
        continue;
      }

      if (+pairColonSplit[1] != +pairColonSplit[1]) {
        continue;
      }

      allNewProps.push({ label: `${pairColonSplit[0]}:${pairColonSplit[1]}`, value: pairColonSplit[0] });
    }

    return allNewProps;
  };

  return (
    <PropertyInputContainer>
      <PropertyInputDisplay sampleDisplays={props.currProperties} changeProps={props.setProperties} />
      {isAdding ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            height: "10%",
            marginTop: "5px",
          }}
        >
          <PropertyTextInput
            ref={inputRef}
            value={newInput}
            onChange={onNewInputChangeHandler}
            onKeyDown={onKeyDownHandler}
          ></PropertyTextInput>
        </div>
      ) : (
        <NewPropertyIcon onClick={onNewPropClickHandler} />
      )}
    </PropertyInputContainer>
  );
};

const PropertyInputContainer = styled.div`
  margin-top: 7px;
  width: 90%;
  display: flex;
  flex-direction: column;
`;

const NewPropertyIcon = styled.button`
  width: 100%;
  background-color: rgba(230, 230, 230, 0.9);
  border-color: transparent;
  border-radius: 3.5px;
  border-width: 1px;
  margin-top: 5px;

  &::after {
    content: "+";
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: serif;
  }

  &:hover {
    background-color: rgba(218, 218, 218, 0.9);
  }
`;

const PropertyTextInput = styled.input`
  width: 100%;
  height: 28px;
  border-style: solid;
  border-color: #787878;
  border-width: 1px;
  border-radius: 3px;
  background-color: transparent;
  padding-left: 8px;
  font-family: "Open-Sans";
  font-size: 11px;

  &:focus {
    outline: none;
    box-shadow: 0.3px 0.3px 0.3px rgba(0, 0, 0, 0.25);
  }
`;

export default PropertyInput;
