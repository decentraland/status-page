import { Container } from "decentraland-ui";
import { Link } from "react-router-dom";
import Healthchecks from "../components/healthchecks/Healthchecks";
import Incidents from "../components/incidents";
import { isProduction } from "../config/environment";

export default function Status() {
  return (
    <Container className="page-container">
      {isProduction && <Incidents open={true} />}
      <Healthchecks />
      {isProduction && (
        <Container>
          <Link to="/history" className="history-button">Incidents History</Link>
        </Container>
      )}
    </Container>
  )
}
