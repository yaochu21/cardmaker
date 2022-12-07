import { fontSize } from "@mui/system";
import React, { useState, useRef, useEffect } from "react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

const TagInput = (props) => {
    const [selectedOptions, setSelectedOptions] = useState("");

    console.log("all tags:");
    console.log(props.allTags);
    console.log("curr tags:");
    console.log(props.currTags);

    const formatCreateLabel = (input) => {
        return `${input}`;
    };

    return (
        <div style={{marginTop:"10px"}}>
            <CreatableSelect
                components={{
                    DropdownIndicator: () => null,
                    IndicatorSeparator: () => null,
                    ClearIndicator: () => null,
                }}
                defaultValue={props.currTags}
                placeholder="tags..."
                options={props.allTags.map((tag) => {return {label:tag,value:tag}})}
                onChange={props.setTags}
                isMulti
                isClearable
                createOptionPosition={"first"}
                formatCreateLabel={formatCreateLabel}
                className="basic-multi-select"
                classNamePrefix="select"
                theme={(theme) => ({
                    ...theme,
                    borderRadius: "2px",
                    fontFamily: "Kreon",
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
                        }
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
                        overflow: "scroll"
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
