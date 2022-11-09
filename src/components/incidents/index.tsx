import Incident from "./incident"
import { useEffect, useState } from "react"
import Status from "../status"
import { IncidentsResponse, IncidentType } from "../types"
import { Container, Loader } from "decentraland-ui"
import Title from "../Title"
import { Link } from "react-router-dom"

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

export default function Incidents({ open }: { open: boolean }) {
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
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <Loader active size="massive" />
  } else {
    if (open) {
      if (incidents)
        return OpenIncidentsContainer(incidents)
      else
        return IncidentsFailContainer(incidents)
    } else {
      if (incidents)
        return IncidentHistoryContainer(incidents)
      else
        return <></>
    }
  }
}

function IncidentsFailContainer(incidents: null) {
  return (
    <Container className="incidents">
      <Status incidents={incidents} />
    </Container>
  )
}

function OpenIncidentsContainer(incidents: IncidentsResponse) {
  return (
    <Container className="incidents">
      <Status incidents={incidents} />
      {incidents.open.length > 0 ? (
        <>
          <Title title="Open Incidents" />
          <IncidentRows incidents={incidents.open} />
        </>
      ) : (
        <span />
      )}
      <Link to="/history" className="history-button" >Incidents History</Link>
    </Container>
  )
}

function IncidentHistoryContainer(incidents: IncidentsResponse) {
  return (
    <Container className="incidents">
      {incidents.closed.length > 0 ? (
        <>
          <Title title="Incidents History" />
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
