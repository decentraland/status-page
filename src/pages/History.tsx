import { Container } from "decentraland-ui";
import Incidents from "../components/incidents";

export default function History() {
  return (
    <Container className="page-container">
      <Incidents open={false} />
    </Container>
  )
}
