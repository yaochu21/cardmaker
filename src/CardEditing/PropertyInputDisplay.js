import Select from "react-select";

const PropertyInputDisplay = (props) => {
  return (
    <Select
      components={{
        DropdownIndicator: () => null,
        IndicatorSeparator: () => null,
        ClearIndicator: () => null,
        Menu: () => null,
        MenuList: () => null,
        Input: () => null,
      }}
      value={props.sampleDisplays}
      onChange={props.changeProps}
      placeholder="properties..."
      isMulti
      isClearable
      className="basic-multi-select"
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
          fontFamily: "Open-Sans",
          fontSize: "14px",
          backgroundColor: "inherit",
          borderColor: state.isFocused ? "inherit" : "inherit",
          outline: "none",
          boxShadow: "none",
          "&:hover": {
            borderColor: state.isFocused ? "inherit" : "inherit",
            outline: "none",
            boxShadow: "none",
          },
        }),
        valueContainer: (baseStyles, state) => ({
          ...baseStyles,
          display: "flex",
          width: "10rem",
          backgroundColor: "inherit",
          borderRadius: "20px",
          maxHeight: "10rem",
          overflow: "hidden",
        }),
        multiValueRemove: (baseStyles, state) => ({
          ...baseStyles,
          borderRadius: "20px",
          backgroundColor: state.isFocused ? "inherit" : "inherit",
        }),
        multiValue: (baseStyles, state) => ({
          ...baseStyles,
          borderRadius: "5px",
        }),
        input: (baseStyles, state) => ({
          ...baseStyles,
          fontSize: "10px",
        }),
        placeholder: (baseStyles, state) => ({
          ...baseStyles,
          fontSize: "10px",
          fontStyle: "italic",
        }),
      }}
    />
  );
};

export default PropertyInputDisplay;