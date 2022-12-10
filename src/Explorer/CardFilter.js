import { fontFamily } from "@mui/system";
import React, { useState, useRef, useEffect } from "react";
import Draggable, { DraggableCore } from "react-draggable";
import { getIterableKeys, trim } from "../Utilities/Util";
import { SearchBar } from "./CardFilterStyles";

const CardFilter = (props) => {
    const blankFilter = {
        plain: "",
        names: [],
        tags: [],
        propertyThreshes: [],
    };

    const [inputString, setInputString] = useState("Search");
    const [isDefault, setIsDefault] = useState(true);

    const onBlurHandler = (event) => {
        if (inputString.length <= 0) {
            setInputString("Search");
            setIsDefault(true);
        }
    };

    const onFocusHandler = (event) => {
        if (isDefault) {
            setInputString("");
            setIsDefault(false);
        }
    };

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
        // <Draggable defaultPosition={{x:0,y:0}}>
            <SearchBar
                isDefault={isDefault}
                value={inputString}
                onBlur={onBlurHandler}
                onFocus={onFocusHandler}
                onChange={onInputChangeHandler}
                onKeyDown={onKeyDownHandler}
            ></SearchBar>
        // {/* </Draggable> */}
    );
};

export default CardFilter;
