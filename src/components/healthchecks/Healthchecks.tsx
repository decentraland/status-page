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
        <Monitor url={'https://nft-api.decentraland.org/health/ready'} name={'Marketplace'} />
        <Monitor url={'https://builder-api.decentraland.org/v1/info'} name={'Builder'} />
        <Monitor url={'https://synapse.decentraland.org/_matrix/client/versions'} name={'Chat'} />
        <Monitor url={'https://places.decentraland.org/api/status'} name={'Places'} />        
        <Monitor url={'https://events.decentraland.org/api/status'} name={'Events'} />        
      </ul>
    </Container>
  );
};

export default Healthchecks;
