import CardList from "./Cards/CardList";
import Toolbar from "./Toolbar/Toolbar";
import styled from "styled-components";


function App() {

  var cards = Array(5).fill({card_id:1,name:"Strike",description:"attack for 5 damage",tags:["basic"],fields:{cost:5},image:null});
  
  var i = 0;
  for (i = 0; i < 5; i++) {
    cards[i] = {...cards[i],card_id:i};
  }
  console.log(cards);

  const handleOverlayClick = (event) => {
    console.log("overlay clicked");
  }

  return (
    <div>
      <Overlay onClick={handleOverlayClick}>
        <CardList visibleCards={cards}/>
      </Overlay>
    </div>
  );
}

const Overlay = styled.div`
    z-index: -1;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(255, 255, 255, 0.5);
`;

export default App;
