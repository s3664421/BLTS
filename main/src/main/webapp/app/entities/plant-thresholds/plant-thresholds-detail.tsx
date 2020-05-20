import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './plant-thresholds.reducer';
import { IPlantThresholds } from 'app/shared/model/plant-thresholds.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPlantThresholdsDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PlantThresholdsDetail = (props: IPlantThresholdsDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { plantThresholdsEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          PlantThresholds [<b>{plantThresholdsEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="tempLow">Temp Low</span>
          </dt>
          <dd>{plantThresholdsEntity.tempLow}</dd>
          <dt>
            <span id="tempHigh">Temp High</span>
          </dt>
          <dd>{plantThresholdsEntity.tempHigh}</dd>
          <dt>
            <span id="humidityLow">Humidity Low</span>
          </dt>
          <dd>{plantThresholdsEntity.humidityLow}</dd>
          <dt>
            <span id="humidityHigh">Humidity High</span>
          </dt>
          <dd>{plantThresholdsEntity.humidityHigh}</dd>
          <dt>
            <span id="lightLow">Light Low</span>
          </dt>
          <dd>{plantThresholdsEntity.lightLow}</dd>
          <dt>
            <span id="lightHigh">Light High</span>
          </dt>
          <dd>{plantThresholdsEntity.lightHigh}</dd>
          <dt>
            <span id="moistureLow">Moisture Low</span>
          </dt>
          <dd>{plantThresholdsEntity.moistureLow}</dd>
          <dt>
            <span id="moistureHigh">Moisture High</span>
          </dt>
          <dd>{plantThresholdsEntity.moistureHigh}</dd>
        </dl>
        <Button onClick={props.history.goBack} replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/plant-thresholds/${plantThresholdsEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ plantThresholds }: IRootState) => ({
  plantThresholdsEntity: plantThresholds.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PlantThresholdsDetail);
