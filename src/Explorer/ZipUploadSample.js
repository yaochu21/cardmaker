import CardList from "./Cards/CardList";
import Toolbar from "./Toolbar/Toolbar";
import React, { useState, useRef, useEffect } from "react";
import JSzip from "jszip";

function ZipUploadSample() {
    const [imageURLs, setImageURLs] = useState([]);
    console.log(imageURLs);

    const fileUploadHandler = (event) => {
        const file = event.target.files[0];
        //console.log(file);

        if (file) {
            JSzip.loadAsync(file).then((zip) => {
                zip.forEach((path, entry) => {
                    console.log(entry);
                    entry.async("arraybuffer").then((content) => {
                        var buffer = new Uint8Array(content);
                        var blob = new Blob([buffer.buffer]);
                        var src = URL.createObjectURL(blob);
                        console.log(entry.name + ":" + src);

                        if (!(entry.name.indexOf("MACOSX") > -1)) {
                            setImageURLs((prevState) => {
                                return [...prevState, src];
                            });
                        }
                    });
                });
            }, null);
        }
    };

    return (
        <div
            style={{
                position: "absolute",
                top: "46%",
                left: "44%",
                fontFamily: "Open-Sans",
            }}
        >
            <input type="file" onChange={fileUploadHandler}></input>
            {imageURLs.length > 0 && (
                <img
                    src={imageURLs[0]}
                    style={{
                        width: "200px",
                        height: "200px",
                        objectFit: "cover",
                        objectPosition: "top",
                    }}
                />
            )}
        </div>
    );
}

export default ZipUploadSample;
