import './styles.css';
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function Hangman() {
  const [data, setData] = useState(null);
  const [mystery, setMystery] = useState([]);
  const [word, setWord] = useState([]);
  const [active, setActive] = useState(false);
  const [miss, setMiss] = useState([]);
  const [hint, setHint] = useState(null);
  const [points, setPoints] = useState(300);
  const [pointsDB, setPointsDB] = useState(0);
  const [usedWords, setUsedWords] = useState([]);
  const [round, setRound] = useState(1);

  useEffect(() => {
    fetch('https://random-word-api.vercel.app/api?words=10')
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error));
  }, []);

  function assignWords() {
    //reset round variables
    setPoints(300);
    setMiss([]);
    setHint(null);

    if (data.length > 0) {
      //get random word
      let copy = [...data];
      let random = Math.floor(Math.random() * data.length);
      let temp = data[random];

      //set random word
      temp = temp.toUpperCase();
      setWord(temp.split(''));

      //add word to used words
      let usedCopy = [...usedWords];
      usedCopy.push(temp);

      //remove random word from word bank
      copy.splice(random, 1);
      setData(copy);

      //add spaces for mystery word based on length
      let myst = [];
      temp.split('').forEach(letter => {
        myst.push('');
      });

      //set mystery word and activate game
      setMystery(myst);
      setActive(true);
    } else {
      //round complete
      alert('round complete')
    }
  }

  function fetchHint() {
    let temp = word.join('').toLowerCase();
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${temp}`)
      .then(response => response.json())
      .then(json => setHint(json))
      .catch(error => console.error(error));
  }

  function checkWin() {
    let counter = 0;
    mystery.forEach(letter => {
      if (letter === '') {
        counter++;
      }
    })

    if (counter === 0 || miss.length >= 6) {
      //game over
      setPointsDB(pointsDB + points);
      if (round < 10) {
        setRound(round + 1);
      }
      setActive(false);
    }
  }

  function guess(letter) {
    document.getElementById(letter).disabled = true;

    let copy = [...mystery];

    if (word.includes(letter)) {
      for (let i = 0; i < word.length; i++) {
        if (word[i] === letter) {
          console.log('matched letter');
          copy[i] = letter;
        }
      }
      setMystery(copy);

    } else {
      let copy = [...miss];
      copy.push(letter);
      setMiss(copy);
      setPoints(points - 50);
      if (copy.length >= 6) {
        setActive(false);
      }
    }

    if (!hint) {
      fetchHint();
    }

    checkWin();
  }

  function formatHint() {
    try {
      let temp = hint[0].meanings[0].definitions[0].definition;
      if (temp) {
        return temp;
      } else {
        return 'No hint available.'
      }
    } catch (e) {
      return 'No hint available.'
    }
  }

  return (
    <Container fluid>
      <div className="hangman-title">
        <h1>Hangman</h1>
        {!active ?
          <p>Click on New Game to start.</p>
          :
          <p>
            <b>Round:</b> {round} / 10 |&nbsp;
            <b>Total Points:</b> {pointsDB} |&nbsp;
            <b>Round Points:</b> {points}
          </p>
        }
      </div>
      {data ?
        <Row>
          <Col xs={12} sm={12} md={6} lg={6}>
            <h4>&nbsp;</h4>
            <div className="hangman-container">
              {mystery ? <>
                {mystery.map(letter => {
                  if (letter === '') {
                    return '_ '
                  } else {
                    return `${letter} `
                  }
                })}
              </> : <></>}
            </div>
          </Col>
          <Col xs={12} sm={12} md={6} lg={6}>
            <div className="hangman-container">
              {active ? <>
                <h4>Guesses</h4>
                {miss.map((guess, index) => {
                  return (
                    <span
                      key={`guess-${index}`}
                      style={{ display: 'inline-block' }}>{guess}&nbsp;
                    </span>)
                })}
              </> : <></>}
            </div>
          </Col>
        </Row> : <p>Loading...</p>
      }

      <div className="hangman-container">
        {active ? <>
          <Button id='Q' onClick={() => guess('Q')}>Q</Button>
          <Button id='W' onClick={() => guess('W')}>W</Button>
          <Button id='E' onClick={() => guess('E')}>E</Button>
          <Button id='R' onClick={() => guess('R')}>R</Button>
          <Button id='T' onClick={() => guess('T')}>T</Button>
          <Button id='Y' onClick={() => guess('Y')}>Y</Button>
          <Button id='U' onClick={() => guess('U')}>U</Button>
          <Button id='I' onClick={() => guess('I')}>I</Button>
          <Button id='O' onClick={() => guess('O')}>O</Button>
          <Button id='P' onClick={() => guess('P')}>P</Button>
          <br />
          <Button id='A' onClick={() => guess('A')}>A</Button>
          <Button id='S' onClick={() => guess('S')}>S</Button>
          <Button id='D' onClick={() => guess('D')}>D</Button>
          <Button id='F' onClick={() => guess('F')}>F</Button>
          <Button id='G' onClick={() => guess('G')}>G</Button>
          <Button id='H' onClick={() => guess('H')}>H</Button>
          <Button id='J' onClick={() => guess('J')}>J</Button>
          <Button id='K' onClick={() => guess('K')}>K</Button>
          <Button id='L' onClick={() => guess('L')}>L</Button>
          <br />
          <Button id='Z' onClick={() => guess('Z')}>Z</Button>
          <Button id='X' onClick={() => guess('X')}>X</Button>
          <Button id='C' onClick={() => guess('C')}>C</Button>
          <Button id='V' onClick={() => guess('V')}>V</Button>
          <Button id='B' onClick={() => guess('B')}>B</Button>
          <Button id='N' onClick={() => guess('N')}>N</Button>
          <Button id='M' onClick={() => guess('M')}>M</Button>
        </> : <Button onClick={() => assignWords()}>New Game</Button>}
      </div>

      {miss.length >= 5 && active ?
        <div className="hangman-container">
          <h4>Hint:</h4>
          <p>{formatHint()}</p>
        </div> : <></>}
    </Container >
  )

}

export default Hangman;

