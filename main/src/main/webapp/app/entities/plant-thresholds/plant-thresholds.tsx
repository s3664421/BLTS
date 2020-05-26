import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table, Container,Jumbotron,  InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './plant-thresholds.reducer';
import { IPlantThresholds } from 'app/shared/model/plant-thresholds.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPlantThresholdsProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const PlantThresholds = (props: IPlantThresholdsProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const [searchVal, setSearchVal] = useState("");
  const updateSearchVal = (event) => setSearchVal(event.target.value);

  const searchByValue =(arrayTosearch, string) =>
  {
     // return array.filter(o => { return Object.keys(o).some(k => { if(typeof o[k] === 'string') return o[k].toLowerCase().includes(string.toLowerCase()); }); });
     return arrayTosearch.filter((data) =>  JSON.stringify(data).toLowerCase().includes(string.toLowerCase())); 
     
  }

  const { plantThresholdsList, match, loading } = props;
  return (
    <div>
      <Container>
      <Jumbotron>
        <h2>Plant Thresholds</h2>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Plant Thresholds
        </Link>
      </Jumbotron>
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>Search Plant Thresholds</InputGroupText>
        </InputGroupAddon>
        <Input value = {searchVal} onChange = {updateSearchVal} />
      </InputGroup>
      <div className="table-responsive">
        {plantThresholdsList && plantThresholdsList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Temp Low</th>
                <th>Temp High</th>
                <th>Humidity Low</th>
                <th>Humidity High</th>
                <th>Light Low</th>
                <th>Light High</th>
                <th>Moisture Low</th>
                <th>Moisture High</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {searchByValue(plantThresholdsList, searchVal).map((plantThresholds, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${plantThresholds.id}`} color="link" size="sm">
                      {plantThresholds.id}
                    </Button>
                  </td>
                  <td>{plantThresholds.tempLow}</td>
                  <td>{plantThresholds.tempHigh}</td>
                  <td>{plantThresholds.humidityLow}</td>
                  <td>{plantThresholds.humidityHigh}</td>
                  <td>{plantThresholds.lightLow}</td>
                  <td>{plantThresholds.lightHigh}</td>
                  <td>{plantThresholds.moistureLow}</td>
                  <td>{plantThresholds.moistureHigh}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${plantThresholds.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${plantThresholds.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${plantThresholds.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Plant Thresholds found</div>
        )}
      </div>
      </Container>
    </div>
  );
};

const mapStateToProps = ({ plantThresholds }: IRootState) => ({
  plantThresholdsList: plantThresholds.entities,
  loading: plantThresholds.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PlantThresholds);
