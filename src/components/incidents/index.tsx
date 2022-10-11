import Incident from "./incident"
import { useEffect, useState } from "react"
import Status from "../status"
import { IncidentsResponse, IncidentType } from "../types"
import Chart from "../onlines"
import { Container, Header, Loader } from "decentraland-ui"

async function fetchStatus() {
  const apiKey = process.env.REACT_APP_CRASHBOT_API_KEY ?? ''
  const listURL = process.env.REACT_APP_LIST_URL ?? 'https://crashbot.decentraland.systems'
  console.log(process.env)
  const res = await fetch(`${listURL}/list`, {
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
          <Chart />
          {incidents.open.length > 0 ? (
            <>
              <Header size="medium">Open incidents</Header>
              <IncidentRows incidents={incidents.open} />
              
            </>
          ) : (
            <span />
          )}
          <br/>
          {incidents.closed.length > 0 ? (
            <>
              <Header size="medium">Past incidents</Header>
              <IncidentRows incidents={incidents.closed} />
              
            </>
          ) : (
            <span />
          )}
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
      {incidents?.map((incident) => (
        <Incident key={incident.id} incident={incident} />
      ))}
    </>
  ) : (
    <></>
  )
}
