import { fontSize } from "@mui/system";
import React, { useState, useRef, useEffect } from "react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

const TagInput = (props) => {
    const [selectedOptions, setSelectedOptions] = useState("");

    let options = [
        { value: "basic", label: "basic" },
        { value: "advanced", label: "advanced" },
    ];

    const formatCreateLabel = (input) => {
        return `${input}`;
    };

    const onChangeHandler = (input) => {

    }

    return (
        <div style={{ position: "absolute", top: "40vh", left: "45vw" }}>
            <CreatableSelect
                components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null, ClearIndicator:() => null }}
                placeholder="tags..."
                options={options}
                onChange={setSelectedOptions}
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
                    }),
                    menu: (baseStyles, state) => ({
                        ...baseStyles,
                        fontFamily: "Open-Sans",
                        fontSize: "14px",
                    }),
                    valueContainer: (baseStyles,state) => ({
                        ...baseStyles,
                        display: "flex",
                        width: "10rem"
                    }),
                    multiValueRemove: (baseStyles,state) => ({
                        ...baseStyles,
                        backgroundColor: state.isFocused ? 'inherit' : 'inherit'
                    })
                }}
            />
        </div>
    );
};

export default TagInput;
