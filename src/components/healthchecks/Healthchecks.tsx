import { FC } from 'react';
import Title from '../Title';
import { CatalystNetworks } from './CatalystNetworks';
import { HealthInfo } from './HealthInfo';

const Healthchecks: FC = () => {
  return (
    <>
      <Title title='System Status' />
      <ul className="list-group system-status">
        <CatalystNetworks />
        <li className="list-group-item health-row">builder.decentraland.org <HealthInfo status='operational'/></li>
        <li className="list-group-item health-row">market.decentraland.org <HealthInfo status='operational'/></li>
        <li className="list-group-item health-row">synapse.decentraland.org <HealthInfo status='operational'/></li>
      </ul>
    </>
  );
};

export default Healthchecks;
