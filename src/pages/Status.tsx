import { Container } from "decentraland-ui";
import Healthchecks from "../components/healthchecks/Healthchecks";
import Incidents from "../components/incidents";

export default function Status() {
  return (
    <Container>
      <Incidents open={true} />
      <Healthchecks />
    </Container>
  )
}
