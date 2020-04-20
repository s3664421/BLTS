import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table, Alert } from 'reactstrap';
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './dashboard.reducer';
import { IDashboard } from 'app/shared/model/dashboard.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT, AUTHORITIES } from 'app/config/constants';
import { hasAnyAuthority } from 'app/shared/auth/private-route';

export interface IDashboardProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Dashboard = (props: IDashboardProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { dashboardList, match, loading, isAdmin, account } = props;
  return (
    <div>
      <h2 id="dashboard-heading">
        Dashboard 
      </h2>
      { isAdmin ? (
         <div> 
           <p> Admin Dashboard</p>
           <Alert color="success">Welcome {account.login}.</Alert> 
            
















         </div>):(<div>Not Admin</div>)}


    
    </div>
  );
};

const mapStateToProps = ({ dashboard, authentication }: IRootState) => ({
  dashboardList: dashboard.entities,
  loading: dashboard.loading,
  isAdmin: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.ADMIN]),
  account: authentication.account
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
