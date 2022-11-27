import React, { useState, useRef, useEffect } from "react";
import JSzip from "jszip";

function ProjectLoader(props) {
    const [newCards, setNewCards] = useState([]);
    const [imageURLMap, setImageURLMap] = useState(new Map());

    useEffect(() => {
        let deck = [].concat(newCards);

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
    }, [newCards, imageURLMap]);

    const loadThumbnails = (event) => {
        const file = event.target.files[0];

        

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
        });
    };

    const loadJson = (event) => {
        setNewCards([]);
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsText(file);

        reader.addEventListener(
            "loadend",
            () => {
                const cards = JSON.parse(reader.result);
                console.log(cards);
                setNewCards(cards);
            },
            false
        );

        // if (file) {
        //     JSzip.loadAsync(file).then((zip) => {
        //         zip.file("deck.json")
        //             .async("text")
        //             .then((content) => {
        //                 const deck = JSON.parse(content);
        //                 setNewCards(deck);
        //                 console.log(deck);
        //             });
        //     }, null);
        // }
    };

    return (
        <div style={{ position: "absolute", top: "0%", left: "0%" }}>
            <input type="file" onChange={loadJson} />
            <input type="file" onChange={loadThumbnails} />
            {/* <img src={imageURLs[1]} style={{width:"200px",height:"200px",objectFit:"cover"}} /> */}
        </div>
    );
}

export default ProjectLoader;
