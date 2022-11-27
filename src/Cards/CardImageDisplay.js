import React, { useState } from "react";
import { ModalImage } from "./CardEditModalStyles";

const CardImageDisplay = (props) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageURL,setImageURL] = useState(null);

  const removeHandler = (event) => {
    setSelectedImage(null);
    setImageURL(null);
  }

  const selectHandler = (event) => {
    var file = event.target.files[0];
    console.log(file);
    setSelectedImage(file);

    var url = URL.createObjectURL(file);
    setImageURL(url);
    props.card.image = url;
  }

  return (
    <React.Fragment>
      {selectedImage && (
        <ModalImage src={imageURL} />
      )}
      
    </React.Fragment>
  );
};

export default CardImageDisplay;