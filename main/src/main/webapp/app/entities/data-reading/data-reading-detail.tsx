import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './data-reading.reducer';
import { IDataReading } from 'app/shared/model/data-reading.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDataReadingDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const DataReadingDetail = (props: IDataReadingDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { dataReadingEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          DataReading [<b>{dataReadingEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="time">Time</span>
          </dt>
          <dd>
            <TextFormat value={dataReadingEntity.time} type="date" format={APP_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="temp">Temp</span>
          </dt>
          <dd>{dataReadingEntity.temp}</dd>
          <dt>
            <span id="humidity">Humidity</span>
          </dt>
          <dd>{dataReadingEntity.humidity}</dd>
          <dt>
            <span id="light">Light</span>
          </dt>
          <dd>{dataReadingEntity.light}</dd>
          <dt>
            <span id="moisture">Moisture</span>
          </dt>
          <dd>{dataReadingEntity.moisture}</dd>
          <dt>Plant</dt>
          <dd>{dataReadingEntity.plant ? dataReadingEntity.plant.sensorID : ''}</dd>
        </dl>
        <Button tag={Link} to="/data-reading" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/data-reading/${dataReadingEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ dataReading }: IRootState) => ({
  dataReadingEntity: dataReading.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DataReadingDetail);
