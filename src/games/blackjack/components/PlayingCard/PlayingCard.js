import { useState, useEffect } from 'react';
import ReactCardFlip from 'react-card-flip';
import Card from 'react-bootstrap/Card';
import './styles.css';

function PlayingCard({ value, stage, owner, cardIndex }) {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    if (owner === 'player') {
      //player cards 
      setTimeout(() => setIsFlipped(true), 500);
    } else {
      //dealers cards
      if (cardIndex === 0 && stage === 'deal') {
        //do nothing
      } else {
        setTimeout(() => setIsFlipped(true), 500);
      }
    }
  }, [])

  useEffect(() => {
    if (owner === 'dealer' && stage === 'dealer-turn' && cardIndex === 0) {
      setTimeout(() => setIsFlipped(true), 100);
    }
  }, [stage])

  function formatStyle(suite) {
    switch (suite) {
      case '◆':
      case '♥': return 'red';
      default: return 'black';
    }
  }

  return (
    <div style={{ display: 'inline-block', marginRight: '5px' }}>
      <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
        <Card className='playing-card-front'>
          <div>&nbsp;</div>
        </Card>

        <Card className="playing-card-back">
          <div className="playing-value-top" style={{ color: formatStyle(value[1]) }}>{value[0] === 'X' ? `10${value[1]}` : value}</div>
          <div className="playing-value-bottom" style={{ color: formatStyle(value[1]) }}>{value[0] === 'X' ? `10${value[1]}` : value}</div>
          <div className="playing-value-suite" style={{ color: formatStyle(value[1]) }}>{value[1]}</div>
        </Card>
      </ReactCardFlip>
    </div>
  )

}

export default PlayingCard;