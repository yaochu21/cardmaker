import { fontFamily } from "@mui/system";
import React, { useState, useRef, useEffect } from "react";
import { getIterableKeys, trim } from "../Utilities/Util";

const CardFilter = (props) => {
    const blankFilter = {
        plain: "",
        names: [],
        tags: [],
        propertyThreshes: [],
    };

    const [inputString, setInputString] = useState("");

    const onInputChangeHandler = (event) => {
        const s = event.target.value;
        setInputString(s);
        parseInputString(s);
    };

    const clearFilter = () => {
        props.updateFilter(blankFilter);
    };

    const parseInputString = (s) => {
        if (s.length <= 0) {
            clearFilter();
            return;
        }

        let newFilter = { ...blankFilter };

        // first, check for tag separators
        const inputSemiColSplit = s.split(";");

        for (let i = 0; i < inputSemiColSplit.length; i++) {
            const e = inputSemiColSplit[i];

            // check for equal sign
            const elementEqualSplit = e.split("=");

            if (elementEqualSplit.length > 1) {
                const flag = trim(elementEqualSplit[0]);
                const val = elementEqualSplit[1];

                if (val.length > 0) {
                    if (flag === "tag") {
                        newFilter.tags = [...newFilter.tags, val];
                    } else if (flag === "name") {
                        newFilter.names = [...newFilter.names, val];
                    } else if (flag == "property") {

                    }
                    continue;
                }
            }

            newFilter.plain = e;
        }

        props.updateFilter(newFilter);

    };

    const onKeyDownHandler = (event) => {
        if (event.key === "Enter") {
        }
    };

    return (
        <input
            value={inputString}
            onChange={onInputChangeHandler}
            onKeyDown={onKeyDownHandler}
            style={{
                height: "40px",
                width: "20rem",
                borderStyle: "solid",
                marginTop: "18rem",
                marginLeft: "10rem",
                fontFamily: "Open-Sans",
                paddingLeft: "8px",
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

export default CardFilter;
