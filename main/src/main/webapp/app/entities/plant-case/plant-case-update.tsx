import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { IPlant } from 'app/shared/model/plant.model';
import { getEntities as getPlants } from 'app/entities/plant/plant.reducer';
import { getEntity, updateEntity, createEntity, reset } from './plant-case.reducer';
import { IPlantCase } from 'app/shared/model/plant-case.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPlantCaseUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PlantCaseUpdate = (props: IPlantCaseUpdateProps) => {
  const [userId, setUserId] = useState('0');
  const [plantId, setPlantId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { plantCaseEntity, users, plants, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/plant-case' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getUsers();
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
      entity.user = users[values.user];

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
                <Label id="needsAttentionLabel" for="plant-case-needsAttention">
                  Needs Attention
                </Label>
                <AvInput
                  id="plant-case-needsAttention"
                  type="select"
                  className="form-control"
                  name="needsAttention"
                  value={(!isNew && plantCaseEntity.needsAttention) || 'TEMP_LOW'}
                >
                  <option value="TEMP_LOW">TEMP_LOW</option>
                  <option value="TEMP_HIGH">TEMP_HIGH</option>
                  <option value="HUMIDITY_LOW">HUMIDITY_LOW</option>
                  <option value="HUMIDITY_HIGH">HUMIDITY_HIGH</option>
                  <option value="LIGHT_LOW">LIGHT_LOW</option>
                  <option value="LIGHT_HIGH">LIGHT_HIGH</option>
                  <option value="MOISTURE_LOW">MOISTURE_LOW</option>
                  <option value="MOISTURE_HIGH">MOISTURE_HIGH</option>
                  <option value="NO_DATA">NO_DATA</option>
                </AvInput>
              </AvGroup>
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
                <AvInput
                  id="plant-case-status"
                  type="select"
                  className="form-control"
                  name="status"
                  value={(!isNew && plantCaseEntity.status) || 'OPEN'}
                >
                  <option value="OPEN">OPEN</option>
                  <option value="ASSIGNED">ASSIGNED</option>
                  <option value="CLOSED">CLOSED</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="caseNotesLabel" for="plant-case-caseNotes">
                  Case Notes
                </Label>
                <AvField id="plant-case-caseNotes" type="text" name="caseNotes" />
              </AvGroup>
              <AvGroup>
                <Label for="plant-case-user">User</Label>
                <AvInput id="plant-case-user" type="select" className="form-control" name="user">
                  <option value="" key="0" />
                  {users
                    ? users.map((otherEntity, index) => (
                        <option value={index} key={otherEntity.id}>
                          {otherEntity.login}
                        </option>
                      ))
                    : null}
                </AvInput>
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
  users: storeState.userManagement.users,
  plants: storeState.plant.entities,
  plantCaseEntity: storeState.plantCase.entity,
  loading: storeState.plantCase.loading,
  updating: storeState.plantCase.updating,
  updateSuccess: storeState.plantCase.updateSuccess
});

const mapDispatchToProps = {
  getUsers,
  getPlants,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PlantCaseUpdate);
