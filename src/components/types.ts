export type IncidentsResponse = {
  open: IncidentType[]
  closed: IncidentType[]
}

export type IncidentType = {
  id: string
  severity: string
  open: boolean
  closed_at: string
  reported_at: string
  title: string
  description: string
  rca_link: string
}