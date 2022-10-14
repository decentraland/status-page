import styled from "styled-components"
import moment from "moment"
import ReactMarkdown from "react-markdown"
import { IncidentType } from "../../types"

import "bootstrap/dist/css/bootstrap.css";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const IncidentDiv = styled.div`
  transition: 0.3s;
  border-left: 16px solid
    ${(props: { open: boolean }) => (props.open ? "rgba(73, 144, 226, 0.2)" : "rgba(177, 177, 177,0.2)")};
  background-color: white;
  border-radius: 3px;
  padding: 16px;
  box-shadow: 0px 0px 33px -32px rgba(0, 0, 0, 0.75);
  margin-top: 8px;

  :not(:last-child) {
    margin-bottom: 16px;
  }
`

const Details = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3px;
`

const Title = styled.div`
  margin-right: 16px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #1e1e1e;
`

const Comment = styled.div`
  white-space: break-spaces;
  color: #1e1e1e;
`

const severities: Record<string, { color: string; backgroundColor: string; text: string; description: string }> = {
  "sev-1": {
    color: "#42142A",
    backgroundColor: "#FF5F5D",
    text: "SEV-1",
    description: "Critical issues impacting more than 50% of the users",
  },
  "sev-2": {
    color: "#81201D",
    backgroundColor: "#FF8244",
    text: "SEV-2",
    description: " Critical system issue actively impacting a limited number of users",
  },
  "sev-3": {
    color: "#81270B",
    backgroundColor: "#FF9722",
    text: "SEV-3",
    description: "Stability or minor user impacting issue that requires immediate attention",
  },
  "sev-4": {
    color: "#813400",
    backgroundColor: "#FFB600",
    text: "SEV-4",
    description: "Minor issue requiring action but not affecting the ability to use the platform",
  },
  "sev-5": {
    color: "#814A00",
    backgroundColor: "#FFDD00",
    text: "SEV-5",
    description: "Cosmetic issues or bugs not affecting the users’ ability to use the platform",
  },
}

const Severity = styled.div`
  color: ${(props: { severity: string }) => severities[props.severity].color};
  background-color: ${(props: { severity: string }) => severities[props.severity].backgroundColor};
  padding: 5px 12px;
  border-radius: 16px;
  font-size: 13px;
  transition: 0.3s;
`

const Date = styled.div`
  font-size: 13px;
  color: #6e6b6b;
  font-weight: bold;
`

export default function Incident({ incident }: { incident: IncidentType }) {
  return (
    <IncidentDiv open={incident.status === 'open'}>
      <Details>
        <Date>Opened {moment(incident.reported_at).format("MMMM DD YYYY, h:mm a").toUpperCase()} (UTC)</Date>
        {incident.closed_at ? (
          <Date>Closed {moment(incident.closed_at).format("MMMM DD YYYY, h:mm a").toUpperCase()} (UTC)</Date>
        ) : (
          <span></span>
        )}        
        <OverlayTrigger placement="top" overlay={<Tooltip>{severities[incident.severity].description}</Tooltip>}>
          <Severity severity={incident.severity}>{severities[incident.severity].text}</Severity>
        </OverlayTrigger>      
      </Details>
      <Title>{incident.title}</Title>
      <Comment>
        <ReactMarkdown>{incident.description}</ReactMarkdown>
      </Comment>
      {incident.rca_link ? (
        <Comment>
          <b>RCA:</b> <a href={incident.rca_link} target="_blank" rel="noreferrer">{incident.rca_link}</a>
        </Comment>
      ) : (
        <span></span>
      )}
    </IncidentDiv>
  )
}
