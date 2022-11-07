import { Footer, Page } from "decentraland-ui"
import { Route, Routes } from "react-router-dom"
import Metrics from "./pages/Metrics"
import Navbar from "./components/Navbar"
import Status from "./pages/Status"
import History from "./pages/History"

const Page2 = Page as any

function App() {
  return (
    <>
      <Navbar/>
      <Page2 isFullscreen>
        <div className="container">
          <Routes>
            <Route path="/" element={<Status />} />
            <Route path="/metrics" element={<Metrics />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </div>
      </Page2>
      <Footer />
    </>
  )
}

export default App
