import './style.css';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function TicTacToe() {
  const [turn, setTurn] = useState('X');
  const [grid, setGrid] = useState([
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]);
  const [active, setActive] = useState(false);
  const [record, setRecord] = useState([0, 0, 0]);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [results, setResults] = useState('');

  const checkSquareValue = (x, y) => {
    if (grid[x][y] === 'X') {
      return 'ttt-x'
    } else if (grid[x][y] === 'O') {
      return 'ttt-o'
    } else {
      return 'square-idle'
    }
  }

  const checkRow = () => {
    if (grid[0][0] === turn && grid[0][1] === turn && grid[0][2] === turn) {
      return true;
    } else if (grid[1][0] === turn && grid[1][1] === turn && grid[1][2] === turn) {
      return true;
    } else if (grid[2][0] === turn && grid[2][1] === turn && grid[2][2] === turn) {
      return true;
    } else {
      return false;
    }
  }

  const checkColumn = () => {
    if (grid[0][0] === turn && grid[1][0] === turn && grid[2][0] === turn) {
      return true;
    } else if (grid[0][1] === turn && grid[1][1] === turn && grid[2][1] === turn) {
      return true;
    } else if (grid[0][2] === turn && grid[1][2] === turn && grid[2][2] === turn) {
      return true;
    } else {
      return false;
    }
  }

  const checkDiag = () => {
    if (grid[0][0] === turn && grid[1][1] === turn && grid[2][2] === turn) {
      return true;
    } else if (grid[0][2] === turn && grid[1][1] === turn && grid[2][0] === turn) {
      return true;
    } else {
      return false;
    }
  }

  const checkCats = () => {
    let open = 0;
    grid.forEach(row => {
      row.forEach(square => {
        if (square === '') {
          open++;
        }
      })
    })

    if (open === 0) {
      return true;
    } else {
      return false;
    }
  }

  const checkWin = () => {
    let copy = [...record];

    //check if there is a match on rows
    if (checkRow()) {
      //remove active game status
      setActive(false);

      //adjust record
      if (turn === 'X') {
        copy[0]++;
      } else {
        copy[1]++;
      }
      setRecord(copy);

      //display result message
      setResults(`${turn} wins!`);

      //check column
    } else if (checkColumn()) {
      setActive(false);
      if (turn === 'X') {
        copy[0]++;
      } else {
        copy[1]++;
      }
      setRecord(copy);
      setResults(`${turn} wins!`);

      //check diagonal
    } else if (checkDiag()) {
      setActive(false);
      if (turn === 'X') {
        copy[0]++;
      } else {
        copy[1]++;
      }
      setRecord(copy);
      setResults(`${turn} wins!`);

      //check cats game
    } else if (checkCats()) {
      setActive(false);
      copy[2]++;
      setRecord(copy);
      setResults(`Cats game.`);

    } else {
      //update turn
      if (turn === 'X') {
        setTurn('O');
      } else {
        setTurn('X');
      }
    }
  }

  const checkSquare = (x, y) => {
    if (error) {
      //remove error message
      setError(false);
    }

    //check if move is valid
    if (grid[x][y] === '') {
      //move valid
      //check player who performed move
      //copy grid
      let copy = [...grid];
      if (turn === 'X') {
        //update copy
        copy[x][y] = 'X';
      } else {
        copy[x][y] = 'O';
      }

      //update grid
      setGrid(copy);

      //check win conditions
      checkWin();

    } else {
      //move invalid - set error message
      setErrorMsg('This square is already taken.');
      setError(true);
    }
  }

  const newGame = () => {
    //randomly choose who starts first
    let random = Math.floor(Math.random() * 2);

    if (random === 0) {
      setTurn('X');
    } else {
      setTurn('O');
    }

    //reset grid
    setGrid([
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ]);

    //remove results
    setResults('');

    //set game active
    setActive(true);
  }

  return (
    <Container fluid>
      <div class='ttt-title'>
        <h1>Tic-Tac-Toe</h1>
        {!active ? <p>Click on New Game to get started.</p> : <p>&nbsp;</p>}
      </div>
      <Row>
        <Col>
          <div className='ttt-container'>
            <table className='ttt-table'>
              <tbody>
                {grid.map((row, x) => {
                  return (
                    <tr key={`row-${x}`} className='ttt-row'>
                      {row.map((square, y) => {
                        return (
                          <td
                            key={`square-${x}-${y}`}
                            className={grid[x][y] === '' && active ? 'ttt-square' : checkSquareValue(x, y)}
                            onClick={() => {
                              if (active) {
                                checkSquare(x, y);
                              }
                            }}
                          >
                            <div className='square-content'>
                              {square}
                            </div>
                          </td>
                        )
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Col>
        <Col>
          <div className='ttt-container'>
            <h2>Record:</h2>
            <p>{record[0]} W - {record[1]} L - {record[2]} T</p>

            {active ? <>
              {turn === 'X' ? "It's your turn." : "It's the opponents turn."}
            </> : <></>}

            {results !== '' ? <p>{results}</p> : <p>&nbsp;</p>}

            {active && error ? <p className='ttt-errorMsg'>{errorMsg}</p> : <p>&nbsp;</p>}
          </div>
        </Col>
      </Row>

      <div className='ttt-container'>
        {!active ? <>
          <Button onClick={() => newGame()}>New Game</Button>
        </> : <></>}
      </div>
    </Container>
  )
}

export default TicTacToe;