import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Splash from "./screens/splash";

//games
import TicTacToe from "./games/tic-tac-toe";
import MysteryWord from './games/mystery-word';
import MemoryMatch from './games/memory-match';
import Blackjack from './games/blackjack'

function App() {
  return (
    <div>
      <Router>
        <Navigation />
        <br />
        <Routes>
          <Route exact path='/' element={<Splash />} />
          <Route exact path='/tic-tac-toe' element={<TicTacToe />} />
          <Route exact path='/mystery-word' element={<MysteryWord />} />
          <Route exact path='/memory-match' element={<MemoryMatch />} />
          <Route exact path='/blackjack' element={<Blackjack />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
