import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IPlantThresholds } from 'app/shared/model/plant-thresholds.model';
import { getEntities as getPlantThresholds } from 'app/entities/plant-thresholds/plant-thresholds.reducer';
import { ICustomer } from 'app/shared/model/customer.model';
import { getEntities as getCustomers } from 'app/entities/customer/customer.reducer';
import { getEntity, updateEntity, createEntity, reset } from './plant.reducer';
import { IPlant } from 'app/shared/model/plant.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPlantUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PlantUpdate = (props: IPlantUpdateProps) => {
  const [plantthresholdsId, setPlantthresholdsId] = useState('0');
  const [customerId, setCustomerId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { plantEntity, plantThresholds, customers, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/plant' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getPlantThresholds();
    props.getCustomers();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...plantEntity,
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
          <h2 id="mainApp.plant.home.createOrEditLabel">Create or edit a Plant</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : plantEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="plant-id">ID</Label>
                  <AvInput id="plant-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="plant-name">
                  Name
                </Label>
                <AvField
                  id="plant-name"
                  type="text"
                  name="name"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="plant-description">
                  Description
                </Label>
                <AvField id="plant-description" type="text" name="description" />
              </AvGroup>
              <AvGroup>
                <Label id="locationLabel" for="plant-location">
                  Location
                </Label>
                <AvField
                  id="plant-location"
                  type="text"
                  name="location"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="sensorIDLabel" for="plant-sensorID">
                  Sensor ID
                </Label>
                <AvField
                  id="plant-sensorID"
                  type="text"
                  name="sensorID"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label for="plant-plantthresholds">Plantthresholds</Label>
                <AvInput id="plant-plantthresholds" type="select" className="form-control" name="plantthresholds.id">
                  <option value="" key="0" />
                  {plantThresholds
                    ? plantThresholds.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="plant-customer">Customer</Label>
                <AvInput id="plant-customer" type="select" className="form-control" name="customer.id">
                  <option value="" key="0" />
                  {customers
                    ? customers.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/plant" replace color="info">
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
  plantThresholds: storeState.plantThresholds.entities,
  customers: storeState.customer.entities,
  plantEntity: storeState.plant.entity,
  loading: storeState.plant.loading,
  updating: storeState.plant.updating,
  updateSuccess: storeState.plant.updateSuccess
});

const mapDispatchToProps = {
  getPlantThresholds,
  getCustomers,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PlantUpdate);
