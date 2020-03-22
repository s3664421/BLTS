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
import { getEntity, updateEntity, createEntity, reset } from './plant-case.reducer';
import { IPlantCase } from 'app/shared/model/plant-case.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPlantCaseUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PlantCaseUpdate = (props: IPlantCaseUpdateProps) => {
  const [plantId, setPlantId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { plantCaseEntity, plants, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/plant-case');
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
    values.timeOpened = convertDateTimeToServer(values.timeOpened);
    values.timeClosed = convertDateTimeToServer(values.timeClosed);

    if (errors.length === 0) {
      const entity = {
        ...plantCaseEntity,
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
          <h2 id="mainApp.plantCase.home.createOrEditLabel">Create or edit a PlantCase</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : plantCaseEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="plant-case-id">ID</Label>
                  <AvInput id="plant-case-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="timeOpenedLabel" for="plant-case-timeOpened">
                  Time Opened
                </Label>
                <AvInput
                  id="plant-case-timeOpened"
                  type="datetime-local"
                  className="form-control"
                  name="timeOpened"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.plantCaseEntity.timeOpened)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="timeClosedLabel" for="plant-case-timeClosed">
                  Time Closed
                </Label>
                <AvInput
                  id="plant-case-timeClosed"
                  type="datetime-local"
                  className="form-control"
                  name="timeClosed"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.plantCaseEntity.timeClosed)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="statusLabel" for="plant-case-status">
                  Status
                </Label>
                <AvField id="plant-case-status" type="text" name="status" />
              </AvGroup>
              <AvGroup check>
                <Label id="openLabel">
                  <AvInput id="plant-case-open" type="checkbox" className="form-check-input" name="open" />
                  Open
                </Label>
              </AvGroup>
              <AvGroup>
                <Label for="plant-case-plant">Plant</Label>
                <AvInput id="plant-case-plant" type="select" className="form-control" name="plant.id">
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
              <Button tag={Link} id="cancel-save" to="/plant-case" replace color="info">
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
  plantCaseEntity: storeState.plantCase.entity,
  loading: storeState.plantCase.loading,
  updating: storeState.plantCase.updating,
  updateSuccess: storeState.plantCase.updateSuccess
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

export default connect(mapStateToProps, mapDispatchToProps)(PlantCaseUpdate);
