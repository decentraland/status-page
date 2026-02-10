import { FC, useState, useEffect, useRef, useMemo } from "react"
import { Collapse } from "react-bootstrap"
import { catalystServers } from "../../config/environment"
import { HealthInfo } from "./HealthInfo"
import Monitor from "./Monitor"

export const CatalystNetworks: FC = () => {
  const [open, setToggle] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [status, setStatus] = useState<string>()

  // Create refs for each catalyst server
  const refs = useRef<Map<string, React.RefObject<Monitor>>>(new Map())
  
  // Initialize refs map (only once since catalystServers is static)
  const serversWithRefs = useMemo(() => {
    return catalystServers.map(server => {
      if (!refs.current.has(server.hostname)) {
        refs.current.set(server.hostname, { current: null })
      }
      return {
        ...server,
        ref: refs.current.get(server.hostname)!
      }
    })
  }, [])

  function switchToggle() {
    setToggle(!open)
  }

  function serverFinishedLoading() {
    setLoadingBasedOnCatalysts()
  }

  function setLoadingBasedOnCatalysts() {
    if (loading) {
      let stillLoading = false
      serversWithRefs.forEach(({ ref }) => {
        const monitorLoading = ref.current?.state.loading ?? true
        stillLoading = stillLoading || monitorLoading
      })
      setLoading(stillLoading)
    }
  }

  useEffect(() => {
    // Returns the number of unavailable catalysts
    function getNumberOfUnavailableCatalysts() {
      let unavailable = 0
      serversWithRefs.forEach(({ ref }) => {
        if (!ref.current?.state.healthy)
          unavailable++
      })
      return unavailable
    }
    
    // Check if every catalyst finished loading
    if (!loading) {
      const unavailableCatalysts = getNumberOfUnavailableCatalysts()
      if (unavailableCatalysts === 0)
        setStatus('operational')
      else if (unavailableCatalysts < 3)
        setStatus('degraded')
      else
        setStatus('unavailable')
    }
  }, [loading, serversWithRefs])
  
  // Set row css class depending on overall status
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
          { serversWithRefs.map(({ hostname, ref }) => {
            return <Monitor url={`https://${hostname}/about`} name={hostname} key={hostname} finishLoading={serverFinishedLoading} ref={ref} isCatalyst />
          })}
        </ul>
      </Collapse>
    </li>
  )
}


