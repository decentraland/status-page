import Incident from "./incident"
import { useEffect, useState } from "react"
import Status from "../status"
import { IncidentsResponse, IncidentType } from "../types"
import { Container, Header, HeaderMenu, Loader } from "decentraland-ui"

async function fetchStatus() {
  const apiKey = process.env.CRASHBOT_API_KEY ?? ''
  console.log(apiKey)
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
    console.log('aslsdfgsdfgsdf ------------------------- ---------------- -------------asdf asdf -')
    const apiKey = process.env.CRASHBOT_API_KEY ?? ''
    console.log(process)
    console.log(process.env)
    console.log(apiKey)
    fetchStatus().then(setIncidents)
  }, [])

  return (
    <Container>
      <HeaderMenu>
        <HeaderMenu.Left>
          <Header>Incidents</Header>
        </HeaderMenu.Left>
      </HeaderMenu>
      {incidents ? (
        <>
          <Status incidents={incidents} />
          {incidents.open.length > 0 ? (
            <>
              <Header size="medium">Open incidents</Header>
              <IncidentRows incidents={incidents.open} />
            </>
          ) : (
            <span />
          )}

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
