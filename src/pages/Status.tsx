import { Container } from "decentraland-ui";
import { Link } from "react-router-dom";
import Healthchecks from "../components/healthchecks/Healthchecks";
import Incidents from "../components/incidents";

export default function Status() {
  return (
    <Container className="page-container">
      <Incidents open={true} />
      <Healthchecks />
      <Link to="/history" className="history-button" >Incidents History</Link>
    </Container>
  )
}
