import { useState, useEffect } from 'react';
import ReactCardFlip from 'react-card-flip';
import Card from 'react-bootstrap/Card';
import './styles.css';

function FlipCard({ id, Icon, selectCard, setSelectCard, forceFlip, force, setForce, matched, setMatched, checkWin }) {
  const [isFlipped, setIsFlipped] = useState(false);

  function handleFlip() {
    let copySelectCard = [...selectCard];

    //check to see if card can be flipped
    //its not a match and select card length less than 2
    console.log('matched', matched);
    console.log('card length', selectCard.length);

    if (!matched.includes(id) && copySelectCard.length < 2) {
      //card can be flipped
      //push card into selectCard
      copySelectCard.push({ id: id, icon: Icon });

      //update select card
      setSelectCard(copySelectCard);

      //flip card
      setIsFlipped(true);
    }

    //check if there are two cards selected
    if (copySelectCard.length === 2) {
      //two cards selected
      //check if they match
      checkMatch(copySelectCard);
    }
  }

  function checkMatch(array) {
    if (array[0].icon === array[1].icon) {
      //cards match
      console.log('cards match');
      //add card id's to matched
      let copyMatched = [...matched];
      copyMatched.push(array[0].id, array[1].id);
      setMatched(copyMatched);
      setSelectCard([]);
      checkWin();
    } else {
      //cards dont match
      console.log('cards dont match');
      //flip cards back over after a 1.2 secs
      setTimeout(() => forceFlip(array[0].id, array[1].id), 1200);
    }
  }

  useEffect(() => {
    //when force is updated check id's to see if match on current card
    console.log('force updated');
    if (force.includes(id)) {
      //flip card back over
      setIsFlipped(false);
      setForce([]);
      setSelectCard([]);
    }
  }, [force])

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