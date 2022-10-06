import styled from "styled-components";
import moment from "moment";
import ReactMarkdown from "react-markdown";

const IncidentDiv = styled.div`
  transition: 0.3s;
  border-left: 16px solid
    ${(props) =>
    props.active ? "rgba(177, 177, 177,0.2)" : "rgba(73, 144, 226, 0.2)"};
  background-color: white;
  border-radius: 3px;
  padding: 16px;
  box-shadow: 0px 0px 33px -32px rgba(0, 0, 0, 0.75);
  margin-top: 8px;

  :not(:last-child) {
    margin-bottom: 16px;
  }
`;

const Details = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3px;
`;

const Title = styled.div`
  margin-right: 16px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #1e1e1e;
`;

const Comment = styled.div`
  white-space: break-spaces;
  color: #1e1e1e;
`;

const Status = styled.div`
  color: ${(props) => (props.open ? "#2f5888" : "#6e6b6b")};
  background-color: ${(props) =>
    props.open ? "rgba(73, 144, 226, 0.1)" : "rgba(177, 177, 177, 0.1)"};
  padding: 5px 12px;
  border-radius: 16px;
  font-size: 13px;
  transition: 0.3s;
`;

const severities = {
  'sev-1': {
    color: '#42142A',
    backgroundColor: '#FF5F5D',
    text: 'SEV-1'
  },
  'sev-2': {
    color: '#81201D',
    backgroundColor: '#FF8244',
    text: 'SEV-2'
  },
  'sev-3': {
    color: '#81270B',
    backgroundColor: '#FF9722',
    text: 'SEV-3'
  },
  'sev-4': {
    color: '#813400',
    backgroundColor: '#FFB600',
    text: 'SEV-4'
  },
  'sev-5': {
    color: '#814A00',
    backgroundColor: '#FFDD00',
    text: 'SEV-5'
  },
}

const Severity = styled.div`
  color: ${(props) => (severities[props.severity].color)};
  background-color: ${(props) => (severities[props.severity].backgroundColor)};
  padding: 5px 12px;
  border-radius: 16px;
  font-size: 13px;
  transition: 0.3s;
`;

const Date = styled.div`
  font-size: 13px;
  color: #6e6b6b;
  font-weight: bold;
`;

export default function Incident({ incident }) {
  return (
    <IncidentDiv active={incident.closed_at}>
      <Details>
        <Date>
          Opened {moment(incident.reported_at)
            .format("MMMM Do YYYY, h:mm a")
            .toUpperCase()}
        </Date>
        {(incident.closed_at) ? (
          <Date>
            Closed {moment(incident.closed_at)
              .format("MMMM Do YYYY, h:mm a")
              .toUpperCase()}
          </Date>
         ) : (<span></span>) }
        <Severity severity={incident.severity}>{severities[incident.severity].text}</Severity>
        <Status open={incident.status === 'open'}>
          {incident.status === 'open' ? "Open" : "Closed"}
        </Status>
      </Details>
      <Title>DCL-{incident.id} {incident.title}</Title>
      <Comment>
        <ReactMarkdown>{incident.description}</ReactMarkdown>
      </Comment>
      < Comment><b>Reported by:</b> {incident.modified_by}</Comment>
      < Comment><b>Point:</b> {incident.point}</Comment>
      < Comment><b>Contact:</b> {incident.contact}</Comment>
      {(incident.rca_link) ? (< Comment><b>RCA:</b> {incident.rca_link}</Comment> ) : (<span></span>) }
    </IncidentDiv>
  )
}
