import React, { useState, useRef, useEffect } from "react";
import JSzip from "jszip";

function ProjectLoader(props) {
    const [newCards, setNewCards] = useState([]);
    const [newImageURLMap, setNewImageURLMap] = useState(new Map());

    useEffect(() => {
        let deck = [].concat(newCards);
        console.log(newImageURLMap);

        if (deck.length > 0 && newImageURLMap.size > 0) {
            deck.forEach((card) => {
                let url = newImageURLMap.get(card.name);
                if (url) {
                    card.image = url;
                }
            });
            console.log(deck);
            props.handleLoadProject(deck);
        }
        else if (deck.length > 0) {
            props.handleLoadProject(deck);
        }
        else {
            console.log("cards/images incomplete");
        }
    }, [newCards, newImageURLMap]);

    const loadThumbnails = async (event) => {
        const file = event.target.files[0];
        const zip = await JSzip.loadAsync(file);
        const folder = zip.folder("art");
        console.log(folder);

        const promises = [];
        const names = [];

        folder.forEach((path,entry) => {
            if (!(path.indexOf('.') === 0)) {
                console.log(path);
                promises.push(entry.async("arraybuffer"));
                names.push(path.split('.')[0]); // cardName.jpg -> cardName
            }
        });
        const contents = await Promise.all(promises);

        let map = new Map();
        for (let i = 0; i < contents.length; i++) {
            var buffer = new Uint8Array(contents[i]);
            var blob = new Blob([buffer.buffer]);
            var src = URL.createObjectURL(blob);
            
            const name = names[i];
            console.log(name + ": " + src);
            if (!(name.indexOf("MACOSX") > -1)) {
                map.set(name,src);
            }
        }
        setNewImageURLMap(map);

        /*
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
        }); */
    };

    const loadJson = (event) => {
        setNewCards([]);
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.addEventListener(
            "loadend",
            () => {
                const cards = JSON.parse(reader.result);
                console.log(cards);
                setNewCards(cards);
            },
            false
        );

        reader.readAsText(file);

        /*
        if (file) {
            JSzip.loadAsync(file).then((zip) => {
                zip.file("deck.json")
                    .async("text")
                    .then((content) => {
                        const deck = JSON.parse(content);
                        setNewCards(deck);
                        console.log(deck);
                    });
            }, null);
        } */
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
