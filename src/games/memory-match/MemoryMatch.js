import './styles.css'
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

//components
import FlipCard from './components/FlipCard';

//icons
import { BsClock } from "react-icons/bs";
import { GiAmericanFootballBall } from "react-icons/gi";
import { Gi3DGlasses } from "react-icons/gi";
import { Gi3DHammer } from "react-icons/gi";
import { GiAcorn } from "react-icons/gi";
import { GiAirBalloon } from "react-icons/gi";
import { GiAncientSword } from "react-icons/gi";
import { GiAnubis } from "react-icons/gi";
import { GiAnvil } from "react-icons/gi";
import { GiAquarium } from "react-icons/gi";
import { GiArcheryTarget } from "react-icons/gi";
import { GiArmadillo } from "react-icons/gi";
import { GiAtom } from "react-icons/gi";
import { GiAvocado } from "react-icons/gi";
import { GiAxeInStump } from "react-icons/gi";
import { GiAxeSword } from "react-icons/gi";
import { GiBalloonDog } from "react-icons/gi";
import { GiBananaBunch } from "react-icons/gi";
import { GiBandageRoll } from "react-icons/gi";
import { GiBarbecue } from "react-icons/gi";
import { GiBamboo } from "react-icons/gi";
import { GiBarrel } from "react-icons/gi";
import { GiBasketballBall } from "react-icons/gi";
import { GiBee } from "react-icons/gi";
import { GiBeerStein } from "react-icons/gi";
import { GiBeachBucket } from "react-icons/gi";
import { GiBindle } from "react-icons/gi";
import { GiBison } from "react-icons/gi";
import { GiBranchArrow } from "react-icons/gi";
import { GiButterfly } from "react-icons/gi";
import { GiCactus } from "react-icons/gi";
import { GiCakeSlice } from "react-icons/gi";
import { GiCalculator } from "react-icons/gi";
import { GiCampfire } from "react-icons/gi";
import { GiCampingTent } from "react-icons/gi";
import { GiCannedFish } from "react-icons/gi";
import { GiCapitol } from "react-icons/gi";
import { GiCarKey } from "react-icons/gi";
import { GiCandyCanes } from "react-icons/gi";
import { GiCaravel } from "react-icons/gi";
import { GiCardAceSpades } from "react-icons/gi";
import { GiCarousel } from "react-icons/gi";
import { GiCarrot } from "react-icons/gi";
import { GiCavalry } from "react-icons/gi";
import { GiCentaur } from "react-icons/gi";
import { GiChelseaBoot } from "react-icons/gi";
import { GiCherry } from "react-icons/gi";
import { GiChicken } from "react-icons/gi";
import { GiCircleForest } from "react-icons/gi";
import { GiCityCar } from "react-icons/gi";
import { GiCoffeePot } from "react-icons/gi";
import { GiCookie } from "react-icons/gi";
import { GiConsoleController } from "react-icons/gi";
import { GiCow } from "react-icons/gi";
import { GiCowboyBoot } from "react-icons/gi";
import { GiCrossedPistols } from "react-icons/gi";
import { GiCrossedSabres } from "react-icons/gi";
import { GiCutLemon } from "react-icons/gi";
import { GiCycling } from "react-icons/gi";
import { GiDaisy } from "react-icons/gi";


function MemoryMatch() {
  const [active, setActive] = useState(false);
  const [record, setRecord] = useState('');
  const [time, setTime] = useState(0);
  const [cardList, setCardList] = useState([]);
  const [selectCard, setSelectCard] = useState([]);
  const [force, setForce] = useState(['', '']);
  const [matched, setMatched] = useState([]);

  useEffect(() => {
    if (active) {
      setTimeout(() => setTime(time + 1), 1000);
    }
  })

  const icons = [
    Gi3DGlasses, GiAmericanFootballBall, Gi3DHammer, GiAcorn, GiAirBalloon, GiAncientSword, GiAnubis, GiAnvil, GiAquarium, GiArcheryTarget, GiArmadillo, GiAtom, GiAvocado, GiAxeInStump, GiAxeSword, GiBalloonDog, GiBananaBunch, GiBandageRoll, GiBarbecue, GiBamboo, GiBarrel, GiBasketballBall, GiBee, GiBeerStein, GiBeachBucket, GiBindle, GiBison, GiBranchArrow, GiButterfly, GiCactus, GiCakeSlice, GiCalculator, GiCampfire, GiCampingTent, GiCannedFish, GiCapitol, GiCarKey, GiCandyCanes, GiCaravel, GiCardAceSpades, GiCarousel, GiCarrot, GiCavalry, GiCentaur, GiChelseaBoot, GiCherry, GiChicken, GiCircleForest, GiCityCar, GiCoffeePot, GiCookie, GiConsoleController, GiCow, GiCowboyBoot, GiCrossedPistols, GiCrossedSabres, GiCutLemon, GiCycling, GiDaisy
  ]

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  function newGame() {
    let list = [];
    let valid = false;
    for (let i = 0; i < 12; i++) {
      valid = false;
      while (!valid) {
        let random = Math.floor(Math.random() * icons.length);
        if (!list.includes(icons[random])) {
          list.push(icons[random], icons[random]);
          valid = true;
        }
      }
    }
    let shuffled = shuffle(list);
    setCardList(shuffled);
    setActive(true);
  }

  function formatTime(elapsed) {
    let minutes = Math.floor(elapsed / 60);
    let seconds = elapsed % 60;
    return `${minutes}:${seconds < 10 ? 0 : ''}${seconds}`;
  }

  function forceFlip(cardId1, cardId2) {
    setForce([cardId1, cardId2]);
  }

  function checkWin(array) {
    if (array.length === 24) {
      alert('win!');
    }
  }

  return (
    <Container fluid>
      <div className="memory-title">
        <h1>Memory Match</h1>
      </div>

      {active ?
        <div className='memory-container'>
          <BsClock /> {formatTime(time)}
        </div> : <></>}

      {active ?
        <div className='memory-container'>
          <Row>
            {cardList.map((card, index) => {
              if (index < 4) {
                return (
                  <Col key={`${card}-${index}`}>
                    <FlipCard
                      id={index}
                      Icon={card}
                      selectCard={selectCard}
                      setSelectCard={setSelectCard}
                      forceFlip={forceFlip}
                      force={force}
                      setForce={setForce}
                      matched={matched}
                      setMatched={setMatched}
                      checkWin={checkWin}
                    />
                  </Col>
                )
              } else {
                return ''
              }
            })}
          </Row>
          <br />

          <Row>
            {cardList.map((card, index) => {
              if (index >= 4 && index < 8) {
                return (
                  <Col key={`${card}-${index}`}>
                    <FlipCard
                      id={index}
                      Icon={card}
                      selectCard={selectCard}
                      setSelectCard={setSelectCard}
                      forceFlip={forceFlip}
                      force={force}
                      setForce={setForce}
                      matched={matched}
                      setMatched={setMatched}
                      checkWin={checkWin}
                    />
                  </Col>
                )
              } else {
                return ''
              }
            })}
          </Row>
          <br />

          <Row>
            {cardList.map((card, index) => {
              if (index >= 8 && index < 12) {
                return (
                  <Col key={`${card}-${index}`}>
                    <FlipCard
                      id={index}
                      Icon={card}
                      selectCard={selectCard}
                      setSelectCard={setSelectCard}
                      forceFlip={forceFlip}
                      force={force}
                      setForce={setForce}
                      matched={matched}
                      setMatched={setMatched}
                      checkWin={checkWin}
                    />
                  </Col>
                )
              } else {
                return ''
              }
            })}
          </Row>
          <br />

          <Row>
            {cardList.map((card, index) => {
              if (index >= 12 && index < 16) {
                return (
                  <Col key={`${card}-${index}`}>
                    <FlipCard
                      id={index}
                      Icon={card}
                      selectCard={selectCard}
                      setSelectCard={setSelectCard}
                      forceFlip={forceFlip}
                      force={force}
                      setForce={setForce}
                      matched={matched}
                      setMatched={setMatched}
                      checkWin={checkWin}
                    />
                  </Col>
                )
              } else {
                return ''
              }
            })}
          </Row>
          <br />

          <Row>
            {cardList.map((card, index) => {
              if (index >= 16 && index < 20) {
                return (
                  <Col key={`${card}-${index}`}>
                    <FlipCard
                      id={index}
                      Icon={card}
                      selectCard={selectCard}
                      setSelectCard={setSelectCard}
                      forceFlip={forceFlip}
                      force={force}
                      setForce={setForce}
                      matched={matched}
                      setMatched={setMatched}
                      checkWin={checkWin}
                    />
                  </Col>
                )
              } else {
                return ''
              }
            })}
          </Row>
          <br />

          <Row>
            {cardList.map((card, index) => {
              if (index >= 20 && index < 24) {
                return (
                  <Col key={`${card}-${index}`}>
                    <FlipCard
                      id={index}
                      Icon={card}
                      selectCard={selectCard}
                      setSelectCard={setSelectCard}
                      forceFlip={forceFlip}
                      force={force}
                      setForce={setForce}
                      matched={matched}
                      setMatched={setMatched}
                      checkWin={checkWin}
                    />
                  </Col>
                )
              } else {
                return ''
              }
            })}
          </Row>
        </div> : <></>}

      {!active ?
        <div className="memory-container">
          <Button onClick={() => newGame()}>New Game</Button>
        </div> : <></>}

    </Container>
  )
}

export default MemoryMatch;