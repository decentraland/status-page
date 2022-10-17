import Menu from "semantic-ui-react/dist/commonjs/collections/Menu"
import { Container, Footer, Navbar, Page } from "decentraland-ui"
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
        <Incidents />
      </Page2>
      <Footer />
    </>
  )
}

export default App
