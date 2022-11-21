import React, { useState, useRef, useEffect } from "react";
import JSzip from "jszip";

function ProjectLoader(props) {
    const [newDeck, setNewDeck] = useState([]);
    const [imageURLMap, setImageURLMap] = useState(new Map());

    useEffect(() => {
        let deck = [].concat(newDeck);

        if (deck.length > 0 && imageURLMap.size > 0) {
            deck.forEach((card) => {
                let url = imageURLMap.get(card.name);
                if (url) {
                    card.image = url;
                }
            });
            console.log(deck);
            props.handleLoadProject(deck);
        }
    }, [newDeck,imageURLMap]);

    const loadProject = (event) => {

        setNewDeck([]);
        setImageURLMap(new Map());

        const file = event.target.files[0];

        if (file) {

            JSzip.loadAsync(file).then((zip) => {
                zip.folder("art").forEach((path, entry) => {
                    entry.async("arraybuffer").then((content) => {
                        var buffer = new Uint8Array(content);
                        var blob = new Blob([buffer.buffer]);
                        var src = URL.createObjectURL(blob);

                        var i = entry.name.indexOf("/");
                        var j = entry.name.indexOf(".");
                        const name = entry.name.substring(i + 1, j);
                        console.log(name + ": " + src);

                        if (!(name.indexOf("MACOSX") > -1)) {
                            setImageURLMap((prevState) => {
                                let map = new Map(prevState);
                                map.set(name, src);
                                return map;
                            });
                        }
                    });
                });

                zip.file("deck.json")
                    .async("text")
                    .then((content) => {
                        const deck = JSON.parse(content);

                        setNewDeck(deck);
                        console.log(deck);
                    });
            }, null);
        }

        console.log("I'm finishing");
    };

    return (
        <div style={{ position: "absolute", top: "45%", left: "42%" }}>
            <input type="file" onChange={loadProject} />
            {/* <img src={imageURLs[1]} style={{width:"200px",height:"200px",objectFit:"cover"}} /> */}
        </div>
    );
}

export default ProjectLoader;
