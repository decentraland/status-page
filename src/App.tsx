import { Footer, Page } from "decentraland-ui"
import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Intercom from "./components/Intercom"
import Status from "./pages/Status"
import History from "./pages/History"

const INTERCOM_APP_ID = "z0h94kay"
const Page2 = Page as any

function App() {
  return (
    <>
      <Navbar/>
      <Page2 isFullscreen>
        <Routes>
          <Route path="/" element={<Status />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </Page2>
      <Intercom appId={INTERCOM_APP_ID} settings={{ alignment: 'right' }} />
      <Footer />
    </>
  )
}

export default App
