import styled, { css } from "styled-components";

const SearchBar = styled.input(
    (props) => css`
        position: absolute;
        left: 5.8rem;
        top: 6.5rem;
        height: 2.6rem;
        width: 30rem;
        font-family: "Open-Sans";
        padding-left: 8px;
        outline: none;
        border-style: solid;
        border-color: #484848;
        border-width: 1.5px;
        border-radius: 5px;
        background-color: #f7f7f7;
        font-size: 12px;

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
