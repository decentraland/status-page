import styled from "styled-components"
import Incident from "./incident"
import { useEffect, useState } from "react"
import Status from "../status"
import { IncidentsResponse, IncidentType } from "../types"

const Container = styled.div`
  margin: 32px auto 0 auto;
  max-width: 1040px;
`

const Title = styled.div`
  padding: 0 16px;
  font-size: 27px;
  margin-bottom: 16px;
`

const NoFound = styled.div`
  margin: 0 18px;
`

async function fetchStatus() {
  const res = await fetch("https://crashbot.decentraland.systems/list", {
    method: "GET",
    headers: {
      "content-type": "application/json",
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
      <Status incidents={incidents} />
      {incidents ? (
        <>
          {incidents.open.length > 0 ? (
            <>
              <Title>Open Incidents</Title>
              <IncidentRows incidents={incidents.open} />
            </>
          ) : (
            <span />
          )}

          <Title>Past Incidents</Title>
          <IncidentRows incidents={incidents.closed} />
        </>
      ) : (
        <NoFound>Loading incidents.</NoFound>
      )}
    </Container>
  )
}

function IncidentRows({ incidents }: { incidents?: IncidentType[] }) {
  return incidents && incidents.length > 0 ? (
    <>
      {incidents?.map((incident) => (
        <Incident key={incident.id} incident={incident} />
      ))}
    </>
  ) : (
    <NoFound>No incidents found.</NoFound>
  )
}
