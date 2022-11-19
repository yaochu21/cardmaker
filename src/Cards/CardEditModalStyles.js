import styled, { css } from "styled-components";

const ModalContainer = styled.div(
    (props) => css`
        position: absolute;
        display: flex;
        flex-direction: column;
        border: 2px solid black;
        border-radius: 0.5rem;
        width: 18rem;
        height: 30rem;
        background-color: #e6e6e6;
        margin-left: 7rem;
        margin-top: 5rem;
    `
);

const ModalHeader = styled.div(
    (props) => css`
        width: 100%;
        height: 7%;
        border-bottom: 2px solid black;
        display: flex;
        flex-direction: row;
    `
);

const ModalBody = styled.div(
    (props) => css`
        width: 100%;
        height: 96%;
    `
);

const ModalButton = styled.button(
    (props) => css`
        & {
            align-items: center;
            justify-content: center;
            height: 100%;
            border: none;
            background-color: inherit;
            font-family: "Open-Sans";
            padding: none;
        }

        &:hover {
            opacity: 0.5;
        }
    `
);

const ModalInput = styled.input(
    (props) => css`
        & {
            font-family: inherit;
            font-size: 100%;
            border: none;
            background-color: transparent;
            width: 100%;
            height: 100%;
            text-align: center;
            overflow: scroll;
            user-select: all;
             
        }

        &:hover {
            opacity: 0.6;
        }

        &:focus {
            border: none;
            outline: none;
            opacity: 1;
        }
    `
);

export { ModalContainer, ModalHeader, ModalButton, ModalBody, ModalInput };
