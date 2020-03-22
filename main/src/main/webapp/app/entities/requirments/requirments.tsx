import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './requirments.reducer';
import { IRequirments } from 'app/shared/model/requirments.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRequirmentsProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Requirments = (props: IRequirmentsProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { requirmentsList, match, loading } = props;
  return (
    <div>
      <h2 id="requirments-heading">
        Requirments
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Requirments
        </Link>
      </h2>
      <div className="table-responsive">
        {requirmentsList && requirmentsList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Temp Low</th>
                <th>Temp High</th>
                <th>Humidity Low</th>
                <th>Humidity High</th>
                <th>Light Low</th>
                <th>Light High</th>
                <th>Moisture Low</th>
                <th>Moisture High</th>
                <th>Plant</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {requirmentsList.map((requirments, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${requirments.id}`} color="link" size="sm">
                      {requirments.id}
                    </Button>
                  </td>
                  <td>{requirments.tempLow}</td>
                  <td>{requirments.tempHigh}</td>
                  <td>{requirments.humidityLow}</td>
                  <td>{requirments.humidityHigh}</td>
                  <td>{requirments.lightLow}</td>
                  <td>{requirments.lightHigh}</td>
                  <td>{requirments.moistureLow}</td>
                  <td>{requirments.moistureHigh}</td>
                  <td>{requirments.plant ? <Link to={`plant/${requirments.plant.id}`}>{requirments.plant.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${requirments.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${requirments.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${requirments.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Requirments found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ requirments }: IRootState) => ({
  requirmentsList: requirments.entities,
  loading: requirments.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Requirments);
