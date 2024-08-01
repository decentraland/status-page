import { Container } from 'decentraland-ui';
import { FC } from 'react';
import Title from '../Title';
import { CatalystNetworks } from './CatalystNetworks';
import Monitor from './Monitor';

const Healthchecks: FC = () => {
  return (
    <Container>
      <Title title='System Status' />
      <ul className="list-group system-status">
        <CatalystNetworks />                
        <Monitor url={'https://comms-gatekeeper.decentraland.org/status'} name={'Communications Gate Keeper'} />
        <Monitor url={'https://notifications.decentraland.org/status'} name={'Notifications System'} />
        <Monitor url={'https://nft-api.decentraland.org/health/ready'} name={'Marketplace'} />
        <Monitor url={'https://builder-api.decentraland.org/v1/info'} name={'Builder'} />
        <Monitor url={'https://synapse.decentraland.org/_matrix/client/versions'} name={'Chat'} />
        <Monitor url={'https://api.decentraland.org/v1/map.png'} name={'Atlas Server'} />
        <Monitor url={'https://places.decentraland.org/api/status'} name={'Places'} />
        <Monitor url={'https://events.decentraland.org/api/status'} name={'Events'} />
        <Monitor url={'https://dcl-lists.decentraland.org/status'} name={'Decentraland Lists'} />    
        <Monitor url={'https://asset-bundle-converter.decentraland.org/health/live'} name={'Asset Bundle Converter'} />
        {/* <Monitor url={'https://auth-api.decentraland.org/health/ready'} name={'Auth Server'} />            */}
        <Monitor url={'https://decentraland.org'} name={'Decentraland Domain'} />
      </ul>
    </Container>
  );
};

export default Healthchecks;
