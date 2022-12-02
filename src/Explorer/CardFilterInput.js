import React, { useState, useRef, useEffect } from "react";

const CardFilterInput = (props) => {
    const [inputString, setInputString] = useState("");
    const [filterElements, setFilterElements] = useState({
        plain: "",
        names: [],
        tags: [],
        propertyThreshes: [],
    });

    const onInputChangeHandler = (event) => {
        const s = event.target.value;
        setInputString(s);
    };

    const onKeyDownHandler = (event) => {
        // select drop down first
        if (event.key === 'Enter') {
            parseEnteredInput();
        }
    }

    const parseEnteredInput = () => {
        if (inputString.length <= 0) {
            return;
        }
        let segments = inputString.split(":");

    }

    return (
        <input
            onChange={onInputChangeHandler}
            onKeyDown={onKeyDownHandler}
            style={{
                height: "40px",
                width: "160px",
                borderStyle: "solid",
                position: "absolute",
                top:"40vh",
                left:"45vw"

            }}
        ></input>
    );
};

/*
    Collapsed search bar ("[name:strike][tag:attack][tag:blue][property:c>10]")
    Plain text search in collapsed (simple) search bar matches for tags and names

    Implementation Sequence:
    1. Plain text search
    2. Name search
    3. Tag Search
    4. Prop Search
    5. OR/AND (Default is AND)

*/

// a style component for tags (square block)
// a style component for properties
// tags are static
// properties have values
// names are strings

export default CardFilterInput;
