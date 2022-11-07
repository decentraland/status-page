import Incident from "./incident"
import { useEffect, useState } from "react"
import Status from "../status"
import { IncidentsResponse, IncidentType } from "../types"
import { Container, Loader } from "decentraland-ui"
import Title from "../Title"

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
      .catch(err => {
        console.error(err)
      })
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
    <Container>
      <Status incidents={incidents} />
    </Container>
  )
}

function OpenIncidentsContainer(incidents: IncidentsResponse) {
  return (
    <Container>
      <Status incidents={incidents} />
      {incidents.open.length > 0 ? (
        <>
          <Title title="Open incidents" />
          <IncidentRows incidents={incidents.open} />
        </>
      ) : (
        <span />
      )}
    </Container>
  )
}

function IncidentHistoryContainer(incidents: IncidentsResponse) {
  return (
    <Container>
      {incidents.closed.length > 0 ? (
        <>
          <Title title="Past incidents" />
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
