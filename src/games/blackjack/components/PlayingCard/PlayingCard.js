import { useState, useEffect } from 'react';
import ReactCardFlip from 'react-card-flip';
import Card from 'react-bootstrap/Card';
import './styles.css';

function PlayingCard({ value, owner, revealDealer, cardIndex, deal }) {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    //on load, flip cards if they arent flipped
    //run once
    if (!isFlipped && deal) {
      //check to see if reveal dealer is true
      //check to see if index of hand is 0
      //check if owner of hand is dealer
      if (owner === 'dealer' && cardIndex === 0 && !revealDealer) {
        //do nothing
      } else {
        setTimeout(() => setIsFlipped(true), 500);
      }
    }
  }, [deal])

  return (
    <div>
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <Card className='playing-card-front'>
          <div>&nbsp;</div>
        </Card>

        <Card className="playing-card-back">
          <div className={value[1] === '♥' || value[1] === '◆' ? 'playing-value-top red' : 'playing-value-top'}>{value[0] === 'X' ? `10${value[1]}` : value}</div>
          <div className={value[1] === '♥' || value[1] === '◆' ? 'playing-value-bottom red' : 'playing-value-bottom'}>{value[0] === 'X' ? `10${value[1]}` : value}</div>
          <div className={value[1] === '♥' || value[1] === '◆' ? 'playing-value-suite red' : 'playing-value-suite'}>{value[0] === 'X' ? `10${value[1]}` : value}</div>
        </Card>
      </ReactCardFlip>
    </div>
  )

}

export default PlayingCard;