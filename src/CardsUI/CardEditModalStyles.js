import styled, { css } from "styled-components";

const ModalContainer = styled.div`
    position: absolute;
    display: flex;
    gap: 0.5rem;
    flex-direction: row;
    width: 31rem;
    height: 30rem;
    left: 50%;
    top: 50%;
    margin-left: -20rem;
    margin-top: -16rem;
`;

const ModalCardContainer = styled.div(
    (props) => css`
        border: 2px solid black;
        border-radius: 0.5rem;

        display: flex;
        flex-direction: column;
        align-items: center;

        background-color: rgba(
            ${props.color.r},
            ${props.color.g},
            ${props.color.b},
            ${props.color.a}
        );
    `
);

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
    gap: 2%;
    width: 85%;
    height: 85%;
    margin-top: 6%;
`;

const ModalButton = styled.button`
    & {
        align-items: center;
        justify-content: center;
        height: 100%;
        border: none;
        background-color: transparent;
        font-family: "Open-Sans";
        padding: none;
    }

    &:hover {
        opacity: 0.5;
    }
`;

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
    ModalHeader,
    ModalButton,
    ModalBody,
    ModalInput,
    ModalImage,
};
