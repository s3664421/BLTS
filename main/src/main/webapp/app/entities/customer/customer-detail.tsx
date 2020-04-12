import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Table } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, getAllPlants } from './customer.reducer'; // Step 9: Import customer.reducer

import { ICustomer } from 'app/shared/model/customer.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
// import plant from '../plant/plant';

export interface ICustomerDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CustomerDetail = (props: ICustomerDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
    props.getAllPlants(props.match.params.id); // Step 12: Can now use function
  }, []);

  const { customerEntity, plant } = props;
  return (
    <Row>
      <Col md="6">
        <h2>
          Customer [<b>{customerEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="address">Address</span>
          </dt>
          <dd>{customerEntity.address}</dd>
          <dt>
            <span id="postcode">Postcode</span>
          </dt>
          <dd>{customerEntity.postcode}</dd>
          <dt>
            <span id="city">City</span>
          </dt>
          <dd>{customerEntity.city}</dd>
          <dt>
            <span id="state">State</span>
          </dt>
          <dd>{customerEntity.state}</dd>
          <dt>
            <span id="phoneNo">Phone No</span>
          </dt>
          <dd>{customerEntity.phoneNo}</dd>
          <dt>User</dt>
          <dd>{customerEntity.user ? customerEntity.user.login : ''}</dd>
        </dl>
        <Button tag={Link} to="/customer" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/customer/${customerEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
      <Col md="6">
        <h4>
          Customers Plant List
        </h4>
        {plant && plant.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>Plant Name</th>
                <th>Sensor ID</th>
                <th>Location</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {plant.map((plantReading, i) => (
                <tr key={`entity-${i}`}>
                  <td>{plantReading.name}</td>
                  <td>{plantReading.sensorID}</td>
                  <td>{plantReading.location}</td>
                </tr>
              ))}
            </tbody>
          </Table>) : (
          <div className="alert alert-warning">No Data Found</div>
        )}
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ customer }: IRootState) => ({
  customerEntity: customer.entity,
  plant: customer.plant // Step 10: add to 'mapStateToProps' to be able to use prop
});

const mapDispatchToProps = { getEntity, getAllPlants}; // Step 11: add function here

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDetail);
