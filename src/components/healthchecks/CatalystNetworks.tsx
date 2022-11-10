import { FC, useState, createRef, useEffect, useRef } from "react"
import { Collapse } from "react-bootstrap"
import { HealthInfo } from "./HealthInfo"
import Monitor from "./Monitor"

export const CatalystNetworks: FC = () => {
  const [open, setToggle] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [status, setStatus] = useState<string>()

  const productiveServersRefs = new Map([
    ["peer-ec1.decentraland.org", useRef<Monitor>(null)], // DCL - US East 1
    ["peer-ec2.decentraland.org", useRef<Monitor>(null)], // DCL - US East 2
    ["peer-wc1.decentraland.org", useRef<Monitor>(null)], // DCL - US West
    ["peer-eu1.decentraland.org", useRef<Monitor>(null)], // DCL - EU
    ["peer-ap1.decentraland.org", useRef<Monitor>(null)], // DCL - AP1
    ["interconnected.online", useRef<Monitor>(null)], // Esteban
    ["peer.decentral.io", useRef<Monitor>(null)], // Baus
    ["peer.melonwave.com", useRef<Monitor>(null)], // Ari
    ["peer.kyllian.me", useRef<Monitor>(null)], // Kyllian
    ["peer.uadevops.com", useRef<Monitor>(null)], // SFox
    ["peer.dclnodes.io", useRef<Monitor>(null)] // DSM
  ])

  function switchToggle() {
    setToggle(!open)
  }

  

  useEffect(() => {
    // Check if every catalyst finished loading
    function setLoadingBasedOnCatalysts() {
      if (loading) {
        let stillLoading = false
        productiveServersRefs.forEach((ref, server) => {
          const serverLoading = ref.current?.state.loading ?? true
          stillLoading = stillLoading || serverLoading
        })
        setLoading(stillLoading)
      }
    }

    // Returns the number of unavailable catalysts
    function getNumberOfUnavailableCatalysts() {
      let unavailable = 0
      productiveServersRefs.forEach((ref, server) => {
        console.log(`server: ${server} is healthy ${ref.current?.state.healthy}`)
        if (!ref.current?.state.healthy)
          unavailable++
      })
      return unavailable
    }
    
    setLoadingBasedOnCatalysts()
    if (!loading) {
      const unavailableCatalysts = getNumberOfUnavailableCatalysts()
      if (unavailableCatalysts === 0)
      setStatus('operational')
      else if (unavailableCatalysts < 3)
      setStatus('degraded')
      else
      setStatus('unavailable')
    }
  }, [loading, productiveServersRefs])

  console.log(`master loading: ${loading}`)
  
  let rowClass = 'list-group-item health-row'
  if(status)
    rowClass += ` ${status}`

  return (
    <li className={rowClass}>
      <div 
        className={`catalysts-network ${open ? 'caret-down' : 'caret-side'}`}
        onClick={switchToggle}>
          Catalysts Networks
          { status ? <HealthInfo status={status}/> : <></>}
      </div>
      <Collapse in={open}>
        <ul>
          { Array.from(productiveServersRefs.entries()).map( ([server, ref]) => {
            return <Monitor server={server} ref={ref} />
          })}
        </ul>
      </Collapse>
    </li>
  )
}


