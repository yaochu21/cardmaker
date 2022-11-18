import {createGlobalStyle} from "styled-components"
import KreonWoff from "../Assets/Kreon.woff"

const FontStyles = createGlobalStyle`
  @font-face {
    font-family: "Kreon";
    font-style: normal;
    font-weight: 400;
    src: url(${KreonWoff});
  }
`
export default FontStyles;