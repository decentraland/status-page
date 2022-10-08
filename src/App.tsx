import { Navbar } from "decentraland-ui/dist/components/Navbar/Navbar"
import { Footer } from "decentraland-ui/dist/components/Footer/Footer"
import { Header } from "decentraland-ui/dist/components/Header/Header"
import Menu from "semantic-ui-react/dist/commonjs/collections/Menu"
import styled from "styled-components"
import Incidents from "./components/incidents"
import Chart from "./components/onlines"

function App() {
  const Container = styled.div`
    max-width: 1064px;
    margin: 0 auto;
  `
  const Title = styled.div`
    padding: 0 16px;
    font-size: 27px;
    margin-bottom: 16px;
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
      </div>
      <Header />
      <Title>Live Metrics</Title>
      <Chart />
      <Incidents />
      <Footer />
    </Container>
  )
}

export default App
