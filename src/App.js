import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./navigation";
import Splash from "./splash";
import TicTacToe from "./tic-tac-toe";

function App() {
  return (
    <div>
      <Router>
        <Navigation />
        <br />
        <Routes>
          <Route exact path='/' element={<Splash />} />
          <Route exact path='/tic-tac-toe' element={<TicTacToe />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
