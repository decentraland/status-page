import Incident from "./incident"
import { useEffect, useState } from "react"
import Status from "../status"
import { IncidentsResponse, IncidentType } from "../types"
import Chart from "../onlines"
import { Container, Header, HeaderMenu, Loader } from "decentraland-ui"

async function fetchStatus() {
  const apiKey = process.env.REACT_APP_CRASHBOT_API_KEY ?? ''
  const res = await fetch("https://crashbot.decentraland.zone/list", {
    method: "GET",
    headers: {
      "content-type": "application/json",
      "crashbot": apiKey
    },
  })
  return res.json()
}

export default function Incidents() {
  const [incidents, setIncidents] = useState<IncidentsResponse | null>(null)

  useEffect(() => {
    fetchStatus().then(setIncidents)
  }, [])

  return (
    <Container>
    
      {incidents ? (
        <>         
          <Status incidents={incidents} />
          {incidents.open.length > 0 ? (
            <>
              <HeaderMenu>
                <HeaderMenu.Left>
                  <Header>Incidents</Header>
                </HeaderMenu.Left>
              </HeaderMenu>
              <Header size="medium">Open incidents</Header>
              <IncidentRows incidents={incidents.open} />
            </>
          ) : (
            <span />
          )}
          <Chart />
          <IncidentRows incidents={incidents.closed} />
        </>
      ) : (
        <Loader active size="massive" />
      )}
    </Container>
  )
}

function IncidentRows({ incidents }: { incidents: IncidentType[] }) {
  return incidents && incidents.length > 0 ? (
    <>
      <Header size="medium">Past incidents</Header>
      {incidents?.map((incident) => (
        <Incident key={incident.id} incident={incident} />
      ))}
    </>
  ) : (
    <></>
  )
}
