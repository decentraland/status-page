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
        <Monitor url={'https://nft-api.decentraland.org/health/ready'} name={'market.decentraland.org'} />
        <Monitor url={'https://builder-api.decentraland.org/v1/info'} name={'builder.decentraland.org'} />
        <Monitor url={'https://synapse.decentraland.org/_matrix/client/versions'} name={'synapse.decentraland.org'} />
      </ul>
    </Container>
  );
};

export default Healthchecks;
