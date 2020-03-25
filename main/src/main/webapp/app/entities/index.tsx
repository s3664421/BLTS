import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Plant from './plant';
import PlantThresholds from './plant-thresholds';
import DataReading from './data-reading';
import PlantCase from './plant-case';
import Customer from './customer';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}plant`} component={Plant} />
      <ErrorBoundaryRoute path={`${match.url}plant-thresholds`} component={PlantThresholds} />
      <ErrorBoundaryRoute path={`${match.url}data-reading`} component={DataReading} />
      <ErrorBoundaryRoute path={`${match.url}plant-case`} component={PlantCase} />
      <ErrorBoundaryRoute path={`${match.url}customer`} component={Customer} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
