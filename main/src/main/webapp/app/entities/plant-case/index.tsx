import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PlantCase from './plant-case';
import PlantCaseDetail from './plant-case-detail';
import PlantCaseUpdate from './plant-case-update';
import PlantCaseDeleteDialog from './plant-case-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={PlantCaseDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PlantCaseUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PlantCaseUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PlantCaseDetail} />
      <ErrorBoundaryRoute path={match.url} component={PlantCase} />
    </Switch>
  </>
);

export default Routes;
