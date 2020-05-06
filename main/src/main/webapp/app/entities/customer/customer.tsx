// import './customer.scss';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table,  Container, Jumbotron, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './customer.reducer';
import { ICustomer } from 'app/shared/model/customer.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { Customers } from 'app/shared/layout/header/header-components';

export interface ICustomerProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Customer = (props: ICustomerProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);


  const [searchVal, setSearchVal] = useState("");
  const updateSearchVal = (event) => setSearchVal(event.target.value);

  const searchByValue =(arrayTosearch, string) =>
  {
     //return array.filter(o => { return Object.keys(o).some(k => { if(typeof o[k] === 'string') return o[k].toLowerCase().includes(string.toLowerCase()); }); });
     return arrayTosearch.filter((data) =>  JSON.stringify(data).toLowerCase().includes(string.toLowerCase())); 
     
  }


  const { customerList, match, loading } = props;
  return (
    <div>
      <Container> 
      <Jumbotron>
               <h2>Customers</h2>
               <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                  <FontAwesomeIcon icon="plus" />
                  &nbsp; Create new Customer
                </Link>
      </Jumbotron>
      
     
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>Search Customers</InputGroupText>
        </InputGroupAddon>
        <Input value = {searchVal} onChange = {updateSearchVal} />
      </InputGroup>
      <div className="table-responsive">
        {customerList && customerList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Address</th>
                <th>Postcode</th>
                <th>City</th>
                <th>State</th>
                <th>Phone No</th>
                
                <th />
              </tr>
            </thead>
            <tbody>
              {(searchByValue(customerList,searchVal)).map((customer, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${customer.id}`} color="link" size="sm">
                      {customer.id}
                    </Button>
                  </td>
                  <td>{customer.user ? customer.user.firstName : ''}</td>
                  <td>{customer.address}</td>
                  <td>{customer.postcode}</td>
                  <td>{customer.city}</td>
                  <td>{customer.state}</td>
                  <td>{customer.phoneNo}</td>
                  
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${customer.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${customer.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${customer.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Customers found</div>
        )}
      </div>
      </Container>
    </div>
  );
};

const mapStateToProps = ({ customer }: IRootState) => ({
  customerList: customer.entities,
  loading: customer.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Customer);
