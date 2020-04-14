/* eslint no-console: off */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, getAllDataReading } from './plant.reducer';

import { IPlant } from 'app/shared/model/plant.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

import { LineGraph } from 'app/shared/graphing/line-graph-gradient';

export interface IPlantDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}
export interface IDataReadingDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PlantDetail = (props: IPlantDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
    props.getAllDataReading(props.match.params.id);
  }, []);

  const { plantEntity, dataReadings, loading } = props;
  const temps = [];
  const humids = [];
  const lights = [];
  const moist = [];

  //Map data reading values into individual arrays
  //of timestamps and values
  dataReadings.map((dataReading, i) => {
    temps.push(
      {"time": dataReading.time, 
      "value": dataReading.temp}
    );
    humids.push(
      {"time": dataReading.time, 
      "value": dataReading.humidity}
    );
    lights.push(
      {"time": dataReading.time, 
      "value": dataReading.light}
    );
    moist.push(
      {"time": dataReading.time, 
      "value": dataReading.moisture}
    );     
  });

  return (
    <Row>
      <Col md="3">
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
      <Col md="9">
      {dataReadings && dataReadings.length > 0 ? (
        <div>
          <Row>
            <Col md="6">
              <LineGraph data={temps} labels={["Temperature", "Time"]} size={[450, 250]} margin={[50, 10, 10, 25]}/>
            </Col>
            <Col md="6">
              <LineGraph data={humids} labels={["Humidity", "Time"]} size={[450, 250]} margin={[50, 10, 10, 25]}/>
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <LineGraph data={lights} labels={["Light", "Time"]} size={[450, 250]} margin={[60, 10, 10, 25]}/>
            </Col>
            <Col md="6">
              <LineGraph data={moist} labels={["Moisture", "Time"]} size={[450, 250]} margin={[50, 10, 10, 25]}/>
            </Col>
          </Row>
        </div>
      ) : (
        !loading && <div className="alert alert-warning">No Data Readings found</div>
      )}
      </Col>
    </Row>
  );
};




const mapStateToProps = ({ plant }: IRootState) => ({
  plantEntity: plant.entity,
  dataReadings: plant.dataReadings,
  loading: plant.loading
});

const mapDispatchToProps = { getEntity, getAllDataReading };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PlantDetail);
