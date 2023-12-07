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

  return (
    <div style={{ display: 'inline-block', marginRight: '5px' }}>
      <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
        <Card className='playing-card-front'>
          <div>&nbsp;</div>
        </Card>

        <Card className="playing-card-back">
          <div>{value}</div>
        </Card>
      </ReactCardFlip>
    </div>
  )

}

export default PlayingCard;