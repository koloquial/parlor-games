import { Container, Row, Col } from 'react-bootstrap';
import { FaGamepad } from "react-icons/fa6";

function Splash() {

  return (
    <Container fluid>
      <div className='centered'>
      <Row>
        <Col>
          <h1 className='title'><span className='title-alt'>P A R</span></h1>
          <h1 className='title'><span className='title-alt'>L O R</span></h1>
          <h1 className='title'><span className='title-alt2'>G A M</span></h1>
          <h1 className='title'><span className='title-alt2'>E S</span> <FaGamepad /></h1>
        </Col>
      </Row>
      </div>
    </Container>
  )
}

export default Splash;