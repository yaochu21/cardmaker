import styled, { css } from "styled-components";

const SearchBar = styled.input(
    (props) => css`
        position: absolute;
        left: 10rem;
        top: 20rem;
        height: 2.6rem;
        width: 20rem;
        font-family: "Open-Sans";
        padding-left: 8px;
        outline: none;
        border-style: solid;
        border-color: #787878;
        border-width: 1.5px;
        border-radius: 5px;
        background-color: #f7f7f7;
        font-size: 13px;

        &:hover {
            box-shadow: 1.4px 1.4px 4px rgba(148, 148, 148, 0.25);
        }

        &:focus {
            box-shadow: 1.4px 1.4px 4px rgba(148, 148, 148, 0.25);
        }

        ${props.isDefault &&
        css`
            font-style: italic;
            color: rgba(0,0,0,0.5);
        `}
    `
);

export {SearchBar};
