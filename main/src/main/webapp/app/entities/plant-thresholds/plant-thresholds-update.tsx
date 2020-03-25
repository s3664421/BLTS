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
import { getEntity, updateEntity, createEntity, reset } from './plant-thresholds.reducer';
import { IPlantThresholds } from 'app/shared/model/plant-thresholds.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPlantThresholdsUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PlantThresholdsUpdate = (props: IPlantThresholdsUpdateProps) => {
  const [plantId, setPlantId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { plantThresholdsEntity, plants, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/plant-thresholds');
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
    if (errors.length === 0) {
      const entity = {
        ...plantThresholdsEntity,
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
          <h2 id="mainApp.plantThresholds.home.createOrEditLabel">Create or edit a PlantThresholds</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : plantThresholdsEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="plant-thresholds-id">ID</Label>
                  <AvInput id="plant-thresholds-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="tempLowLabel" for="plant-thresholds-tempLow">
                  Temp Low
                </Label>
                <AvField
                  id="plant-thresholds-tempLow"
                  type="string"
                  className="form-control"
                  name="tempLow"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                    number: { value: true, errorMessage: 'This field should be a number.' }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="tempHighLabel" for="plant-thresholds-tempHigh">
                  Temp High
                </Label>
                <AvField
                  id="plant-thresholds-tempHigh"
                  type="string"
                  className="form-control"
                  name="tempHigh"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                    number: { value: true, errorMessage: 'This field should be a number.' }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="humidityLowLabel" for="plant-thresholds-humidityLow">
                  Humidity Low
                </Label>
                <AvField
                  id="plant-thresholds-humidityLow"
                  type="string"
                  className="form-control"
                  name="humidityLow"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                    number: { value: true, errorMessage: 'This field should be a number.' }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="humidityHighLabel" for="plant-thresholds-humidityHigh">
                  Humidity High
                </Label>
                <AvField
                  id="plant-thresholds-humidityHigh"
                  type="string"
                  className="form-control"
                  name="humidityHigh"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                    number: { value: true, errorMessage: 'This field should be a number.' }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="lightLowLabel" for="plant-thresholds-lightLow">
                  Light Low
                </Label>
                <AvField
                  id="plant-thresholds-lightLow"
                  type="string"
                  className="form-control"
                  name="lightLow"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                    number: { value: true, errorMessage: 'This field should be a number.' }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="lightHighLabel" for="plant-thresholds-lightHigh">
                  Light High
                </Label>
                <AvField
                  id="plant-thresholds-lightHigh"
                  type="string"
                  className="form-control"
                  name="lightHigh"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                    number: { value: true, errorMessage: 'This field should be a number.' }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="moistureLowLabel" for="plant-thresholds-moistureLow">
                  Moisture Low
                </Label>
                <AvField
                  id="plant-thresholds-moistureLow"
                  type="string"
                  className="form-control"
                  name="moistureLow"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                    number: { value: true, errorMessage: 'This field should be a number.' }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="moistureHighLabel" for="plant-thresholds-moistureHigh">
                  Moisture High
                </Label>
                <AvField
                  id="plant-thresholds-moistureHigh"
                  type="string"
                  className="form-control"
                  name="moistureHigh"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                    number: { value: true, errorMessage: 'This field should be a number.' }
                  }}
                />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/plant-thresholds" replace color="info">
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
  plantThresholdsEntity: storeState.plantThresholds.entity,
  loading: storeState.plantThresholds.loading,
  updating: storeState.plantThresholds.updating,
  updateSuccess: storeState.plantThresholds.updateSuccess
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

export default connect(mapStateToProps, mapDispatchToProps)(PlantThresholdsUpdate);
