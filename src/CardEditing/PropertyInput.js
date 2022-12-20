import React, { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import Select from "react-select";
import PropertyInputDisplay from "./PropertyInputDisplay";
import PropertyInputCreate from "./PropertyInputCreate";

const PropertyInput = (props) => {
  let sampleDefaults = [
    { label: "mana", value: 5 },
    { label: "cost", value: 10 },
  ];
  let sampleDisplays = sampleDefaults.map((keyVal) => {
    return {
      label: `${keyVal.label}:${keyVal.value.toString()}`,
      value: keyVal.label,
    };
  });

  const [isAdding,setIsAdding] = useState(false);

  const onNewPropClickHandler = (event) => {
    setIsAdding(true);
  }

  return (
    <PropertyInputContainer>
      <PropertyInputDisplay sampleDisplays={sampleDisplays}/>
      {isAdding ? <PropertyInputCreate /> : <NewPropertyIcon onClick={onNewPropClickHandler}/> }
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
    background-color: rgba(230,230,230,0.9);
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
        background-color: rgba(218,218,218,0.9);
    }
`;

export default PropertyInput;
