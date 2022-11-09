import { FC, useEffect, useState } from 'react';
import { Collapse } from 'react-bootstrap';
import Title from './Title';

const Healthchecks: FC = () => {
  return (
    <>
      <Title title='System Status' />
      <ul className="list-group system-status">
        <li className="list-group-item"><CatalystNetworks /></li>
        <li className="list-group-item">builder.decentraland.org</li>
        <li className="list-group-item">market.decentraland.org</li>
        <li className="list-group-item">synapse.decentraland.org</li>
      </ul>
    </>
  );
};

const CatalystNetworks: FC = () => {
  const [open, setToggle] = useState<boolean>(false)

  const productiveServers = [
    "peer-ec1.decentraland.org", // DCL - US East 1
    "peer-ec2.decentraland.org", // DCL - US East 2
    "peer-wc1.decentraland.org", // DCL - US West
    "peer-eu1.decentraland.org", // DCL - EU
    "peer-ap1.decentraland.org", // DCL - AP1
    "interconnected.online", // Esteban
    "peer.decentral.io", // Baus
    "peer.melonwave.com", // Ari
    "peer.kyllian.me", // Kyllian
    "peer.uadevops.com", // SFox
    "peer.dclnodes.io" // DSM
  ]

  function switchToggle() {
    setToggle(!open)
  }

  return (
    <>
      <div className={`catalysts-network ${ open ? 'caret-down' : 'caret-side'}`} onClick={switchToggle}>Catalysts Networks</div>
      <Collapse in={open}>
        <ul>
          { productiveServers.map( (server) => {
            return <li><CatalystMonitor server={server} /></li>
          })}
        </ul>
      </Collapse>
    </>
  )
}

interface CatalystMonitorProps {
  server: string
}

const CatalystMonitor: FC<CatalystMonitorProps> = ({server}) => {
  const [healthy, setHealth] = useState<boolean>()
  const [loading, setLoading] = useState<boolean>(true)

  function getServerHealth() {
    fetch(`https://${server}/about`)
      .then((res) => {
        console.log(res)
        setHealth(res.status === 200)
      })
      .catch(console.log)
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    getServerHealth()
  })

  return (
    <>
      <div>
        {server}
        <span className={`health-info ${healthy ? 'operational' : 'unavailable'}`}>
          {healthy ? 'Operational' : 'Unavailable'}
        </span>
      </div>
    </>
  )
}

export default Healthchecks;
