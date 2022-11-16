import { Component } from "react"
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

    return (
      <li className={rowClass}>
        <div >
          {this.props.name}
          { !this.state.loading ? <HealthInfo status={this.state.healthy ? 'operational' : 'unavailable'}/> : <></> } 
        </div>
      </li>
    )
  }
}

export default Monitor