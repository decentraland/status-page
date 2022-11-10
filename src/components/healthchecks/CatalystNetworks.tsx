import { FC, useState, createRef, useEffect } from "react"
import { Collapse } from "react-bootstrap"
import { HealthInfo } from "./HealthInfo"
import Monitor from "./Monitor"

export const CatalystNetworks: FC = () => {
  const [open, setToggle] = useState<boolean>(false)
  const [healthy, setHealth] = useState<boolean>(true)

  const productiveServersRefs = new Map([
    ["peer-ec1.decentraland.org", createRef<Monitor>()], // DCL - US East 1
    ["peer-ec2.decentraland.org", createRef<Monitor>()], // DCL - US East 2
    ["peer-wc1.decentraland.org", createRef<Monitor>()], // DCL - US West
    ["peer-eu1.decentraland.org", createRef<Monitor>()], // DCL - EU
    ["peer-ap1.decentraland.org", createRef<Monitor>()], // DCL - AP1
    ["interconnected.online", createRef<Monitor>()], // Esteban
    ["peer.decentral.io", createRef<Monitor>()], // Baus
    ["peer.melonwave.com", createRef<Monitor>()], // Ari
    ["peer.kyllian.me", createRef<Monitor>()], // Kyllian
    ["peer.uadevops.com", createRef<Monitor>()], // SFox
    ["peer.dclnodes.io", createRef<Monitor>()] // DSM
  ])

  function switchToggle() {
    setToggle(!open)
  }

  useEffect(() => {
    
    console.log(productiveServersRefs.get("peer.dclnodes.io")?.current)
  })

  return (
    <>
      <div 
        className={`catalysts-network ${open ? 'caret-down' : 'caret-side'}`}
        onClick={switchToggle}>
          Catalysts Networks
          <HealthInfo healthy={healthy}/>
      </div>
      <Collapse in={open}>
        <ul>
          { Array.from(productiveServersRefs.entries()).map( ([server, ref]) => {
            return <Monitor server={server} ref={ref} />
          })}
        </ul>
      </Collapse>
    </>
  )
}
