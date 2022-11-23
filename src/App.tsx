import { Footer, Page } from "decentraland-ui"
import { Route, Routes } from "react-router-dom"
import Metrics from "./pages/Metrics"
import Navbar from "./components/Navbar"
import Status from "./pages/Status"
import History from "./pages/History"
import Help from "./pages/Help"

const Page2 = Page as any

function App() {
  return (
    <>
      <Navbar/>
      <Page2 isFullscreen>
        <Routes>
          <Route path="/" element={<Status />} />
          <Route path="/metrics" element={<Metrics />} />
          <Route path="/history" element={<History />} />
          <Route path="/help" element={<Help />} />
        </Routes>
      </Page2>
      <Footer />
    </>
  )
}

export default App
