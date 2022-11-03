import { Footer, Page } from "decentraland-ui"
import Incidents from "./components/incidents"
import "./styles.css"
import { Route, Routes } from "react-router-dom"
import Metrics from "./components/Metrics"
import Navbar from "./components/Navbar"

const Page2 = Page as any

function App() {
  return (
    <>
      <Navbar/>
      <Page2 isFullscreen>
        <div className="container">
          <Routes>
            <Route path="/" element={<Incidents />} />
            <Route path="/metrics" element={<Metrics />} />
          </Routes>
        </div>
      </Page2>
      <Footer />
    </>
  )
}

export default App
