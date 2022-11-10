import { FC } from 'react';
import Title from '../Title';
import { CatalystNetworks } from './CatalystNetworks';
import { HealthInfo } from './HealthInfo';

const Healthchecks: FC = () => {
  return (
    <>
      <Title title='System Status' />
      <ul className="list-group system-status">
        <li className="list-group-item health-row"><CatalystNetworks /></li>
        <li className="list-group-item health-row">builder.decentraland.org <HealthInfo healthy={true}/></li>
        <li className="list-group-item health-row">market.decentraland.org <HealthInfo healthy={true}/></li>
        <li className="list-group-item health-row">synapse.decentraland.org <HealthInfo healthy={true}/></li>
      </ul>
    </>
  );
};

export default Healthchecks;
