import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './sensor.reducer';
import { ISensor } from 'app/shared/model/sensor.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISensorDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SensorDetail = (props: ISensorDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { sensorEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Sensor [<b>{sensorEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="sensorNo">Sensor No</span>
          </dt>
          <dd>{sensorEntity.sensorNo}</dd>
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{sensorEntity.description}</dd>
          <dt>User</dt>
          <dd>{sensorEntity.user ? sensorEntity.user.login : ''}</dd>
        </dl>
        <Button tag={Link} to="/sensor" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/sensor/${sensorEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ sensor }: IRootState) => ({
  sensorEntity: sensor.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SensorDetail);
