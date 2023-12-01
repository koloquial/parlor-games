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
  const [roundOver, setRoundOver] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    getWordList();
  }, []);

  function getWordList() {
    fetch('https://random-word-api.vercel.app/api?words=10')
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error));
  }

  function assignWords() {
    if (data.length > 0) {
      //get random word
      let copy = [...data];
      let random = Math.floor(Math.random() * data.length);
      let temp = data[random];
      //e.g. clicker

      //set random word as an array
      temp = temp.toUpperCase();
      setWord(temp.split(''));
      //e.g. ['C', 'L', 'I', 'C', 'K', 'E', 'R']

      //add word to used words
      let usedCopy = [...usedWords];
      usedCopy.push(temp);
      setUsedWords(usedCopy);

      //remove random word from word bank
      copy.splice(random, 1);
      setData(copy);

      //add spaces for mystery word based on length
      let myst = [];
      temp.split('').forEach(letter => {
        myst.push('');
      });
      //e.g. for clicker => ['', '', '', '', '', '', '']

      //set mystery word and activate game
      setMystery(myst);
      setActive(true);
    } else {
      //round complete
    }

    //user is now able to guess letters via guess()
  }

  function guess(letter) {
    //disable button so that user does not attempt to guess same letter twice
    document.getElementById(letter).disabled = true;

    //copy mystery array and check if guess is included in word
    let copy = [...mystery];
    if (word.includes(letter)) {
      for (let i = 0; i < word.length; i++) {
        //check if letter is matched
        if (word[i] === letter) {
          //letter is matched
          copy[i] = letter;
        }
      }
      //update mystery array to include new matched letter
      setMystery(copy);

      //check to see if the player won
      checkWin(copy);

    } else {
      //guess is not included in mystery word
      //push letter into missed letters array
      let copy = [...miss];
      copy.push(letter);
      setMiss(copy);

      //subtract points available for round
      setPoints(points - 50);

      //check if missed letter array is 6 or greater
      if (copy.length >= 6) {
        //change mystery word to red
        document.getElementById('hangman-mystery-word').style.color = 'red';

        //misses are 6 or greater - game over
        gameOver();
      }

      //if hint has not been assigned - retrieve hint
      if (!hint) {
        fetchHint();
      }
    }
  }

  function revealMysteryWord() {
    let copy = [...word];
    setMystery(copy);
  }

  function fetchHint() {
    let temp = word.join('').toLowerCase();
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${temp}`)
      .then(response => response.json())
      .then(json => setHint(json))
      .catch(error => console.error(error));
  }

  function gameOver() {
    revealMysteryWord();
    //check to see if the round is still going
    //10 rounds
    if (round < 10) {
      //increment round
      setRound(round + 1);
      setRoundOver(true);
    } else {
      //round over
      setShowResults(true);
      setRoundOver(false);
      setActive(false);
    }
  }

  function checkWin(array) {
    //count the amount of blank spaces left in mystery word array
    let counter = 0;
    array.forEach(letter => {
      if (letter === '') {
        counter++;
      }
    })

    //if counter is 0 - there are no blank spaces left 
    if (counter === 0) {
      //player won
      //set word to green
      document.getElementById('hangman-mystery-word').style.color = 'green';

      //award points
      setPointsDB(pointsDB + points);

      gameOver()
    }
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

  function newGame() {
    //reset round variables
    setPoints(300);
    setMiss([]);
    setHint(null);
    setRoundOver(false);

    setTimeout(() => document.getElementById('hangman-mystery-word').style.color = 'black', 100)

    if (showResults) {
      setShowResults(false);
      setRound(1);
      setUsedWords([]);
      setPointsDB(0);
      getWordList();
    }

    assignWords();
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
              {mystery && !showResults ? <p id='hangman-mystery-word'>
                {mystery.map(letter => {
                  if (letter === '') {
                    return '_ '
                  } else {
                    return `${letter} `
                  }
                })}
              </p> : <></>}
              {showResults ? <h3>Results:</h3> : <></>}
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

      {showResults ? <div className="hangman-container">
        <p>Points: {pointsDB} / {300 * 10}</p>
        <ul className='hangman-list'>
          {usedWords.map(item => {
            return <li>{item}</li>
          })}
        </ul>
      </div> : <></>}

      <div className="hangman-container">
        {active && !roundOver ? <>
          <Button id='Q' class='btn btn-primary hangman-keyboard' onClick={() => guess('Q')}>Q</Button>
          <Button id='W' class='btn btn-primary hangman-keyboard' onClick={() => guess('W')}>W</Button>
          <Button id='E' class='btn btn-primary hangman-keyboard' onClick={() => guess('E')}>E</Button>
          <Button id='R' class='btn btn-primary hangman-keyboard' onClick={() => guess('R')}>R</Button>
          <Button id='T' class='btn btn-primary hangman-keyboard' onClick={() => guess('T')}>T</Button>
          <Button id='Y' class='btn btn-primary hangman-keyboard' onClick={() => guess('Y')}>Y</Button>
          <Button id='U' class='btn btn-primary hangman-keyboard' onClick={() => guess('U')}>U</Button>
          <Button id='I' class='btn btn-primary hangman-keyboard' onClick={() => guess('I')}>I</Button>
          <Button id='O' class='btn btn-primary hangman-keyboard' onClick={() => guess('O')}>O</Button>
          <Button id='P' class='btn btn-primary hangman-keyboard' onClick={() => guess('P')}>P</Button>
          <br />
          <Button id='A' class='btn btn-primary hangman-keyboard' onClick={() => guess('A')}>A</Button>
          <Button id='S' class='btn btn-primary hangman-keyboard' onClick={() => guess('S')}>S</Button>
          <Button id='D' class='btn btn-primary hangman-keyboard' onClick={() => guess('D')}>D</Button>
          <Button id='F' class='btn btn-primary hangman-keyboard' onClick={() => guess('F')}>F</Button>
          <Button id='G' class='btn btn-primary hangman-keyboard' onClick={() => guess('G')}>G</Button>
          <Button id='H' class='btn btn-primary hangman-keyboard' onClick={() => guess('H')}>H</Button>
          <Button id='J' class='btn btn-primary hangman-keyboard' onClick={() => guess('J')}>J</Button>
          <Button id='K' class='btn btn-primary hangman-keyboard' onClick={() => guess('K')}>K</Button>
          <Button id='L' class='btn btn-primary hangman-keyboard' onClick={() => guess('L')}>L</Button>
          <br />
          <Button id='Z' class='btn btn-primary hangman-keyboard' onClick={() => guess('Z')}>Z</Button>
          <Button id='X' class='btn btn-primary hangman-keyboard' onClick={() => guess('X')}>X</Button>
          <Button id='C' class='btn btn-primary hangman-keyboard' onClick={() => guess('C')}>C</Button>
          <Button id='V' class='btn btn-primary hangman-keyboard' onClick={() => guess('V')}>V</Button>
          <Button id='B' class='btn btn-primary hangman-keyboard' onClick={() => guess('B')}>B</Button>
          <Button id='N' class='btn btn-primary hangman-keyboard' onClick={() => guess('N')}>N</Button>
          <Button id='M' class='btn btn-primary hangman-keyboard' onClick={() => guess('M')}>M</Button>
        </> : <></>}
      </div>

      {!roundOver && !active ?
        <div className="hangman-container">
          <Button onClick={() => newGame()}>New Game</Button>
        </div> : <></>}

      {
        miss.length >= 5 && active && !roundOver ?
          <div className="hangman-container">
            <h4>Hint:</h4>
            <p>{formatHint()}</p>
          </div> : <></>
      }

      {
        roundOver ?
          <div className="hangman-container">
            <Button onClick={() => newGame()}>Next Round ({round})</Button>
          </div> : <></>
      }
    </Container >
  )

}

export default Hangman;

