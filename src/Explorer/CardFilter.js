import { fontFamily } from "@mui/system";
import React, { useState, useRef, useEffect } from "react";
import Draggable, { DraggableCore } from "react-draggable";
import { getIterableKeys, trim } from "../Utilities/Util";
import { SearchBar } from "./CardFilterStyles";
import { useSelector, useDispatch } from "react-redux";
import { setVisibleDeck } from "../Store/deckDataSlice";

const CardFilter = (props) => {
  const blankFilter = {
    plain: "",
    names: [],
    tags: [],
    propertyThreshes: [],
  };

  const [inputString, setInputString] = useState("Search");
  const [isDefault, setIsDefault] = useState(true);
  const [currFilter,setCurrFilter] = useState(blankFilter);

  const fullDeck = useSelector(state => state.deckData.deck);
  const dispatch = useDispatch();

  useEffect(() => {
    updateFilter(currFilter, fullDeck);
  }, [fullDeck]);

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
    updateFilter(blankFilter);
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

    setCurrFilter(newFilter)
    updateFilter(newFilter);
  };

  const updateFilter = (newFilter, deck = null) => {
    let newVisibleDeck;
    if (deck != null) {
      newVisibleDeck = applyFilter(newFilter, deck);
    } else {
      newVisibleDeck = applyFilter(newFilter, fullDeck);
    }
    dispatch(setVisibleDeck(newVisibleDeck));
  };

  const applyFilter = (filter, deck) => {
    let newDeck = [].concat(deck);

    console.log(newDeck[0]);

    if (filter.tags.length > 0) {
      newDeck = newDeck.filter((card) => {
        for (let i = 0; i < filter.tags.length; i++) {
          let match = false;
          for (let j = 0; j < card.tags.length; j++) {
            let cardTag = card.tags[j];
            let searchTag = filter.tags[i];
            if (cardTag.indexOf(searchTag) >= 0) {
              match = true;
              break;
            }
          }

          if (!match) {
            return false;
          }
        }
        return true;
      });
    }

    if (filter.names.length > 0) {
      newDeck = newDeck.filter((card) => {
        return (
          card.name.toUpperCase() ===
          filter.names[filter.names.length - 1].toUpperCase()
        );
      });
    }

    if (filter.plain.length > 0) {
      newDeck = newDeck.filter((card) => {
        return (
          card.description.toUpperCase().indexOf(filter.plain.toUpperCase()) >
          -1
        );
      });
    }
    return newDeck;
  };

  return (
    // <Draggable defaultPosition={{x:0,y:0}}>
    <SearchBar
      isDefault={isDefault}
      value={inputString}
      onBlur={onBlurHandler}
      onFocus={onFocusHandler}
      onChange={onInputChangeHandler}
    ></SearchBar>
    // {/* </Draggable> */}
  );
};

export default CardFilter;
