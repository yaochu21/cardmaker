import React, { useState, useRef, useEffect } from "react";
import JSzip from "jszip";
import { saveAs } from 'file-saver';
import './ProjectLoader.css';

function ProjectLoader(props) {
    const [newCards, setNewCards] = useState([]);
    const [newImageURLMap, setNewImageURLMap] = useState(new Map());

    const loadDeckInputRef = useRef();
    const loadThumbnailInputRef = useRef();

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
                for (let i = 0; i < cards.length; i++) {
                    cards[i].image = null;
                }
                setNewCards(cards);
            },
            false
        );
        reader.readAsText(file);
    };

    const onRetrieveDeckButtonClicked = async (event) => {
        const deck = props.getActiveDeck();
        const deckJson = JSON.stringify(deck);
        const names = [];

        let loadURLPromises = [];
        for (let i = 0; i < deck.length; i++) {
            let card = deck[i];
            if (card.image != null) {
                console.log(card.image);
                names.push(`${card.name}.jpg`);
                loadURLPromises.push(fetch(card.image))
            }
        }

        const resources = await Promise.all(loadURLPromises);
        let loadResourcePromises = []
        for (let i = 0; i < resources.length; i++) {
            loadResourcePromises.push(resources[i].blob());
        }

        let zip = new JSzip();
        zip.file("deck.json",deckJson);
        zip.folder("art");

        const blobs = await Promise.all(loadResourcePromises);
        for (let i = 0; i < blobs.length; i++) {
            let file = await blobs[i].arrayBuffer();
            zip.folder("art").file(names[i],file);
        }

        const zipObject = await zip.generateAsync({type:"blob",compression:"DEFLATE",compressionOptions:{level:3}});        
        saveAs(zipObject,"deck.zip");
    }

    const onLoadDeckButtonClicked = (event) => {
        loadDeckInputRef.current.click();
    }

    const onLoadThumbnailButtonClick = (event) => {
        loadThumbnailInputRef.current.click();
    }

    return (
        <div className="explorer-container">
            <input type="file" id="file" onChange={loadJson} ref={loadDeckInputRef} className="hidden"/>
            <input type="file" id="file" onChange={loadThumbnails} ref={loadThumbnailInputRef} className="hidden"/>
            <div className="explorer-button-control">
                <button onClick={onLoadDeckButtonClicked} >Load Deck Json</button>
                <div className="button-divider">|</div>
                <button onClick={onLoadThumbnailButtonClick} >Load Deck Thumbnails</button>
                <div className="button-divider">|</div>
                <button onClick={onRetrieveDeckButtonClicked} >Download Deck</button>
            </div>
        </div>
    );
}

export default ProjectLoader;
