import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IPlant } from 'app/shared/model/plant.model';
import { getEntities as getPlants } from 'app/entities/plant/plant.reducer';
import { getEntity, updateEntity, createEntity, reset } from './data-reading.reducer';
import { IDataReading } from 'app/shared/model/data-reading.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IDataReadingUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const DataReadingUpdate = (props: IDataReadingUpdateProps) => {
  const [plantId, setPlantId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { dataReadingEntity, plants, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/data-reading');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getPlants();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.time = convertDateTimeToServer(values.time);

    if (errors.length === 0) {
      const entity = {
        ...dataReadingEntity,
        ...values
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="mainApp.dataReading.home.createOrEditLabel">Create or edit a DataReading</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : dataReadingEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="data-reading-id">ID</Label>
                  <AvInput id="data-reading-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="timeLabel" for="data-reading-time">
                  Time
                </Label>
                <AvInput
                  id="data-reading-time"
                  type="datetime-local"
                  className="form-control"
                  name="time"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.dataReadingEntity.time)}
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="tempLabel" for="data-reading-temp">
                  Temp
                </Label>
                <AvField
                  id="data-reading-temp"
                  type="string"
                  className="form-control"
                  name="temp"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                    number: { value: true, errorMessage: 'This field should be a number.' }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="humidityLabel" for="data-reading-humidity">
                  Humidity
                </Label>
                <AvField
                  id="data-reading-humidity"
                  type="string"
                  className="form-control"
                  name="humidity"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                    number: { value: true, errorMessage: 'This field should be a number.' }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="lightLabel" for="data-reading-light">
                  Light
                </Label>
                <AvField
                  id="data-reading-light"
                  type="string"
                  className="form-control"
                  name="light"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                    number: { value: true, errorMessage: 'This field should be a number.' }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="moistureLabel" for="data-reading-moisture">
                  Moisture
                </Label>
                <AvField
                  id="data-reading-moisture"
                  type="string"
                  className="form-control"
                  name="moisture"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                    number: { value: true, errorMessage: 'This field should be a number.' }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label for="data-reading-plant">Plant</Label>
                <AvInput id="data-reading-plant" type="select" className="form-control" name="plant.id">
                  <option value="" key="0" />
                  {plants
                    ? plants.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.sensorID}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/data-reading" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  plants: storeState.plant.entities,
  dataReadingEntity: storeState.dataReading.entity,
  loading: storeState.dataReading.loading,
  updating: storeState.dataReading.updating,
  updateSuccess: storeState.dataReading.updateSuccess
});

const mapDispatchToProps = {
  getPlants,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DataReadingUpdate);
