import { Col, Image, Row } from "react-bootstrap";
import KabutoImageSource from "../../../assets/images/kabuto.png";

// Change bug image later
export default function Brand() {
    return (
        <Row className="justify-content-md-center">
            <Col md="auto" xs >
                <Image src={KabutoImageSource} />
            </Col>
            <Col md="auto" xs >
                <h1>Kabuto</h1>
                <h1>Recs</h1>
            </Col>
        </Row>
    );
}
