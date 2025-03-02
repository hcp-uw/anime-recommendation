import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Bar from 'react-bootstrap/Navbar';

// TO-DO: Delete recommendations link after linked from generate button in home pg
export default function Navbar(): JSX.Element {
  return (
    <Bar expand="lg" className="bg-header-c">
      <Container>
        <Bar.Brand href="/">KabutoRecs</Bar.Brand>
        <Bar.Toggle aria-controls="basic-Bar-nav" />
        <Bar.Collapse id="basic-Bar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About Us</Nav.Link>
            <Nav.Link href="/recs">Recommendations</Nav.Link>
          </Nav>
        </Bar.Collapse>
      </Container>
    </Bar>
  );
}
