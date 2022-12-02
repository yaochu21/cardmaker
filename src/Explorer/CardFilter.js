import React, { useState, useRef, useEffect } from "react";

const CardFilter = (props) => {

    const [inputString,setInputString] = useState("");
    const [filterElements,setFilterElements] = useState({
        names: [],
        tags: [],
        propertyThreshes: []
    })

    const onInputChangeHandler = (event) => {
        const s = event.target.value;
        if (s[s.length - 1] === '\r') {
            setInputString("");
        }
        else {
            setInputString(s);
        }
    }

}

// a style component for tags (square block)
// a style component for properties
// tags are static
// properties have values
// names are strings

export default CardFilter