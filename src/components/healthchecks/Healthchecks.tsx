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
        <Monitor url={'https://marketplace-api.decentraland.org/health/ready'} name={'Marketplace'} />
        <Monitor url={'https://builder-api.decentraland.org/v1/info'} name={'Builder'} />
        <Monitor url={'https://synapse.decentraland.org/_matrix/client/versions'} name={'Chat'} />
        <Monitor url={'https://api.decentraland.org/v1/map.png'} name={'Atlas Server'} />
        <Monitor url={'https://places.decentraland.org/api/status'} name={'Places'} />
        <Monitor url={'https://events.decentraland.org/api/status'} name={'Events'} />
        <Monitor url={'https://rewards.decentraland.org/api/status'} name={'Rewards'} />
        <Monitor url={'https://dcl-lists.decentraland.org/status'} name={'Decentraland Lists'} />    
        <Monitor url={'https://asset-bundle-converter.decentraland.org/health/live'} name={'Asset Bundle Converter WebGL'} />
        <Monitor url={'https://asset-bundle-converter-windows.decentraland.org/health/live'} name={'Asset Bundle Converter Windows'} />
        <Monitor url={'https://asset-bundle-converter-mac.decentraland.org/health/live'} name={'Asset Bundle Converter OS X'} />
        <Monitor url={'https://badges.decentraland.org/status'} name={'Badges Server'} /> { /* Missing Badges Processor */}
        <Monitor url={'https://exploration-games.decentraland.org/api/status'} name={'Exploration Games Server'} />
        <Monitor url={'https://auth-api.decentraland.org/health/ready'} name={'Auth Server'} />
        <Monitor url={'https://camera-reel-service.decentraland.org/health/live'} name={'Camera Reel Service'} />
        <Monitor url={'https://events-notifier.decentraland.org/health/live'} name={'Events Notifier'} />
        <Monitor url={'https://worlds-content-server.decentraland.org/health/live'} name={'Worlds Content Server'} />
        <Monitor url={'https://social-service-ea.decentraland.org/health/live'} name={'Social Service EA'} />
        <Monitor url={'https://decentraland.org'} name={'Decentraland Domain'} />
      </ul>
    </Container>
  );
};

export default Healthchecks;
