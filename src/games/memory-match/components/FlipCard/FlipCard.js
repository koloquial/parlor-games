import { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import Card from 'react-bootstrap/Card';
import './styles.css';

function FlipCard({ id, Icon, selectCard, setSelectCard }) {
  const [isFlipped, setIsFlipped] = useState(false);

  function handleFlip() {
    if (!isFlipped) {
      setIsFlipped(true);
    }

  }

  return (
    <div id={id}>
      <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
        <Card className='flip-card-front' onClick={handleFlip}>
          <div className='flip-card-icon'>&nbsp;</div>
        </Card>

        <Card className='flip-card-back'>
          <div className="flip-card-icon"><Icon /></div>
        </Card>
      </ReactCardFlip>
    </div>
  )

}

export default FlipCard;