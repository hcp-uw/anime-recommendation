import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Bar from 'react-bootstrap/Navbar';

function Navbar(): JSX.Element {
  return (
    <Bar expand="lg" className="bg-body-tertiary">
      <Container>
        <Bar.Brand href="#home">React-Bootstrap</Bar.Brand>
        <Bar.Toggle aria-controls="basic-Bar-nav" />
        <Bar.Collapse id="basic-Bar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">About Us</Nav.Link>
          </Nav>
        </Bar.Collapse>
      </Container>
    </Bar>
  );
}

export default BasicExample;
