import { Navbar } from "decentraland-ui/dist/components/Navbar/Navbar"
import { Footer } from "decentraland-ui/dist/components/Footer/Footer"
import { Header } from "decentraland-ui/dist/components/Header/Header"
import Menu from "semantic-ui-react/dist/commonjs/collections/Menu"
import Helmet from "react-helmet"
import styled from "styled-components"
import Incidents from "./components/incidents"

function App() {
  const Container = styled.div`
    max-width: 1064px;
    margin: 0 auto;
  `

  return (
    <Container>
      <div className="Page-story-container">
        <Navbar
          activePage="Decentraland"
          leftMenu={
            <>
              <Menu.Item>Decentraland Status</Menu.Item>
            </>
          }
        />
        <Helmet>
          <meta charSet="utf-8" />
          <title>Decentraland Status</title>
          <link rel="canonical" href="http://decentraland.status.org/" />
          <meta name="Decentraland status page" content="Helmet application" />
        </Helmet>
      </div>
      <Header />
      <Incidents />
      <Footer />
    </Container>
  )
}

export default App
