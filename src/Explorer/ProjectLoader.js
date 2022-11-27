import React, { useState, useRef, useEffect } from "react";
import JSzip from "jszip";
import { saveAs } from 'file-saver';

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
            let buffer = new Uint8Array(contents[i]);
            let blob = new Blob([buffer.buffer]);
            let src = URL.createObjectURL(blob);
            
            const name = names[i];
            console.log(name + ": " + src);
            if (!(name.indexOf("MACOSX") > -1)) {
                map.set(name,src);
            }
        }
        setNewImageURLMap(map);
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
    };

    const retrieveActiveDeck = async (event) => {
        const deck = props.getActiveDeck();
        const deckJson = JSON.stringify(deck);

        let loadURLPromises = [];
        for (let i = 0; i < deck.length; i++) {
            let card = deck[i];
            if (card.image != null) {
                console.log(card.image);
                loadURLPromises.push(fetch(card.image))
                // let imageBlob = new Blob([card.image],{type:"image"});
                // let imageFile = new File([card.image],`${card.name}.jpg`,{type:"image"});
                // imageFiles.push(imageBlob);
            }
        }

        const resources = await Promise.all(loadURLPromises);
        for (let i = 0; i < resources.length; i++) {
            let blob = await (await resources[i].blob()).arrayBuffer();
        }


        // let imageFiles = []
        // console.log(imageFiles);

        // let zip = new JSzip();
        // zip.file("deck.json",deckJson);
        // zip.folder("art");

        // for (let i = 0; i < imageFiles.length; i++) {
        //     let image = imageFiles[i];
        //     zip.folder("art").file(image.name,image);
        // }

        // const zipObject = await zip.generateAsync({type:"blob",compression:"DEFLATE",compressionOptions:{level:3}});        
        // saveAs(zipObject,"deck.zip");
    }

    return (
        <div style={{ position: "absolute", top: "0%", left: "0%" }}>
            <input type="file" onChange={loadJson} />
            <input type="file" onChange={loadThumbnails} />
            <button onClick={retrieveActiveDeck}>Get Active Deck</button>
        </div>
    );
}

export default ProjectLoader;
