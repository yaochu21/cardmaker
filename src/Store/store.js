import { configureStore } from "@reduxjs/toolkit";
import deckDataReducer from "./deckDataSlice";

export default configureStore({
  reducer: { deckData: deckDataReducer },
});