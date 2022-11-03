import Incident from "./incident"
import { useEffect, useState } from "react"
import Status from "../status"
import { IncidentsResponse, IncidentType } from "../types"
import { Container, Header, Loader } from "decentraland-ui"

async function fetchStatus() {
  const apiKey = process.env.REACT_APP_CRASHBOT_API_KEY ?? ''
  const listURL = process.env.REACT_APP_LIST_URL ?? 'https://crashbot.decentraland.systems'
  const res = await fetch(`${listURL}/list`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      "crashbot": apiKey
    },
  })
  return res
}

export default function Incidents() {
  const [incidents, setIncidents] = useState<IncidentsResponse | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    fetchStatus()
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
        throw response
      })
      .then(setIncidents)
      .catch(err => {
        console.error(err)
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <Loader active size="massive" />
  } else {
    if (incidents)
      return IncidentsContainer(incidents)
    else
      return IncidentsFailContainer(incidents)
  }
}

function IncidentsFailContainer(incidents: null) {
  return <Container>
    <Status incidents={incidents} />
  </Container>
}

function IncidentsContainer(incidents: IncidentsResponse) {
  return (
    <Container>
      <Status incidents={incidents} />
      {incidents.open.length > 0 ? (
        <>
          <Header size="medium">Open incidents</Header>
          <IncidentRows incidents={incidents.open} />

        </>
      ) : (
        <span />
      )}
      <br />
      {incidents.closed.length > 0 ? (
        <>
          <Header size="medium">Past incidents</Header>
          <IncidentRows incidents={incidents.closed} />

        </>
      ) : (
        <span />
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
