import { Component } from "react"
import { OverlayTrigger, Tooltip } from "react-bootstrap"
import { HealthInfo } from "./HealthInfo"

interface MonitorProps {
  url: string,
  name: string
  finishLoading?: () => void
  isCatalyst?: boolean
}

export interface MonitorState {
  healthy: boolean,
  loading: boolean
}

class Monitor extends Component<MonitorProps, MonitorState> {
  constructor(props: MonitorProps) {
    super(props)
    this.state = {
      healthy: false,
      loading: true
    }
  }

  async getServerHealth() {
    fetch(this.props.url)
      .then((res) => {
        this.setState({
          ...this.state,
          healthy: res.status === 200
        })
      })
      .catch(console.log)
      .finally(() => {
        this.setState({
          ...this.state,
          loading: false
        })
        if (this.props.finishLoading)
          this.props.finishLoading()
      })
  }

  componentDidMount() {
    this.getServerHealth()
  }

  render() {
    // Update row class when finish loading
    let rowClass = 'health-row'
    if (!this.props.isCatalyst)
      rowClass += ' list-group-item'
    if (!this.state.loading) {
      if (this.state.healthy)
        rowClass += ' operational'
      else
        rowClass += ' unavailable'
    }

    const urlTooltip = (
      <Tooltip id={`tooltip-${this.props.name}`}>
        {this.props.url}
      </Tooltip>
    )

    return (
      <li className={rowClass}>
        <div>
          {this.props.name}
          <OverlayTrigger placement="top" overlay={urlTooltip}>
            <a 
              href={this.props.url} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ marginLeft: '6px', display: 'inline-block', verticalAlign: 'middle' }}
              onClick={(e) => e.stopPropagation()}
            >
              <svg 
                width="14" 
                height="14" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="#999" 
                strokeWidth="2"
                style={{ cursor: 'pointer' }}
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          </OverlayTrigger>
          { !this.state.loading ? <HealthInfo status={this.state.healthy ? 'operational' : 'unavailable'}/> : <></> } 
        </div>
      </li>
    )
  }
}

export default Monitor