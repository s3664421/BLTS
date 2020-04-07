import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Table } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, getAllDataReading } from './plant.reducer';

import { IPlant } from 'app/shared/model/plant.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPlantDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}
export interface IDataReadingDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PlantDetail = (props: IPlantDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
    props.getAllDataReading(props.match.params.id);
  }, []);

  const { plantEntity, dataReadings } = props;
  return (
    <Row>
      <Col md="6">
        <h2>
          Plant [<b>{plantEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">Name</span>
          </dt>
          <dd>{plantEntity.name}</dd>
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{plantEntity.description}</dd>
          <dt>
            <span id="location">Location</span>
          </dt>
          <dd>{plantEntity.location}</dd>
          <dt>
            <span id="sensorID">Sensor ID</span>
          </dt>
          <dd>{plantEntity.sensorID}</dd>
          <dt>Plantthresholds</dt>
          <dd>{plantEntity.plantthresholds ? plantEntity.plantthresholds.id : ''}</dd>
          <dt>Customer</dt>
          <dd>{plantEntity.customer ? plantEntity.customer.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/plant" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/plant/${plantEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
      <Col md="6">
        <h4>
          {plantEntity.name} Data Readings
        </h4>\
        {dataReadings && dataReadings.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>Time</th>
                <th>Temp</th>
                <th>Humidity</th>
                <th>Light</th>
                <th>Moisture</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {dataReadings.map((dataReading, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <TextFormat type="date" value={dataReading.time} format={APP_DATE_FORMAT} />
                  </td>
                  <td>{dataReading.temp}</td>
                  <td>{dataReading.humidity}</td>
                  <td>{dataReading.light}</td>
                  <td>{dataReading.moisture}</td>
                </tr>
              ))}
            </tbody>
          </Table>) : (
          <div className="alert alert-warning">No Data Readings found</div>
        )}
      </Col>
    </Row>
  );
};




const mapStateToProps = ({ plant }: IRootState) => ({
  plantEntity: plant.entity,
  dataReadings: plant.dataReadings
});

const mapDispatchToProps = { getEntity, getAllDataReading };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PlantDetail);
