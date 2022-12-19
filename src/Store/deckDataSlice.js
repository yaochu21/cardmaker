import { createSlice } from "@reduxjs/toolkit";

export const deckDataSlice = createSlice({
  name: "deckData",
  initialState: {
    nextID: 1,
    deck: [
      {
        card_id: 0,
        name: "Your New Card",
        description: "Your Card Description",
        tags: ["basic"],
        properties: { cost: 5 },
        image: null,
        color: { r: 233, g: 233, b: 233, a: 1 },
      },
    ],
    visibleDeck: [
      {
        card_id: 0,
        name: "Your New Card",
        description: "Your Card Description",
        tags: ["basic"],
        properties: { cost: 5 },
        image: null,
        color: { r: 233, g: 233, b: 233, a: 1 },
      },
    ],
    existingTags: ["basic"],
    existingProperties: ["cost"],
  },
  reducers: {
    setDeck: (state, action) => {
      state.deck = action.payload;
    },
    setVisibleDeck: (state, action) => {
      state.visibleDeck = action.payload;
    },
    setExistingTags: (state, action) => {
      state.existingTags = action.payload;
    },
    setExistingProperties: (state, action) => {
      state.existingProperties = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setDeck,
  setVisibleDeck,
  setExistingTags,
  setExistingProperties,
} = deckDataSlice.actions;

export default deckDataSlice.reducer;
