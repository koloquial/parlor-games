import './styles.css';
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import PlayingCard from './components/PlayingCard/PlayingCard';
import { GrMoney } from "react-icons/gr";
import { GiPayMoney } from "react-icons/gi";
import { PiPokerChipDuotone } from "react-icons/pi";
import { TbSum } from "react-icons/tb";

function Blackjack() {
  const [active, setActive] = useState(false);
  const [currentHand, setCurrentHand] = useState(false);
  const [money, setMoney] = useState(50);
  const [deck, setDeck] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [revealDealer, setRevealDealer] = useState(false);
  const [pot, setPot] = useState(0);
  const [deal, setDeal] = useState(false);
  const [turn, setTurn] = useState('player');
  const [bet, setBet] = useState(1);

  const cardBank = [
    'A♠', 'K♠', 'Q♠', 'J♠', 'X♠', '9♠', '8♠', '7♠', '6♠', '5♠', '4♠', '3♠', '2♠',
    'A♥', 'K♥', 'Q♥', 'J♥', 'X♥', '9♥', '8♥', '7♥', '6♥', '5♥', '4♥', '3♥', '2♥',
    'A◆', 'K◆', 'Q◆', 'J◆', 'X◆', '9◆', '8◆', '7◆', '6◆', '5◆', '4◆', '3◆', '2◆',
    'A♣', 'K♣', 'Q♣', 'J♣', 'X♣', '9♣', '8♣', '7♣', '6♣', '5♣', '4♣', '3♣', '2♣',
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
    //activate game
    setActive(true);

    //active hand
    setCurrentHand(true);

    //shuffle cards
    let tempDeck = shuffle(cardBank);

    //deal cards
    let tempPlayerHand = [];
    let tempDealerHand = [];

    let card1 = tempDeck.shift();
    let card2 = tempDeck.shift();

    tempPlayerHand.push(card1, card2);

    let card3 = tempDeck.shift();
    let card4 = tempDeck.shift();

    tempDealerHand.push(card3, card4);

    setPlayerHand(tempPlayerHand);
    setDealerHand(tempDealerHand);
    setDeck(tempDeck);
  }

  function sumOfCards(player) {
    let sum1 = 0;
    let calcHand;

    if (player === 'player') {
      calcHand = [...playerHand];
    } else {
      if (!revealDealer) {
        return '?'
      } else {
        calcHand = [...dealerHand];
      }
    }

    let aceCounter = 0;

    calcHand.forEach(val => {
      switch (val[0]) {
        case 'K': sum1 += 10; break;
        case 'Q': sum1 += 10; break;
        case 'J': sum1 += 10; break;
        case 'X': sum1 += 10; break;
        case '9': sum1 += 9; break;
        case '8': sum1 += 8; break;
        case '7': sum1 += 7; break;
        case '6': sum1 += 6; break;
        case '5': sum1 += 5; break;
        case '4': sum1 += 4; break;
        case '3': sum1 += 3; break;
        case '2': sum1 += 2; break;
        case 'A': aceCounter += 1;
        default: break;
      }
    })

    return [(sum1 + (1 * aceCounter)), (sum1 + (11 * aceCounter))];
  }

  function hit(player) {
    //draw card
    let copyDeck = [...deck];
    let tempCard = copyDeck.shift();
    console.log('temp card', tempCard);

    //set new deck
    setDeck(copyDeck);

    //put tempCard into player hand
    let copyHand = [...playerHand];
    copyHand.push(tempCard);

    if (player === 'player') {
      if (sumOfCards(copyHand)[0] > 21) {
        setTurn('dealer');
      }
      setPlayerHand(copyHand);
    } else {
      setRevealDealer(true)
      if (sumOfCards(copyHand)[0] > 21) {
        setTurn('');
      }
      setDealerHand(copyHand);
    }
  }

  function placeBet() {
    setPot(bet);
    let moneyTemp = money;
    moneyTemp -= bet;
    setMoney(moneyTemp);
    setDeal(true);
  }

  function handleRangeBet(event) {
    setBet(event.target.value);
  }

  function double() {
    if (bet > money) {
      //cannot double down
    } else {
      let newBet = Number(pot) + Number(bet);
      setPot(newBet);
      setMoney(money - bet);
      hit('player');
      setTurn('deler');
      setRevealDealer(true);
    }
  }

  function stay() {
    setTurn('dealer');
    setRevealDealer(true);
  }

  return (
    <Container fluid>
      <div className='blackjack-title'>
        <h2>Blackjack</h2>
        {active && currentHand ?
          <div className="blackjack-container">

            {pot !== 0 ?
              <p>
                <TbSum />

                {sumOfCards('player')[0]}

                {sumOfCards('player')[1] < 22 && sumOfCards('player')[0] !== sumOfCards('player')[1] ? ` or ${sumOfCards('player')[1]}` : ''}
              </p> : <p><TbSum /> ?</p>}

            {dealerHand.map((value, index) => {
              return (
                <div style={{ display: 'inline-block', marginRight: '5px' }}>
                  <PlayingCard
                    value={value}
                    owner={'dealer'}
                    revealDealer={revealDealer}
                    cardIndex={index}
                    deal={deal}
                  />
                </div>
              )
            })}

            <br /><br />
            <p><GrMoney /> ${pot}</p>

            {playerHand.map((value, index) => {
              return (
                <div style={{ display: 'inline-block', marginRight: '5px' }}>
                  <PlayingCard value={value} cardIndex={index} deal={deal} />
                </div>
              )
            })}
            <br /><br />

            {pot !== 0 ?
              <>
                <p>
                  <TbSum />

                  {sumOfCards('player')[0]}

                  {sumOfCards('player')[1] < 22 && sumOfCards('player')[0] !== sumOfCards('player')[1] ? ` or ${sumOfCards('player')[1]}` : ''}
                </p>
              </> : <>
                <p><GiPayMoney /> ${bet}</p>
                <input type="range" id="range-bet" name='range-bet' min="1" max={money} value={bet} onChange={handleRangeBet}></input>
                <br />
                <Button onClick={() => placeBet()}>Place Bet</Button>
              </>}

          </div> : <></>}

        {!active ? <p>Press new game to start.</p> : <></>}

        {!deal && active ? <p><PiPokerChipDuotone /><b>$</b>{money}</p> : <></>}

        {active && turn === 'player' && (sumOfCards('player')[0] < 22 || sumOfCards('player')[1] < 22) && deal ?
          <>
            <Button onClick={() => hit('player')}>Hit</Button>
            {playerHand.length === 2 && playerHand[0][0] === playerHand[1][0] ? <Button>Split</Button> : <></>}
            {playerHand.length === 2 ? <Button onClick={() => double()}>Double</Button> : <></>}
            <Button onClick={() => stay()}>Stay</Button>
          </> : <></>}

        {!active ?
          <div className="blackjack-container">
            <br />
            <Button onClick={() => newGame()}>New Game</Button>
          </div> : <></>}
      </div>
    </Container >
  )
}

export default Blackjack;