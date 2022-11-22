import styled from "styled-components";
import { severities } from "../incidents/incident";
import { IncidentsResponse } from "../types";
import { statuses } from "./statuses";

const StatusBar = styled.div`
  background-color: ${(props: {backgroundColor?: string}) =>
    props.backgroundColor ? props.backgroundColor : "#b1b1b1"};
  color: white;
  padding: 16px;
  border-radius: 3px;
  margin-bottom: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  transition: 0.3s;
`;

const StatusHeader = styled.h2`
  font-size: 24px;
  margin: 0;
  font-weight: 600;
  color: white;
`;

export default function Status ({ incidents }: { incidents: IncidentsResponse | null }) {
  let backgroundColor
  let message
  if (incidents) {
    if (incidents.open && incidents.open.length > 0) {
      // There are open incidents
      message = statuses.outage.message

      // Match banner color with maximum severity color. Incidents are ordered by descending severity
      backgroundColor = severities[incidents.open[0].severity].backgroundColor
    } else {
      // All systems operational
      backgroundColor = statuses.operational.backgroundColor
      message = statuses.operational.message
    }
  } else {
    // Problem loading incidents
    backgroundColor = statuses.no_information.backgroundColor
    message = statuses.no_information.message
  }

  return (
    <>
      <StatusBar backgroundColor={backgroundColor}>
        <StatusHeader>{message}</StatusHeader>
        {/* <Reload onClick={refetch}>{loading ? "reloading" : timeAgo}</Reload> */}
      </StatusBar>
    </>
  );
};
