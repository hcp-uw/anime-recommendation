import FilterPanel from "../components/FilterPanel/FilterPanel"; // Adjust the path as needed
import { Container, Row, Col } from "react-bootstrap";

const Recommendations = () => {
  return (
    <Container className="mt-4">
      <Row>
        {/* Filter Panel */}
        <Col md={3}>
          <FilterPanel />
        </Col>

        {/* Main Content */}
        <Col md={9}>
          <h2>Recommendations</h2>
          <p>This is where your recommendations content will go.</p>
          {/* Add logic here to display filtered recommendations */}
        </Col>
      </Row>
    </Container>
  );
};

export default Recommendations;