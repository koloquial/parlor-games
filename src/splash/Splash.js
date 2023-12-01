import { Container, Row, Col } from 'react-bootstrap';

function Splash() {
  return (
    <Container fluid>
      <Row>
        <Col>
          <p>Welcome!</p>

          <p>I enjoy building games as programming exercises. Sometimes I build them because I enjoy the mental obstacles and puzzles I put myself through.  I find it more rewarding than watching TV (though I am often programming while watching TV).  Helps tone my craft or perhaps keep my skills sharp.</p>
          <p>As you might have suspected - you will find those games here.  You have likely played most of these games before.  I have stripped most down to their fundamentals. I like the simplicity of it all.</p>
          <p>If you're curious how I built them - visit the <a href="https://github.com/koloquial/parlor-games/tree/master/src" target="_blank">github repository</a>.  Each project has its own folder. Most of the games are a single Javascript file paired with a CSS file.  I do not claim these solutions are most efficient.  I am human.  Concerns could be better separated, logic trimmed, and perhaps better UI (I doubt it.)</p>
          <p>Some people do sudokus or crossword puzzles daily... I like to build them.</p>
          <p>I hope you enjoy,</p>
          <h1 className="signature">Nicholas R. Kolodziej</h1>
          <p style={{ fontSize: 'xx-small' }}>Not my real signature.</p>
        </Col>
      </Row>
    </Container>
  )
}

export default Splash;