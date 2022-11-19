import {createGlobalStyle} from "styled-components";
import KreonWoff from "../Assets/Kreon.woff";
import OpenSansWoff from "../Assets/OpenSans.woff";


const FontStyles = createGlobalStyle`
  @font-face {
    font-family: "Kreon";
    font-style: normal;
    font-weight: 400;
    src: url(${KreonWoff});
  }

  @font-face {
    font-family: "Open-Sans";
    font-style: normal;
    font-weight: 400;
    src: url(${OpenSansWoff});
  }
`
export default FontStyles;