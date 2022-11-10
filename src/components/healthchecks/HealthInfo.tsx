import { FC } from "react"

interface HealthInfoProps {
  healthy: boolean | undefined
}

export const HealthInfo: FC<HealthInfoProps> = ({healthy}) => {
  return (
    <span className={`health-info ${healthy ? 'operational' : 'unavailable'}`}>
      {healthy ? 'Operational' : 'Unavailable'}
    </span>
  )
}
