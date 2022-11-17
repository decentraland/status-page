import { FC } from "react"

interface HealthInfoProps {
  status: string
}

const statusesText: Record<string, string> = {
  'operational': 'Operational',
  'degraded': 'System Degraded',
  'unavailable': 'Unavailable'
}

export const HealthInfo: FC<HealthInfoProps> = ({status}) => {
  return (
    <span className={`health-info ${status}`}>
      {statusesText[status]}
    </span>
  )
}
