import styled, { css } from "styled-components";

const CardFieldTemplate = styled.div(
    (props) => css`
        & {
            display: flex;
            background-color: transparent;
            border: 1px dashed black;
            border-radius: 2px;
            width: 100%;
            padding: 0.2rem;
            font-family: "Kreon";
            align-items: center;
            text-align: center;
            justify-content: center;
        }
    `
);

const CardFieldName = styled(CardFieldTemplate)`
    height: 20%;
    font-size: max(100%, 1rem);
`;

const CardFieldThumbnail = styled(CardFieldTemplate)`
    height: 40%;
`;

const CardFieldDescription = styled(CardFieldTemplate)`
    height: 40%;
    font-size: 80%;
    overflow: clip;
`;

const CardContainer = styled.div(
    (props) => css`
        & {
            display: flex;
            flex-direction: column;
            align-self: center;
            gap: 2px;
            margin: auto;
            width: 80%;
            height: 100%;
            background-color: #e6e6e6;
            border-style: solid;
            border-width: 0.1rem;
            border-radius: 4px;
            box-shadow: 4px 4px 8px rgba(183, 183, 183, 0.25);
            padding: 0.3rem;
        }

        &:hover {
            background-color: #ededed;
        }

        ${props.isSelected &&
        css`
            outline-style: solid;
            outline-color: #00bfbf;
            outline-width: 0.1rem;
            box-shadow: 0 0 10px #9ecaed;
        `}/* ${props.isSelected &&
        css`
            &::after {
                border-color: red;
                border-style: solid;
                content: "";
            }
        `} */
    `
);

export {
    CardFieldName,
    CardFieldThumbnail,
    CardFieldDescription,
    CardContainer,
};
