import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Requirments from './requirments';
import RequirmentsDetail from './requirments-detail';
import RequirmentsUpdate from './requirments-update';
import RequirmentsDeleteDialog from './requirments-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={RequirmentsDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={RequirmentsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={RequirmentsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={RequirmentsDetail} />
      <ErrorBoundaryRoute path={match.url} component={Requirments} />
    </Switch>
  </>
);

export default Routes;
