import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './plant-case.reducer';
import { IPlantCase } from 'app/shared/model/plant-case.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPlantCaseDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PlantCaseDetail = (props: IPlantCaseDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { plantCaseEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          PlantCase [<b>{plantCaseEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="needsAttention">Needs Attention</span>
          </dt>
          <dd>{plantCaseEntity.needsAttention}</dd>
          <dt>
            <span id="timeOpened">Time Opened</span>
          </dt>
          <dd>
            <TextFormat value={plantCaseEntity.timeOpened} type="date" format={APP_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="timeClosed">Time Closed</span>
          </dt>
          <dd>
            <TextFormat value={plantCaseEntity.timeClosed} type="date" format={APP_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="status">Status</span>
          </dt>
          <dd>{plantCaseEntity.status}</dd>
          <dt>
            <span id="caseNotes">Case Notes</span>
          </dt>
          <dd>{plantCaseEntity.caseNotes}</dd>
          <dt>User</dt>
          <dd>{plantCaseEntity.user ? plantCaseEntity.user.login : ''}</dd>
          <dt>Plant</dt>
          <dd>{plantCaseEntity.plant ? plantCaseEntity.plant.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/plant-case" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/plant-case/${plantCaseEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
      <Col>
        <div> 
          {plantCaseEntity.plant ? (plantCaseEntity.plant.customer ? (
         
          <div>
             <h2>
              Plant Location
            </h2>
            <dl className="jh-entity-details">
              <dt>
                <span id="address">Address: <span className="customerResult">{plantCaseEntity.plant.customer.address}</span></span>
              </dt>
              <dt>
                <span id="postcode">Postcode: <span className="customerResult">{plantCaseEntity.plant.customer.postcode}</span></span>
              </dt>
              <dt>
                <span id="city">City: <span className="customerResult">{plantCaseEntity.plant.customer.city}</span></span>
              </dt>
              <dt>
                <span id="state">State: <span className="customerResult">{plantCaseEntity.plant.customer.state}</span></span>
              </dt>
              <dt>
                <span id="phoneNo">Phone No: <span className="customerResult">{plantCaseEntity.plant.customer.phoneNo}</span></span>
              </dt>
              
            </dl>

          </div>

        ):(<div> No Customer Refrence Found </div>)) : (<div> No Plant Refrence Found </div>)}
        </div>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ plantCase }: IRootState) => ({
  plantCaseEntity: plantCase.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PlantCaseDetail);
