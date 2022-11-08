import { FC, useEffect, useState } from 'react';
import { Collapse } from 'react-bootstrap';
import Title from './Title';

// async function fetchStatus() {
//   const res = await fetch(`${listURL}/list`, {
//     method: "GET",
//     headers: {
//       "content-type": "application/json",
//       "crashbot": apiKey
//     },
//   })
//   return res
// }

const productiveServers = [
  "https://peer-ec1.decentraland.org", // DCL - US East 1
  "https://peer-ec2.decentraland.org", // DCL - US East 2
  "https://peer-wc1.decentraland.org", // DCL - US West
  "https://peer-eu1.decentraland.org", // DCL - EU
  "https://peer-ap1.decentraland.org", // DCL - AP1
  "https://interconnected.online", // Esteban
  "https://peer.decentral.io", // Baus
  "https://peer.melonwave.com", // Ari
  "https://peer.kyllian.me", // Kyllian
  "https://peer.uadevops.com", // SFox
  "https://peer.dclnodes.io", // DSM
]

const Healthchecks: FC = () => {
  // useEffect(() => {
  //   fetchStatus()
  //     .then((response) => {
  //       if (response.ok) {
  //         return response.json()
  //       }
  //       throw response
  //     })
  //     .then(setIncidents)
  //     .catch(err => {
  //       console.error(err)
  //     })
  //     .finally(() => setLoading(false))
  // }, [])

  return (
    <>
      <Title title='System Status' />
      <ul className="list-group">
        <li className="list-group-item"><CatalystNetworks /></li>
      </ul>
    </>
  );
};

const CatalystNetworks: FC = () => {
  const [open, setToggle] = useState<boolean>(false)

  function switchToggle() {
    setToggle(!open)
  }

  return (
    <>
      <div className={`catalysts-network ${ open ? 'caret-down' : 'caret-side'}`} onClick={switchToggle}>Catalysts Networks</div>
      <Collapse in={open}>
        <div id="example-collapse-text">
          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
          terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
          labore wes anderson cred nesciunt sapiente ea proident.
        </div>
      </Collapse>
    </>
  )
}

export default Healthchecks;