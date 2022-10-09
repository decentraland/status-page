import Menu from "semantic-ui-react/dist/commonjs/collections/Menu"
import { Container, Footer, Navbar, Page } from "decentraland-ui"
import Chart from "./components/onlines"
import Incidents from "./components/incidents"

const Page2 = Page as any

function App() {
  return (
    <>
      <Navbar
        activePage="Decentraland"
        leftMenu={
          <>
            <Menu.Item>Decentraland Status</Menu.Item>
          </>
        }
      />
      <Page2 isFullscreen>
        <Container>
          <Chart />
          <Incidents />
        </Container>
      </Page2>
      <Footer />
    </>
  )
}

export default App
