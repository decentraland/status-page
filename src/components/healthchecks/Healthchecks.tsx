import { Container } from 'decentraland-ui';
import { FC } from 'react';
import { baseDomain } from '../../config/environment';
import Title from '../Title';
import { CatalystNetworks } from './CatalystNetworks';
import Monitor from './Monitor';

const Healthchecks: FC = () => {
  return (
    <Container>
      <Title title='System Status' />
      <ul className="list-group system-status">
        <CatalystNetworks />                
        <Monitor url={`https://comms-gatekeeper.${baseDomain}/status`} name={'Communications Gate Keeper'} />
        <Monitor url={`https://notifications.${baseDomain}/status`} name={'Notifications System'} />
        <Monitor url={`https://marketplace-api.${baseDomain}/health/ready`} name={'Marketplace'} />
        <Monitor url={`https://builder-api.${baseDomain}/v1/info`} name={'Builder'} />
        <Monitor url={`https://api.${baseDomain}/v1/map.png`} name={'Atlas Server'} />
        <Monitor url={`https://places.${baseDomain}/api/status`} name={'Places'} />
        <Monitor url={`https://events.${baseDomain}/api/status`} name={'Events'} />
        <Monitor url={`https://rewards.${baseDomain}/api/status`} name={'Rewards'} />
        <Monitor url={`https://dcl-lists.${baseDomain}/status`} name={'Decentraland Lists'} />    
        <Monitor url={`https://asset-bundle-registry.${baseDomain}/health/live`} name={'Asset Bundle Registry'} />
        <Monitor url={`https://asset-bundle-converter.${baseDomain}/health/live`} name={'Asset Bundle Converter WebGL'} />
        <Monitor url={`https://asset-bundle-converter-windows.${baseDomain}/health/live`} name={'Asset Bundle Converter Windows'} />
        <Monitor url={`https://asset-bundle-converter-mac.${baseDomain}/health/live`} name={'Asset Bundle Converter OS X'} />
        <Monitor url={`https://badges.${baseDomain}/status`} name={'Badges Server'} /> { /* Missing Badges Processor */}
        <Monitor url={`https://exploration-games.${baseDomain}/api/status`} name={'Exploration Games Server'} />
        <Monitor url={`https://auth-api.${baseDomain}/health/ready`} name={'Auth Server'} />
        <Monitor url={`https://camera-reel-service.${baseDomain}/health/live`} name={'Camera Reel Service'} />
        <Monitor url={`https://events-notifier.${baseDomain}/health/live`} name={'Events Notifier'} />
        <Monitor url={`https://worlds-content-server.${baseDomain}/health/live`} name={'Worlds Content Server'} />
        <Monitor url={`https://social-service-ea.${baseDomain}/health/live`} name={'Social Service EA'} />
        <Monitor url={`https://${baseDomain}`} name={'Decentraland Domain'} />
      </ul>
    </Container>
  );
};

export default Healthchecks;
