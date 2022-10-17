export type IncidentsResponse = {
  open: IncidentType[]
  closed: IncidentType[]
}

export type IncidentType = {
  id: string
  severity: string
  status: string
  closed_at: string
  reported_at: string
  title: string
  description: string
  rca_link: string
}