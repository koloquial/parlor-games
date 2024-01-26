import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Navigation() {
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand href="/" className='title-brand'>P</Navbar.Brand>
        <Navbar.Toggle/>
        <Navbar.Collapse>
          <Nav>
            <Nav.Link href="/">Home</Nav.Link>
            <NavDropdown title="Games">
              <NavDropdown.Item href="/tic-tac-toe">Tic-Tac-Toe</NavDropdown.Item>
              <NavDropdown.Item href="/mystery-word">Mystery Word</NavDropdown.Item>
              <NavDropdown.Item href="/memory-match">Memory Match</NavDropdown.Item>
              <NavDropdown.Item href="/blackjack">Blackjack</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;