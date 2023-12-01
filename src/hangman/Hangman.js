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

  useEffect(() => {
    fetch('https://random-word-api.vercel.app/api?words=10')
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error));
  }, []);

  function assignWords() {
    let copy = [...data];
    let random = Math.floor(Math.random() * data.length);
    let temp = data[random];
    console.log('WORD:', temp.toUpperCase())
    temp = temp.toUpperCase();
    setWord(temp.split(''));
    copy.splice(random, 1);
    setData(copy);
    let myst = [];
    temp.split('').forEach(letter => {
      myst.push('');
    });
    setMystery(myst);
    setActive(true);
  }

  function fetchHint() {
    let temp = word.join('').toLowerCase();
    console.log('temp', temp);
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${temp}`)
      .then(response => response.json())
      .then(json => setHint(json))
      .catch(error => console.error(error));
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
    }

    if (!hint) {
      fetchHint();
    }
  }

  return (
    <Container fluid>
      {hint ? <>{console.log('hint', hint[0].meanings[0].partOfSpeech)}</> : ''}
      <div className="hangman-title">
        <h1>Hangman</h1>
        {!active ?
          <p>Click on New Game to start.</p>
          :
          <p>
            &nbsp;
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
              <h4>Miss</h4>
              {miss.map((guess, index) => {
                return <span key={`guess-${index}`} style={{ display: 'inline-block' }}>{guess}&nbsp;</span>
              })}
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
    </Container >
  )

}

export default Hangman;

