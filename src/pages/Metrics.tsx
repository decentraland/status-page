import { Container } from "decentraland-ui";
import HistoricalMetrics from "../components/metrics/historical-metrics";
import LiveMetrics from "../components/metrics/live-metrics";

export default function Metrics() {
  return (
    <Container className="page-container">
      <LiveMetrics />
      <HistoricalMetrics />
    </Container>
  )
}
