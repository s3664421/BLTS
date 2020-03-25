import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PlantThresholds from './plant-thresholds';
import PlantThresholdsDetail from './plant-thresholds-detail';
import PlantThresholdsUpdate from './plant-thresholds-update';
import PlantThresholdsDeleteDialog from './plant-thresholds-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={PlantThresholdsDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PlantThresholdsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PlantThresholdsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PlantThresholdsDetail} />
      <ErrorBoundaryRoute path={match.url} component={PlantThresholds} />
    </Switch>
  </>
);

export default Routes;
