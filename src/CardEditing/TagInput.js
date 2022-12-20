import CreatableSelect from "react-select/creatable";

const TagInput = (props) => {
    const formatCreateLabel = (input) => {
        return `${input}`;
    };

    return (
        <div style={{marginTop:"7px",width:"90%"}}>
            <CreatableSelect
                components={{
                    DropdownIndicator: () => null,
                    IndicatorSeparator: () => null,
                    ClearIndicator: () => null,
                }}
                defaultValue={props.currValues}
                placeholder="tags..."
                options={props.allValues.map((tag) => {return {label:tag,value:tag}})}
                onChange={props.setValues}
                isMulti
                isClearable
                createOptionPosition={"first"}
                formatCreateLabel={formatCreateLabel}
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
                        "&:hover":{
                            borderColor: state.isFocused ? "inherit" : "inherit",
                            outline: "none",
                            boxShadow: "none"
                        },
                    }),
                    menu: (baseStyles, state) => ({
                        ...baseStyles,
                        fontFamily: "Open-Sans",
                        fontSize: "14px",
                        marginTop: "1px"
                    }),
                    menuList: (baseStyles,state) => ({
                        ...baseStyles,
                        paddingTop: "none",
                        paddingBottom: "none",
                        fontSize: "12px"
                    }),
                    valueContainer: (baseStyles, state) => ({
                        ...baseStyles,
                        display: "flex",
                        width: "10rem",
                        backgroundColor: "inherit",
                        borderRadius: "20px",
                        maxHeight: "10rem",
                        overflow: "hidden"
                    }),
                    multiValueRemove: (baseStyles, state) => ({
                        ...baseStyles,
                        borderRadius: "20px",
                        backgroundColor: state.isFocused
                            ? "inherit"
                            : "inherit",
                    }),
                    multiValue: (baseStyles, state) => ({
                        ...baseStyles,
                        borderRadius: "5px",
                        backgroundColor: `rgba(${props.tagColor.r},${props.tagColor.g},${props.tagColor.b},1)`
                    }),
                    input: (baseStyles,state) => ({
                        ...baseStyles,
                        fontSize: "12px"
                    }),
                    placeholder: (baseStyles,state) => ({
                        ...baseStyles,
                        fontSize: "12px",
                        fontStyle: "italic"
                    }),
                    
                }}
            />
        </div>
    );
};

export default TagInput;
