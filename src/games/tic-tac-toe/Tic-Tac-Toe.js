import './style.css';
import { useState, useEffect } from 'react';
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

  useEffect(() => {
    if (turn === 'O' && active) {
      calculateMove();
    }
  })

  const calculateMove = () => {
    //calculate defense positions
    let rowOption = defenseRow('X');
    let columnOption = defenseColumn('X');
    let diagonalOption = defenseDiagonal('X');

    let strikeRowOption = defenseRow('O');
    let strikeColumnOption = defenseColumn('O');
    let strikeDiagonalOption = defenseDiagonal('O');

    //calculate strike options
    if (strikeRowOption) {
      checkSquare(strikeRowOption[0], strikeRowOption[1])
    } else if (strikeColumnOption) {
      checkSquare(strikeColumnOption[0], strikeColumnOption[1])
    } else if (strikeDiagonalOption) {
      checkSquare(strikeDiagonalOption[0], strikeDiagonalOption[1])

      //calculate defense options
    } else if (rowOption) {
      checkSquare(rowOption[0], rowOption[1])
    } else if (columnOption) {
      checkSquare(columnOption[0], columnOption[1])
    } else if (diagonalOption) {
      checkSquare(diagonalOption[0], diagonalOption[1])


    } else {
      calculateRandomMove();
    }
  }

  const calculateRandomMove = () => {
    let valid = false;

    let randX;
    let randY;
    while (!valid) {
      randX = Math.floor(Math.random() * 3);
      randY = Math.floor(Math.random() * 3);

      if (grid[randX][randY] === '') {
        valid = true;
      }
    }
    checkSquare(randX, randY)
  }

  const defenseRow = (letter) => {
    //check row 0
    if (grid[0][0] === letter && grid[0][1] === letter && grid[0][2] === '') {
      return [0, 2];
    } else if (grid[0][0] === letter && grid[0][1] === '' && grid[0][2] === letter) {
      return [0, 1]
    } else if (grid[0][0] === '' && grid[0][1] === letter && grid[0][2] === letter) {
      return [0, 0]
    }

    //check row 1
    else if (grid[1][0] === letter && grid[1][1] === letter && grid[1][2] === '') {
      return [1, 2];
    } else if (grid[1][0] === letter && grid[1][1] === '' && grid[1][2] === letter) {
      return [1, 1];
    } else if (grid[1][0] === '' && grid[1][1] === letter && grid[1][2] === letter) {
      return [1, 0];
    }

    //check row 2
    else if (grid[2][0] === letter && grid[2][1] === letter && grid[2][2] === '') {
      return [2, 2];
    } else if (grid[2][0] === letter && grid[2][1] === '' && grid[2][2] === letter) {
      return [2, 1];
    } else if (grid[2][0] === '' && grid[2][1] === letter && grid[2][2] === letter) {
      return [2, 0]
    } else {
      return null;
    }
  }

  const defenseColumn = (letter) => {
    //check column 0
    if (grid[0][0] === letter && grid[1][0] === letter && grid[2][0] === '') {
      return [2, 0];
    } else if (grid[0][0] === letter && grid[1][0] === '' && grid[2][0] === letter) {
      return [1, 0]
    } else if (grid[0][0] === '' && grid[1][0] === letter && grid[2][0] === letter) {
      return [0, 0]
    }

    //check column 1
    else if (grid[0][1] === letter && grid[1][1] === letter && grid[2][1] === '') {
      return [2, 1];
    } else if (grid[0][1] === letter && grid[1][1] === '' && grid[2][1] === letter) {
      return [1, 1];
    } else if (grid[0][1] === '' && grid[1][1] === letter && grid[2][1] === letter) {
      return [0, 1];
    }

    //check column 2
    else if (grid[0][2] === letter && grid[1][2] === letter && grid[2][2] === '') {
      return [2, 2];
    } else if (grid[0][2] === letter && grid[1][2] === '' && grid[2][2] === letter) {
      return [1, 2];
    } else if (grid[0][2] === '' && grid[1][2] === letter && grid[2][2] === letter) {
      return [0, 2]
    } else {
      return null;
    }
  }

  const defenseDiagonal = (letter) => {
    //check diag 1
    if (grid[0][0] === letter && grid[1][1] === letter && grid[2][2] === '') {
      return [2, 2];
    } else if (grid[0][0] === letter && grid[1][1] === '' && grid[2][2] === letter) {
      return [1, 1]
    } else if (grid[0][0] === '' && grid[1][1] === letter && grid[2][2] === letter) {
      return [0, 0]
    }
    //check diag 2
    else if (grid[2][0] === letter && grid[1][1] === letter && grid[0][2] === '') {
      return [0, 2]
    } else if (grid[2][0] === letter && grid[1][1] === '' && grid[0][2] === letter) {
      return [1, 1]
    } else if (grid[2][0] === '' && grid[1][1] === letter && grid[0][2] === letter) {
      return [2, 0]
    } else {
      return null;
    }
  }

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
      <div className='ttt-title'>
        <h2>Tic-Tac-Toe</h2>
        {!active ?
          <p>Click on New Game to start.</p>
          :
          <p>
            {turn === 'X' ? "It's your turn." : "It's the opponents turn."}
          </p>
        }
      </div>
      <Row>
        <Col xs={12} sm={12} md={6} lg={6}>
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
                              if (active && turn !== 'O') {
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
        <Col xs={12} sm={12} md={6} lg={6}>
          <div className='ttt-container'>
            <h5>Record:</h5>
            <p>{record[0]}W - {record[1]}L - {record[2]}T</p>

            {results !== '' ? <p>{results}</p> : <p>&nbsp;</p>}

            {active && error ? <p className='ttt-errorMsg'>{errorMsg}</p> : <p>&nbsp;</p>}
          </div>
        </Col>
      </Row>

      <div className='ttt-container'>
        {!active ? <Button onClick={() => newGame()}>New Game</Button> : <></>}
      </div>
    </Container>
  )
}

export default TicTacToe;