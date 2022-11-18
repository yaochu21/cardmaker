import CardList from "./Cards/CardList";
import Toolbar from "./Toolbar/Toolbar";


function App() {

  var cards = Array(20).fill({card_id:1,name:"Strike",description:"Deal 5 damage",tags:["basic"],fields:{cost:5},image:null});
  
  var i = 0;
  for (i = 0; i < 20; i++) {
    cards[i] = {...cards[i],card_id:i};
  }
  console.log(cards);

  return (
    <div>
      <CardList visibleCards={cards}/>
    </div>
  );
  }

export default App;
