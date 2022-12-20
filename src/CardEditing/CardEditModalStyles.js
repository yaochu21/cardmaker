import styled, { css } from "styled-components";

const ModalContainer = styled.div`
    position: absolute;
    display: flex;
    gap: 0.5rem;
    flex-direction: row;
    width: 31rem;
    height: 30rem;
    left: 7.5rem;
    top: 11.8rem;
`;

const ModalCardContainer = styled.div(
    (props) => css`
        border: 2px solid black;
        border-radius: 0.5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 18rem;
        height: 100%;

        background-color: rgba(
            ${props.color.r},
            ${props.color.g},
            ${props.color.b},
            ${props.color.a}
        );
    `
);

const ModalLabel = styled.div`
    font-size: 12px;
    font-family: "Open-Sans";
`;

const ModalHeader = styled.div`
    width: 100%;
    height: 7%;
    border-bottom: 2px solid black;
    display: flex;
    flex-direction: row;
`;

const ModalBody = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 85%;
    height: 85%;
    margin-top: 6%;
`;

const ModalInputButtonContainer = styled.div`
    position: absolute;
    top: 18.15rem;
    left: 17.7rem;
    display: flex;
    flex-direction: row;
    gap: 2px;

    & > button {
        height: 1rem;
        font-size: 0.6rem;
    }
`;

const ModalButton = styled.button(
    (props) => css`
        align-items: center;
        justify-content: center;
        height: 100%;
        border: none;
        background-color: transparent;
        font-family: "Open-Sans";
        padding: none;

        ${props.leftMost &&
        css`
            margin-left: 0.3rem;
        `}
        ${props.rightMost &&
        css`
            margin-left: auto;
            margin-right: 0.2rem;
        `}

        &:hover {
            opacity: 0.5;
        }
    `
);

const ModalInput = styled.input(
    (props) => css`
        & {
            font-family: inherit;
            font-size: 1.2rem;
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

const ModalImage = styled.div(
    (props) => css`
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: top;
        background-image: url(${props.src});
        background-size: cover;
    `
);

export {
    ModalContainer,
    ModalCardContainer,
    ModalInputButtonContainer,
    ModalLabel,
    ModalHeader,
    ModalButton,
    ModalBody,
    ModalInput,
    ModalImage,
};
