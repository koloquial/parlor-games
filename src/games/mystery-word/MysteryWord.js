import './styles.css';
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function MysteryWord() {
  const [wordList, setWordList] = useState([]);
  const [hint, setHint] = useState(null);
  const [active, setActive] = useState(false);
  const [round, setRound] = useState(1);
  const [loading, setLoading] = useState(false);
  const [mysteryWord, setMysteryWord] = useState('');
  const [usedWords, setUsedWords] = useState([]);
  const [guesses, setGuesses] = useState([]);
  const [dashes, setDashes] = useState([]);
  const [pointsAvailable, setPointsAvailable] = useState(300);
  const [totalPoints, setTotalPoints] = useState(0);
  const [endRound, setEndRound] = useState(false);
  const [result, setResult] = useState('');
  const [endGame, setEndGame] = useState(false);

  function fetchWordList() {
    fetch('https://random-word-api.vercel.app/api?words=10')
      .then(response => response.json())
      .then(json => { setWordList(json); setLoading(false); })
      .catch(error => console.error(error));
  }

  useEffect(() => {
    if (!loading && wordList.length > 0) {
      assignMysteryWord();
    }
  }, [loading])

  function fetchHint(word) {
    let temp = word.toLowerCase();
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${temp}`)
      .then(response => response.json())
      .then(json => setHint(json))
      .catch(error => console.error(error));
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

  function assignMysteryWord() {
    //get random word from wordList
    let randomNumber = Math.floor(Math.random() * wordList.length);
    let randomWord = wordList[randomNumber].toUpperCase();

    //split randomWord into an array
    //e.g. ['E', 'X', 'A', 'M', 'P', 'L', 'E']
    let randomWordArray = randomWord.split('');

    //set randomWordArray to mysteryWord
    setMysteryWord(randomWordArray);

    //fetch hint
    fetchHint(randomWord);

    //add mystery word to used words
    let copyUsedWords = [...usedWords];
    copyUsedWords.push(randomWord);
    setUsedWords(copyUsedWords);

    //remove mysteryWord from wordList
    let copyWordList = [...wordList];
    copyWordList.splice(randomNumber, 1);
    setWordList(copyWordList);

    //assign dashes
    let dashArray = [];
    for (let i = 0; i < randomWord.length; i++) {
      dashArray.push('_');
    }
    setDashes(dashArray);

    setTimeout(() => document.getElementById('dash-container').style.color = 'black', 100)

    //if game is not active, set to true
    //will only be false at start of game
    if (!active) {
      setActive(true);
    }
  }

  function newGame() {
    //set loading true
    setLoading(true);

    fetchWordList();

    //reset end round to false
    setEndRound(false);

    //reset endgame to false
    setEndGame(false);

    //set points available to 300
    setPointsAvailable(300);

    //set round to 1
    setRound(1);

    //remove hint
    setHint(null);

    //reset guesses
    setGuesses([]);

    //reset used words
    setUsedWords([]);

  }

  function guess(letter) {
    if (!endRound) {
      //disable keyboard button for letter
      document.getElementById(letter).disabled = true;

      let copyDashes = [...dashes];
      let copyGuesses = [...guesses];

      //check if letter is in mysteryWord
      if (mysteryWord.includes(letter)) {
        //mysteryWord includes letter
        //find all instances
        for (let i = 0; i < mysteryWord.length; i++) {
          if (mysteryWord[i] === letter) {
            //letter is a match
            //fill in dashes
            copyDashes[i] = letter;
          }
        }
        //update dashes
        setDashes(copyDashes);

        //check if won game
        checkWin(copyDashes);

      } else {
        //mysteryWord does not include letter
        //push letter to guesses
        copyGuesses.push(letter);
        setGuesses(copyGuesses);

        //subtract points from points available
        setPointsAvailable(pointsAvailable - 50);

        //check if lost game
        checkLose(copyGuesses);
      }
    }
  }

  function checkWin(array) {
    if (!array.includes('_')) {
      //win
      //add points available to total points
      setTotalPoints(totalPoints + pointsAvailable);

      //make dashes green
      document.getElementById('dash-container').style.color = 'green';

      //set end round to true
      setEndRound(true);

      //set result
      setResult(`+ ${pointsAvailable} Points!`);

      if (round === 10) {
        setEndGame(true);
      }
    }
  }

  function checkLose(array) {
    if (array.length >= 6) {

      //reveal mystery word
      setDashes(mysteryWord);

      //set mystery word to red
      document.getElementById('dash-container').style.color = 'red';
      //end round
      setEndRound(true);
      setResult('No points awarded.');

      if (round === 10) {
        setEndGame(true);
      }
    }
  }

  function nextRound() {
    if (round < 10) {
      //set end round to false
      setEndRound(false);

      //set points available to 300
      setPointsAvailable(300);

      //set round to round + 1
      setRound(round + 1);

      //remove hint
      setHint(null);

      //assign new mystery word
      assignMysteryWord();

      //set disabled guesses back to enabled
      const letters = [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
        'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

      letters.forEach(letter => {
        document.getElementById(letter).disabled = false;
      })

      //remove guessed letters
      setGuesses([]);

      //change dashes back to black
      document.getElementById('dash-container').style.color = 'black';

      //remove result
      setResult('');
    }
  }

  return (
    <Container fluid>
      <div className="hangman-title">
        <h2>Mystery Word</h2>
        {!active ? <p>Click new game to start.</p>
          : <p>
            <b>Round:</b> {round} / 10 || <b>Points:</b> {totalPoints}
          </p>}
      </div>

      <Row>
        <Col xs={12} sm={12} md={4} lg={4}>
          {active ?
            <div className="hangman-container hangman-box">
              <h5>Guesses</h5>
              {guesses.map((letter, index) => {
                return <span key={`guesses-${index}`}>{letter}&nbsp;</span>
              })}
            </div> : <></>}
        </Col>
        <Col xs={12} sm={12} md={4} lg={4}>
          {active ?
            <div className="hangman-container hangman-box">
              <h5>Word</h5>
              {dashes ? <div id='dash-container'>
                {dashes.map((letter, index) => {
                  return <span key={`dashes-${index}`}>{letter}&nbsp;</span>
                })}
              </div> : <></>}
            </div> : <></>}
        </Col>
        <Col xs={12} sm={12} md={4} lg={4}>
          {hint ? <div className="hangman-container hangman-box">
            <h5>Hint</h5>
            {formatHint()}
          </div> : <></>}
        </Col>
      </Row>
      <br />

      {active && !endGame ?
        <div id='hangman-keyboard' className="hangman-container">
          <Button id='Q' className="hangman-keyboard" onClick={() => guess('Q')}>Q</Button>
          <Button id='W' className="hangman-keyboard" onClick={() => guess('W')}>W</Button>
          <Button id='E' className="hangman-keyboard" onClick={() => guess('E')}>E</Button>
          <Button id='R' className="hangman-keyboard" onClick={() => guess('R')}>R</Button>
          <Button id='T' className="hangman-keyboard" onClick={() => guess('T')}>T</Button>
          <Button id='Y' className="hangman-keyboard" onClick={() => guess('Y')}>Y</Button>
          <Button id='U' className="hangman-keyboard" onClick={() => guess('U')}>U</Button>
          <Button id='I' className="hangman-keyboard" onClick={() => guess('I')}>I</Button>
          <Button id='O' className="hangman-keyboard" onClick={() => guess('O')}>O</Button>
          <Button id='P' className="hangman-keyboard" onClick={() => guess('P')}>P</Button>
          <br />
          <Button id='A' className="hangman-keyboard" onClick={() => guess('A')}>A</Button>
          <Button id='S' className="hangman-keyboard" onClick={() => guess('S')}>S</Button>
          <Button id='D' className="hangman-keyboard" onClick={() => guess('D')}>D</Button>
          <Button id='F' className="hangman-keyboard" onClick={() => guess('F')}>F</Button>
          <Button id='G' className="hangman-keyboard" onClick={() => guess('G')}>G</Button>
          <Button id='H' className="hangman-keyboard" onClick={() => guess('H')}>H</Button>
          <Button id='J' className="hangman-keyboard" onClick={() => guess('J')}>J</Button>
          <Button id='K' className="hangman-keyboard" onClick={() => guess('K')}>K</Button>
          <Button id='L' className="hangman-keyboard" onClick={() => guess('L')}>L</Button>
          <br />
          <Button id='Z' className="hangman-keyboard" onClick={() => guess('Z')}>Z</Button>
          <Button id='X' className="hangman-keyboard" onClick={() => guess('X')}>X</Button>
          <Button id='C' className="hangman-keyboard" onClick={() => guess('C')}>C</Button>
          <Button id='V' className="hangman-keyboard" onClick={() => guess('V')}>V</Button>
          <Button id='B' className="hangman-keyboard" onClick={() => guess('B')}>B</Button>
          <Button id='N' className="hangman-keyboard" onClick={() => guess('N')}>N</Button>
          <Button id='M' className="hangman-keyboard" onClick={() => guess('M')}>M</Button>
        </div> : <></>}

      {endRound ? <div className="hangman-container">
        {result}
      </div> : <></>}

      {endGame ? <div className="hangman-container">
        Game over.
      </div> : <></>}

      {endRound && round < 10 ? <div className="hangman-container">
        <Button onClick={() => nextRound()}>Next Round ({round + 1})</Button>
      </div> : <></>}

      {!active || endGame ?
        <div className="hangman-container">
          <Button onClick={() => newGame()}>New Game</Button>
        </div> : <></>}
    </Container >
  )

}

export default MysteryWord;

