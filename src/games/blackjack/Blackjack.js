import './styles.css';
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import PlayingCard from './components/PlayingCard/PlayingCard';
import { GrMoney } from "react-icons/gr";
import { GiPayMoney } from "react-icons/gi";
import { PiPokerChipDuotone } from "react-icons/pi";
import { TbSum } from "react-icons/tb";

function Blackjack() {
  const [active, setActive] = useState(false);
  const [money, setMoney] = useState(50);
  const [deck, setDeck] = useState([]);
  const [stage, setStage] = useState('');
  const [bet, setBet] = useState(1);
  const [pot, setPot] = useState(0);
  const [dealerHand, setDealerHand] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealTo, setDealTo] = useState(null);
  const [dealerHandSum, setDealerHandSum] = useState([]);
  const [playerHandSum, setPlayerHandSum] = useState([]);
  const [result, setResult] = useState('');

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
    //set active to true
    setActive(true);

    //shuffle deck
    let tempDeck = shuffle(cardBank);
    setDeck(tempDeck);

    //set stage to bet
    setStage('bet');
  }

  function handleBet(event) {
    setBet(Number(event.target.value));
  }

  function placeBet() {
    //set the pot
    console.log('set pot to:', bet);
    setPot(bet);

    let tempMoney = money - bet;
    console.log('tempMoney', tempMoney)
    //remove money from player
    setMoney(tempMoney);

    //set stage to deal cards
    setStage('deal');
    setDealTo('player');
  }

  useEffect(() => {
    console.log('[DEALTO] STAGE', stage);
    //alternate between dealing to player and dealer
    //when dealTo is updated and hand length is less than 2
    if (stage === 'deal') {
      if (dealTo === 'player' && playerHand.length < 2) {
        draw('player');
      } else if (dealTo === 'dealer' && dealerHand.length < 2) {
        draw('dealer');
      } else if (dealerHand.length === 2 && playerHand.length === 2) {
        //both players have cards
        //update stage to players turn
        setStage('player-turn');
      } else {
        //do nothing
        setDealTo(null);
        console.log('player hand', playerHand);
        console.log('dealer hand', dealerHand)
      }
    }
  }, [dealTo])

  useEffect(() => {
    //update hand sums
    sum('player');
    sum('dealer');
  }, [playerHand, dealerHand])

  useEffect(() => {
    if (stage === 'player-turn' && (playerHandSum[0] >= 21)) {
      setStage('dealer-turn');
    }
  }, [stage, playerHandSum])

  useEffect(() => {
    if (stage === 'dealer-turn') {
      sum('dealer');
      console.log('stage - dealer')
      setTimeout(() => dealerMove(), 1000);
    }

    if (stage === 'end') {
      calculateResult();
    }
  }, [stage])

  function calculateResult() {
    console.log('called result')
    //get dealer result
    let dealerRes = 0;
    if (dealerHandSum[1] > dealerHandSum[0] && dealerHandSum[1] < 22) {
      dealerRes = dealerHandSum[1];
    } else {
      dealerRes = dealerHandSum[0];
    }

    //get player result
    let playerRes = 0;
    if (playerHandSum[1] > playerHandSum[0] && playerHandSum[1] < 22) {
      playerRes = playerHandSum[1];
    } else {
      playerRes = playerHandSum[0];
    }

    let high = bet * 2;
    let low = bet;

    let winHigh = high + money;
    let winLow = low + money;

    console.log('high', high);
    console.log('low', low)

    if (playerRes > dealerRes && playerRes < 22) {
      setResult(`You win! +$${high}`);
      setMoney(winHigh);

    } else if (dealerRes > playerRes && dealerRes < 22) {
      setResult('Dealer wins.');

    } else if (playerRes > 21 && dealerRes < 21) {
      setResult('Dealer wins.');

    } else if (playerRes < 21 && dealerRes > 21) {
      setResult(`You win! +$${high}`);
      setMoney(winHigh);

    } else if (dealerRes === playerRes && dealerRes < 22 && playerRes < 22) {
      setResult(`Push. +$${low}`);
      setMoney(winLow);

    } else {
      setResult('Not sure what happened');
    }
  }

  function dealerMove() {
    if (playerHandSum[0] > 21) {
      console.log('move 1')
      setStage('end');

    } else if (dealerHandSum[0] > 21) {
      console.log('move 2')
      setStage('end');

    } else if (dealerHandSum[0] === 21 || dealerHandSum[1] === 21) {
      console.log('move 3')
      setStage('end');

    } else if (dealerHandSum[1] > 16 && dealerHandSum[1] < 22) {
      console.log('move 4')
      setStage('end');

    } else if (dealerHandSum[0] > 16 && dealerHandSum[0] < 22) {
      console.log('move 5')
      setStage('end');

    } else if (dealerHandSum[0] <= 16) {
      console.log('move 6')
      draw('dealer');

    } else {
      console.log('move 7', dealerHandSum)
      setStage('end');
    }
  }

  function sum(hand) {
    if (hand === 'dealer' && stage !== 'dealer-turn' && stage !== 'end') {
      //hide dealer sum
      setDealerHandSum(['?', '?']);

    } else {
      //check hand ownership
      let copyHand;
      if (hand === 'player') {
        //hand belongs to player
        copyHand = [...playerHand];
      } else {
        //hand belongs to dealer
        copyHand = [...dealerHand];
      }

      //iterate over hand and calculate sum
      let count = 0;
      let aceCount = 0;

      copyHand.forEach(card => {
        switch (card[0]) {
          case 'K':
          case 'Q':
          case 'J':
          case 'X': count += 10; break;
          case '9': count += 9; break;
          case '8': count += 8; break;
          case '7': count += 7; break;
          case '6': count += 6; break;
          case '5': count += 5; break;
          case '4': count += 4; break;
          case '3': count += 3; break;
          case '2': count += 2; break;
          case 'A': aceCount += 1; break;
          default: break;
        }
      });

      //calculate ace values
      let val1 = count + (aceCount * 1);
      let val2 = count + (aceCount * 11);

      //check ownership to place sum
      if (hand === 'player') {
        setPlayerHandSum([val1, val2]);
      } else {
        setDealerHandSum([val1, val2]);
      }
    }
  }

  function draw(hand) {
    //copy deck
    let copyDeck = [...deck];

    //draw card
    let drawCard = copyDeck.shift();

    //save copied deck to state
    setDeck(copyDeck);

    //copy hand
    //put draw card inside copy hand
    //save copied hand to state
    let copyHand;
    if (hand === 'player') {
      //player hand
      copyHand = [...playerHand];
      copyHand.push(drawCard);
      setPlayerHand(copyHand);
    } else {
      //dealer hand
      copyHand = [...dealerHand];
      copyHand.push(drawCard);
      setDealerHand(copyHand);
    }

    console.log('STAGE CHECK', stage)
    //check if stage is deal
    if (stage === 'deal') {
      //update dealTo correct player
      if (hand === 'player') {
        setDealTo('dealer');
      } else {
        setDealTo('player');
      }
    }
  }

  function doubleDown() {
    let newPot = pot + bet;
    let newMoney = money - bet;
    setBet(bet * 2)
    setPot(newPot);
    setMoney(newMoney);
    draw('player');
    setStage('dealer-turn');
  }

  function splitHand() {

  }

  function stay() {
    setStage('dealer-turn');
  }

  function nextHand() {
    let tempDeck = shuffle(cardBank);
    setDeck(tempDeck);
    setStage('bet');
    setPot(0);
    setBet(1);
    setPlayerHandSum([]);
    setDealerHandSum([]);
    setDealerHand([]);
    setPlayerHand([]);
    setResult('');
    setDealTo(null);
  }


  return (
    <Container fluid>
      <div className='blackjack-title'>
        <h2>Blackjack</h2>
        <div className='blackjack-container'>
          {!active ? <p>Click new game to start.</p> : <p><PiPokerChipDuotone /> ${money}</p>}
        </div>

        {stage === 'bet' ?
          <div className="blackjack-container">
            <p><GiPayMoney /> ${bet}</p>
            <input type="range" min="1" max={money} value={bet} onChange={handleBet}></input>
            <br />
            <Button onClick={() => placeBet()}>Place Bet</Button>
          </div> : <></>}

        {stage === 'deal' || stage === 'player-turn' || stage === 'dealer-turn' || stage === 'end' ?
          <div className="blackjack-container">
            <p><TbSum /> {dealerHandSum[0]} {dealerHandSum[1] < 22 && dealerHandSum[1] !== dealerHandSum[0] ? ` or ${dealerHandSum[1]}` : ''}</p>
            {dealerHand.length === 0 ? <div className="playing-card-placeholder"></div> : <></>}
            {dealerHand.map((card, index) => <PlayingCard key={`player-${index}`} value={card} stage={stage} owner={'dealer'} cardIndex={index} />)}
          </div> : <></>}

        {stage === 'deal' || stage === 'player-turn' || stage === 'dealer-turn' || stage === 'end' ?
          <div className="blackjack-pot-container">
            <p><GrMoney /><br />${pot * 2}</p>
          </div> : <></>}

        {stage === 'deal' || stage === 'player-turn' || stage === 'dealer-turn' || stage === 'end' ?
          <div className="blackjack-container">
            {playerHand.length === 0 ? <div className="playing-card-placeholder"></div> : <></>}
            {playerHand.map((card, index) => <PlayingCard key={`player-${index}`} value={card} stage={stage} owner={'player'} cardIndex={index} />)}
            <p><TbSum />{playerHandSum[0]} {playerHandSum[1] < 22 && playerHandSum[1] !== playerHandSum[0] ? ` or ${playerHandSum[1]}` : ''}</p>
          </div> : <></>}

        {stage === 'player-turn' ?
          <div className="blackjack-container">
            <Button onClick={() => draw('player')}>Hit</Button>
            {playerHand.length === 2 && (money - bet > 0) ? <Button onClick={() => doubleDown()}>Double</Button> : <></>}
            {playerHand.length === 2 && playerHand[0][0] === playerHand[1][0] ? <Button onClick={() => splitHand()}>Split</Button> : <></>}
            <Button onClick={() => stay()}>Stay</Button>
          </div> : <></>}

        {stage === 'end' ?
          <div className="blackjack-container">
            <p>{result}</p>
            <Button onClick={() => nextHand()}>Next Hand</Button>
          </div> : <></>}

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