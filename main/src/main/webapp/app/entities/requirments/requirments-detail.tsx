import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './requirments.reducer';
import { IRequirments } from 'app/shared/model/requirments.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRequirmentsDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const RequirmentsDetail = (props: IRequirmentsDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { requirmentsEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Requirments [<b>{requirmentsEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="tempLow">Temp Low</span>
          </dt>
          <dd>{requirmentsEntity.tempLow}</dd>
          <dt>
            <span id="tempHigh">Temp High</span>
          </dt>
          <dd>{requirmentsEntity.tempHigh}</dd>
          <dt>
            <span id="humidityLow">Humidity Low</span>
          </dt>
          <dd>{requirmentsEntity.humidityLow}</dd>
          <dt>
            <span id="humidityHigh">Humidity High</span>
          </dt>
          <dd>{requirmentsEntity.humidityHigh}</dd>
          <dt>
            <span id="lightLow">Light Low</span>
          </dt>
          <dd>{requirmentsEntity.lightLow}</dd>
          <dt>
            <span id="lightHigh">Light High</span>
          </dt>
          <dd>{requirmentsEntity.lightHigh}</dd>
          <dt>
            <span id="moistureLow">Moisture Low</span>
          </dt>
          <dd>{requirmentsEntity.moistureLow}</dd>
          <dt>
            <span id="moistureHigh">Moisture High</span>
          </dt>
          <dd>{requirmentsEntity.moistureHigh}</dd>
          <dt>Plant</dt>
          <dd>{requirmentsEntity.plant ? requirmentsEntity.plant.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/requirments" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/requirments/${requirmentsEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ requirments }: IRootState) => ({
  requirmentsEntity: requirments.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RequirmentsDetail);
