import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import DataReading from './data-reading';
import DataReadingDetail from './data-reading-detail';
import DataReadingUpdate from './data-reading-update';
import DataReadingDeleteDialog from './data-reading-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={DataReadingDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={DataReadingUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={DataReadingUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={DataReadingDetail} />
      <ErrorBoundaryRoute path={match.url} component={DataReading} />
    </Switch>
  </>
);

export default Routes;
