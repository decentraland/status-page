import styled from "styled-components"
import Incident from "./incident"
import { useEffect, useState } from "react"
import Status from "../status"
import { IncidentsResponse, IncidentType } from "../types"
import { Container, Empty, Header, HeaderMenu, Loader } from "decentraland-ui"

const Empty2 = Empty as any

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
