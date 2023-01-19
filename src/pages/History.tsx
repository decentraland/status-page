import { Container } from "decentraland-ui";
import { Col, Row } from "react-bootstrap";
import Incidents from "../components/incidents";
import HistoricalMetric from "../components/metrics/historical-metric";
import Subtitle from "../components/Subtitle";
import Title from "../components/Title";

export default function History() {
  return (
    <Container className="page-container">
      <Title title="Incidents History" paragraph="Record of past incidents with details of what happened and links to the root cause analysis."/>
      <Row>
        <Col>
          <Subtitle subtitle="Monthly Incidents" paragraph="How many production incidents were reported"/>
          <HistoricalMetric name="incidents-by-severity"/>
        </Col>
        <Col>
          <Subtitle subtitle="Mean Time to Resolve" paragraph="Avg time it takes to resolve an Incident"/>
          <HistoricalMetric name="incident-mean-time-to-resolve" hour/>
        </Col>
      </Row>
      <Incidents open={false} />
    </Container>
  )
}
