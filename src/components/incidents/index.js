import styled from "styled-components";
import Incident from "./incident";
import { useEffect, useState } from "react";

const Container = styled.div`
  margin: 32px auto 0 auto;
  max-width: 1040px;
`;

const Title = styled.div`
  padding: 0 16px;
  font-size: 20px;
  margin-bottom: 16px;
`;

const NoFound = styled.div`
  margin: 0 8px;
`;

function fetchPokemon() {
  return window
    // .fetch('https://crashbot.decentraland.systems/list', {
    .fetch('http://localhost:5000/list', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      }
    })
    .then(r => {
      console.log('llegar response')
      console.log(r)
      console.log(r.status)
      console.log(r.statusText)
      return r.json()
    })
    .then(response => {
      console.log(response)
      return response
    })
}

export default function Incidents () {
  const [incidents, setPokemon] = useState(null)
  let openIncidents = []
  let closedIncidents = []

  useEffect(() => {
    fetchPokemon().then(pokemonData => {
      setPokemon(pokemonData)
    })
  }, [])

  if (incidents) {
    openIncidents = incidents.open
    closedIncidents = incidents.closed
  }


  return (
    <Container>
      { incidents ? (
        <>
          <Title>Open Incidents</Title>
          <IncidentRows incidents={openIncidents} />
          <Title>Past Incidents</Title>
          <IncidentRows incidents={closedIncidents} />
        </>
      ) : (
        <NoFound>Loading incidents.</NoFound>
      )}
    </Container>
  );
};

function IncidentRows({ incidents }) {
  return ( (incidents && incidents.length > 0) ? (
      incidents?.map((incident) => (
        <Incident key={incident.id} incident={incident} />
      ))
    ) : (
      <NoFound>No Incidents found.</NoFound>
    )
  ) 
}