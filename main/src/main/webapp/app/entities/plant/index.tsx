import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Plant from './plant';
import PlantDetail from './plant-detail';
import PlantUpdate from './plant-update';
import PlantDeleteDialog from './plant-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={PlantDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PlantUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PlantUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PlantDetail} />
      <ErrorBoundaryRoute path={match.url} component={Plant} />
    </Switch>
  </>
);

export default Routes;
