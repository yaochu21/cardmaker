import CreatableSelect from "react-select/creatable";
import styled, {css} from "styled-components";

const PropertyInputCreate = (props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "10%",
        marginTop: "5px",
      }}
    >
      <div style={{width:"50%"}}>
        <CreatableSelect
          components={{
            IndicatorSeparator: () => null,
            ClearIndicator: () => null,
            DropdownIndicator: () => null,
          }}
          isClearable
          className="basic-select"
          classNamePrefix="select"
          theme={(theme) => ({
            ...theme,
            borderRadius: "3.5px",
            fontFamily: "Open-Sans",
            colors: {
              ...theme.colors,
              primary25: "#e6e6e6",
              primary: "white",
            },
          })}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              height: "25px",
              maxHeight: "25px",
              minHeight: "25px",
              fontFamily: "Open-Sans",
              fontSize: "14px",
              backgroundColor: "#e6e6e6",
              border: "none",
              outline: "none",
              boxShadow: "0.7px 0.7px 0.7px rgba(0, 0, 0, 0.25)",
              justifyContent: "center",
              alignItems: "center",
              "&:hover": {
                outline: "none",
                boxShadow: "none",
                border: "black",
                backgroundColor: "",
              },
            }),
            valueContainer: (baseStyles, state) => ({
              ...baseStyles,
              display: "flex",
              width: "10rem",
              maxHeight: "20px",
              minHeight: "20px",
              height: "20px",
              backgroundColor: "inherit",
              borderRadius: "20px",
              maxHeight: "10rem",
              overflow: "hidden",
              marginBottom: "10px",
              justifyContent: "center",
              alignItems: "center"
            }),
            input: (baseStyles, state) => ({
              ...baseStyles,
              fontSize: "10px",
            }),
            menu: (baseStyles, state) => ({
              ...baseStyles,
              fontFamily: "Open-Sans",
              fontSize: "10px",
              top: "15px",
              height: "30px",
              marginTop: "10px",
              overflow: "hidden",
              boxShadow: "none",
            }),
            menuList: (baseStyles, state) => ({
              ...baseStyles,
              paddingTop: "none",
              paddingBottom: "none",
              fontSize: "10px",
              width: "100%",
            }),
            singleValue: (baseStyles, state) => ({
              ...baseStyles,
              borderRadius: "5px",
              fontSize: "10px",
            }),
            placeholder: (baseStyles, state) => ({
              ...baseStyles,
              fontSize: "10px",
              fontStyle: "italic",
            }),
          }}
        />
      </div>
      <PropertyTextInput></PropertyTextInput>
    </div>
  );
};

const PropertyTextInput = styled.input`
    width: 50%;
    height: 25px;
    border: none;
    background-color: #efefef;
    margin-left: 5px;
    border-radius: 1.5px;
    padding-left: 8px;
    font-family: "Open-Sans";
    font-size: 11px;

    &:focus {
        outline: none;
        background-color: #e3e3e3;
        box-shadow: 0.7px 0.7px 0.7px rgba(0, 0, 0, 0.25);
    }
`

export default PropertyInputCreate;

