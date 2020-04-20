import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table, Alert, Container } from 'reactstrap';
import { ICrudGetAllAction, TextFormat, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities, getUnassignedCases } from './dashboard.reducer';
import { IDashboard } from 'app/shared/model/dashboard.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT, AUTHORITIES } from 'app/config/constants';
import { hasAnyAuthority } from 'app/shared/auth/private-route';

export interface IDashboardProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}
export interface IPlantCaseProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Dashboard = (props: IDashboardProps) => {
  useEffect(() => {
    props.getUnassignedCases(props.account);
  }, []);

  

  const { dashboardList, match, loading, loadingPlantCase, isAdmin, account, unassignedCases } = props;
  return (
    <div>
      <h2 id="dashboard-heading">
        Dashboard 
      </h2>
      { isAdmin ? (
         <div> 
           <p> Admin Dashboard</p>
           <Alert color="success">Welcome {account.login}.</Alert> 
           <div>

           <Container>
              <Row>
                <h2> New cases</h2>
              </Row>
              <Row>
                <Col>
                   {(unassignedCases.length > 0)? ( 
                      <Alert color="danger">Action Needed: There are {unassignedCases.length} new cases that need your attention.</Alert>
                    ):(
                       <Alert color="success">There are no unassigned cases.</Alert>
                     )}
                </Col>
                </Row>
                <Row>
                  <Col>
                

          
           {unassignedCases && unassignedCases.length > 0 ? (
          
           
           <Table responsive striped>
           
            <thead>
              <tr>
                <th className="hand" >
                  Needs Attention 
                </th>
                <th className="hand" >
                  Time Opened 
                </th>
                <th className="hand" >
                  Status 
                </th>
                <th>
                  Plant 
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
            
              { unassignedCases.map((plantCase, i) => (
                <tr key={`entity-${i}`}>
                  
                  <td>{plantCase.needsAttention}</td>
                  <td>
                    <TextFormat type="date" value={plantCase.timeOpened} format={APP_DATE_FORMAT} />
                  </td>
                 
                  <td>{plantCase.status}</td>
                  <td>{plantCase.plant ? <Link to={`plant/${plantCase.plant.id}`}>{plantCase.plant.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`plant-case/${plantCase.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`plant-case/${plantCase.id}`}
                        color="primary"
                        size="sm"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`plant-case/${plantCase.id}/delete`}
                        color="danger"
                        size="sm"
                      >
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>

          </Table>
          ): (
            !loadingPlantCase && <div className="alert alert-warning">No Plant Cases found</div>
          )}
          
          </Col>
                </Row>
            </Container>
               </div>
         </div>):(<div>Not Admin</div>)}


    
    </div>
  );
};

const mapStateToProps = ({ dashboard, authentication }: IRootState) => ({
  dashboardList: dashboard.entities,
  loading: dashboard.loading,
  isAdmin: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.ADMIN]),
  account: authentication.account,
  unassignedCases: dashboard.unassignedCases,
  loadingPlantCase: dashboard.loading
});

const mapDispatchToProps = {
  getEntities, 
  getUnassignedCases
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
