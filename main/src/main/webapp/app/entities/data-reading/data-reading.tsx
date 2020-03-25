import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './data-reading.reducer';
import { IDataReading } from 'app/shared/model/data-reading.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDataReadingProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const DataReading = (props: IDataReadingProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { dataReadingList, match, loading } = props;
  return (
    <div>
      <h2 id="data-reading-heading">
        Data Readings
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Data Reading
        </Link>
      </h2>
      <div className="table-responsive">
        {dataReadingList && dataReadingList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Time</th>
                <th>Temp</th>
                <th>Humidity</th>
                <th>Light</th>
                <th>Moisture</th>
                <th>Plant</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {dataReadingList.map((dataReading, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${dataReading.id}`} color="link" size="sm">
                      {dataReading.id}
                    </Button>
                  </td>
                  <td>
                    <TextFormat type="date" value={dataReading.time} format={APP_DATE_FORMAT} />
                  </td>
                  <td>{dataReading.temp}</td>
                  <td>{dataReading.humidity}</td>
                  <td>{dataReading.light}</td>
                  <td>{dataReading.moisture}</td>
                  <td>{dataReading.plant ? <Link to={`plant/${dataReading.plant.id}`}>{dataReading.plant.sensorID}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${dataReading.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${dataReading.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${dataReading.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Data Readings found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ dataReading }: IRootState) => ({
  dataReadingList: dataReading.entities,
  loading: dataReading.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DataReading);
