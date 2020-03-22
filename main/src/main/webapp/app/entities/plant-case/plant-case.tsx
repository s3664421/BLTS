import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './plant-case.reducer';
import { IPlantCase } from 'app/shared/model/plant-case.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPlantCaseProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const PlantCase = (props: IPlantCaseProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { plantCaseList, match, loading } = props;
  return (
    <div>
      <h2 id="plant-case-heading">
        Plant Cases
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Plant Case
        </Link>
      </h2>
      <div className="table-responsive">
        {plantCaseList && plantCaseList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Time Opened</th>
                <th>Time Closed</th>
                <th>Status</th>
                <th>Open</th>
                <th>Plant</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {plantCaseList.map((plantCase, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${plantCase.id}`} color="link" size="sm">
                      {plantCase.id}
                    </Button>
                  </td>
                  <td>
                    <TextFormat type="date" value={plantCase.timeOpened} format={APP_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={plantCase.timeClosed} format={APP_DATE_FORMAT} />
                  </td>
                  <td>{plantCase.status}</td>
                  <td>{plantCase.open ? 'true' : 'false'}</td>
                  <td>{plantCase.plant ? <Link to={`plant/${plantCase.plant.id}`}>{plantCase.plant.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${plantCase.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${plantCase.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${plantCase.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Plant Cases found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ plantCase }: IRootState) => ({
  plantCaseList: plantCase.entities,
  loading: plantCase.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PlantCase);
