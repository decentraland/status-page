import styled from "styled-components";
import { statuses } from "./statuses";

const StatusBar = styled.div`
  background-color: ${(props) =>
    props.backgroundColour ? props.backgroundColour : "#b1b1b1"};
  color: white;
  padding: 16px;
  border-radius: 3px;
  margin-bottom: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  transition: 0.3s;
`;

const StatusHeader = styled.h2`
  font-size: 20px;
  margin: 0;
  font-weight: normal;
`;

const Reload = styled.button`
  background-color: transparent;
  color: white;
  text-decoration: underline;
  border: none;
  cursor: pointer;
  text-align: right;
  padding: 0;
`;

const Code = styled.code`
  white-space: pre-wrap;
  display: block;
`;

// TODO: change all systems status based on current status of all components
export default function Status ({ incidents }) {
  // const [status] = useStatus(components);
  // const [timeAgo] = useRefetch(refetch, loading);

  let backgroundColour = statuses.operational.backgroundColour
  let message = statuses.operational.message
  if (incidents) {
    console.log('entra1')
    if (incidents.open && incidents.open.length > 0) {
      console.log('entra2:')
      console.log(incidents.open.length)
      backgroundColour = statuses.outage.backgroundColour
      message = statuses.outage.message
    }

  }

  return (
    <>
      <StatusBar backgroundColour={backgroundColour}>
        <StatusHeader>{message}</StatusHeader>
        {/* <Reload onClick={refetch}>{loading ? "reloading" : timeAgo}</Reload> */}
      </StatusBar>
    </>
  );
};
