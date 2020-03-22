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
import { getEntity, updateEntity, createEntity, reset } from './requirments.reducer';
import { IRequirments } from 'app/shared/model/requirments.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IRequirmentsUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const RequirmentsUpdate = (props: IRequirmentsUpdateProps) => {
  const [plantId, setPlantId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { requirmentsEntity, plants, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/requirments');
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
        ...requirmentsEntity,
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
          <h2 id="mainApp.requirments.home.createOrEditLabel">Create or edit a Requirments</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : requirmentsEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="requirments-id">ID</Label>
                  <AvInput id="requirments-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="tempLowLabel" for="requirments-tempLow">
                  Temp Low
                </Label>
                <AvField id="requirments-tempLow" type="string" className="form-control" name="tempLow" />
              </AvGroup>
              <AvGroup>
                <Label id="tempHighLabel" for="requirments-tempHigh">
                  Temp High
                </Label>
                <AvField id="requirments-tempHigh" type="string" className="form-control" name="tempHigh" />
              </AvGroup>
              <AvGroup>
                <Label id="humidityLowLabel" for="requirments-humidityLow">
                  Humidity Low
                </Label>
                <AvField id="requirments-humidityLow" type="string" className="form-control" name="humidityLow" />
              </AvGroup>
              <AvGroup>
                <Label id="humidityHighLabel" for="requirments-humidityHigh">
                  Humidity High
                </Label>
                <AvField id="requirments-humidityHigh" type="string" className="form-control" name="humidityHigh" />
              </AvGroup>
              <AvGroup>
                <Label id="lightLowLabel" for="requirments-lightLow">
                  Light Low
                </Label>
                <AvField id="requirments-lightLow" type="string" className="form-control" name="lightLow" />
              </AvGroup>
              <AvGroup>
                <Label id="lightHighLabel" for="requirments-lightHigh">
                  Light High
                </Label>
                <AvField id="requirments-lightHigh" type="string" className="form-control" name="lightHigh" />
              </AvGroup>
              <AvGroup>
                <Label id="moistureLowLabel" for="requirments-moistureLow">
                  Moisture Low
                </Label>
                <AvField id="requirments-moistureLow" type="string" className="form-control" name="moistureLow" />
              </AvGroup>
              <AvGroup>
                <Label id="moistureHighLabel" for="requirments-moistureHigh">
                  Moisture High
                </Label>
                <AvField id="requirments-moistureHigh" type="string" className="form-control" name="moistureHigh" />
              </AvGroup>
              <AvGroup>
                <Label for="requirments-plant">Plant</Label>
                <AvInput id="requirments-plant" type="select" className="form-control" name="plant.id">
                  <option value="" key="0" />
                  {plants
                    ? plants.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/requirments" replace color="info">
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
  requirmentsEntity: storeState.requirments.entity,
  loading: storeState.requirments.loading,
  updating: storeState.requirments.updating,
  updateSuccess: storeState.requirments.updateSuccess
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

export default connect(mapStateToProps, mapDispatchToProps)(RequirmentsUpdate);
