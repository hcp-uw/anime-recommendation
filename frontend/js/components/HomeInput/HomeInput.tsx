import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav'
import { Row } from "react-bootstrap";

function UsernameInput() {
    return (
        <Form>
            <Form.Group className="mx-auto mt-3 text-center" style={{width: "80vw"}}>
                <Form.Label >Enter MyAnimeList username(s)</Form.Label>
                <Form.Control type="text" style={{fontSize: "20px", height: "3em"}}/>
            </Form.Group>
        </Form>
    );
}

function GenerateButton() {
    return (
        <Button variant="button-c" size="lg" className="btn-custom mx-auto px-5" style={{color: "#FDFDFD"}}>
            <Nav.Link href="/recs">Generate Recommendations</Nav.Link>
        </Button>
    );
}

export default function HomeInput() {
    return (
        <div className="d-grid gap-4">
            <Row><UsernameInput /></Row>
            <Row className="mx-auto text-center"><GenerateButton /></Row>
        </div>  
    );
}
