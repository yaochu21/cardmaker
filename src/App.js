import CardList from "./Cards/CardList";
import Toolbar from "./Toolbar/Toolbar";

function App() {

  var cards = Array(5).fill({name:"Strike",description:"attack for 5 damage",tags:["basic"],fields:{cost:5},image:null,id:0});

  for (var i = 0; i < 5; i++) {
    cards[i]['id'] = i + 1;
    console.log(cards[i]['id']);
  }

  return (
    <div>
      <Toolbar />
      <CardList visibleCards={cards}/>
    </div>
  );
}

export default App;
