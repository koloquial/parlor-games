import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Splash from "./screens/splash";
import TicTacToe from "./games/tic-tac-toe";
import Hangman from './games/hangman';
import MemoryMatch from './games/memory-match';

function App() {
  return (
    <div>
      <Router>
        <Navigation />
        <br />
        <Routes>
          <Route exact path='/' element={<Splash />} />
          <Route exact path='/tic-tac-toe' element={<TicTacToe />} />
          <Route exact path='/hangman' element={<Hangman />} />
          <Route exact path='/memory-match' element={<MemoryMatch />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
