import CardList from "./Cards/CardList";
import Toolbar from "./Toolbar/Toolbar";

function App() {

  var cards = Array(5).fill({card_id:1,name:"Strike",description:"attack for 5 damage",tags:["basic"],fields:{cost:5},image:null});
  
  var i = 0;
  for (i = 0; i < 5; i++) {
    cards[i] = {...cards[i],card_id:i};
  }
  console.log(cards);

  return (
    <div>
      <Toolbar />
      <CardList visibleCards={cards}/>
    </div>
  );
}

export default App;
