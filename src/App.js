import { Navbar } from 'decentraland-ui/dist/components/Navbar/Navbar';
import { Page } from 'decentraland-ui/dist/components/Page/Page';
import { Footer } from 'decentraland-ui/dist/components/Footer/Footer';
import { Header } from 'decentraland-ui/dist/components/Header/Header';
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu';
import Helmet from 'react-helmet';
import styled from "styled-components";
import { useState, useEffect } from 'react';

function App() {
  const Container = styled.div`
    max-width: 1008px;
    padding: 16px;
    margin: 16px auto;
  `;

  const [pokemonName, setPokemonName] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    setPokemonName(event.target.elements.pokemonName.value)
  }

  return (
    <Container>
      <div className="Page-story-container">
        <Navbar 
            activePage="marketplace" 
            leftMenu={
              <>
                <Menu.Item>Status Page</Menu.Item>                                
              </> 
            }
        />
        <Helmet>
            <meta charSet="utf-8" />
            <title>Decentraland Status</title>
            <link rel="canonical" href="http://decentraland.status.org/" />
            <meta name="Decentraland status page" content="Helmet application" />
        </Helmet>
        <Page>
          <Header>Hello Wolrd</Header>
        </Page>
      </div>
      <Header />
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="pokemonName">Pokemon Name</label>
          <div>
            <input id="pokemonName" />
            <button type="submit">Submit</button>
          </div>
        </form>
        <hr />
        <PokemonInfo pokemonName={pokemonName} />
      </div>
      <Footer />
    </Container>
  );
}

export default App;

function getIncidents() {
  return [
    {
      id: 1,
      closed_at: "",
      created_at: "",
      title: 'titulo',
      body: "descript"
    }
  ]
}

function PokemonInfo({pokemonName}) {
  const [pokemon, setPokemon] = useState(null)

  useEffect(() => {
    if (!pokemonName) {
      return
    }
    fetchPokemon(pokemonName).then(pokemonData => {
      setPokemon(pokemonData)
    })
  }, [pokemonName])

  if (!pokemonName) {
    return 'Submit a pokemon'
  }

  if (!pokemon) {
    return '...'
  }

  return <pre>{JSON.stringify(pokemon, null, 2)}</pre>
}

function fetchPokemon(name) {
  return window
    .fetch('https://crashbot.decentraland.zone/list', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
      mode: 'no-cors'
    })
    .then(r => {
      console.log('llegar response')
      console.log(r)
      console.log(r)
      return r.json()
    })
    .then(response => {
      console.log(response)
      return response
    })
}