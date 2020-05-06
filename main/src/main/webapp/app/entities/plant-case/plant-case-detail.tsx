import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Container, Jumbotron, Modal, ModalHeader, ModalBody, ModalFooter, InputGroup,Input, InputGroupAddon, InputGroupText,Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, updateEntity } from './plant-case.reducer';
import { IPlantCase } from 'app/shared/model/plant-case.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT, AUTHORITIES } from 'app/config/constants';
import { hasAnyAuthority } from 'app/shared/auth/private-route';


export interface IPlantCaseDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PlantCaseDetail = (props: IPlantCaseDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { plantCaseEntity, account, isEmployee } = props;
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [caseNotes, setCaseNotes] = useState("");
  const updateSearchVal = (event) => setCaseNotes(event.target.value);

 
  const updateCaseNotes = () =>
  {
    toggle();
    const newEntity = {
      ...plantCaseEntity
    };
    const now = new Date();
    newEntity.caseNotes = plantCaseEntity.caseNotes + "\n" + now.toDateString() + " " + now.toLocaleTimeString() + "-" +account.firstName + " " + account.lastName + " : "+ caseNotes;
    
    alert(newEntity.caseNotes);
    if(props.updateEntity(newEntity))
    {
      window.location.reload();
    }

  }
 
  return (
   
    <div>
       <div>
        <Modal show = "show" isOpen={modal} toggle={toggle} className="modal d-block">
    <ModalHeader toggle={toggle}>Edit Case Notes </ModalHeader>
    <ModalBody>
    <Card>
        <CardBody>
          <CardTitle>Previous Notes: </CardTitle>
          <hr></hr>
          <CardText>{plantCaseEntity.caseNotes}</CardText>
        </CardBody>
      </Card>
    <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>New Note:</InputGroupText>
        </InputGroupAddon>
        <Input type="textarea" name="text" id="exampleText" value = {caseNotes} onChange = {updateSearchVal} />
      </InputGroup>
    </ModalBody>
    <ModalFooter>
      <Button color="primary" onClick={updateCaseNotes}>Add Note</Button>{' '}
      <Button color="secondary" onClick={toggle}>Cancel</Button>
    </ModalFooter>
  </Modal>

    </div>
    
    <Container> 
      <Jumbotron>
               <h2>Plantcase Details  </h2>
               <hr></hr>

              
        &nbsp;
        <Button  color="success" onClick = {toggle} className="btn btn-primary float-right jh-create-entity">
          <FontAwesomeIcon icon="pencil-alt"  /> <span className="d-none d-md-inline">Add Notes</span>
        </Button>
        &nbsp;
        {!isEmployee ? (
        <Button tag={Link} to={`/plant-case/${plantCaseEntity.id}/edit`} replace color="primary" className="btn btn-primary float-right jh-create-entity">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
         ):(<div></div>)}
          <Button tag={Link} to="/plant-case" replace color="info" className="btn btn-primary float-right jh-create-entity">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
      </Jumbotron>
    <Row>
      <Col >
        <h2>
          PlantCase ID [<b>{plantCaseEntity.id}</b>]
        </h2>
        <dl >
          <dt>
            <span id="postcode">Needs Attention</span>
          </dt>
          <dd>{plantCaseEntity.needsAttention}</dd>
          <dt>
            <span id="postcode">Time Opened</span>
          </dt>
          <dd>
            <TextFormat value={plantCaseEntity.timeOpened} type="date" format={APP_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="postcode">Time Closed</span>
          </dt>
          <dd>
            <TextFormat value={plantCaseEntity.timeClosed} type="date" format={APP_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="postcode">Status</span>
          </dt>
          <dd>{plantCaseEntity.status}</dd>
          <dt>
            <span id="postcode">Case Notes</span>
          </dt>
          <dd className = "allow-new-line">  
            {plantCaseEntity.caseNotes}</dd>
          <dt><span id="postcode">Assigned to</span></dt>
         <dd>{plantCaseEntity.user ? (<div> {plantCaseEntity.user.firstName}{" "}{plantCaseEntity.user.lastName}</div>) : ''}</dd>
          <dt><span id="postcode">Plant</span></dt>
          <dd>{plantCaseEntity.plant ? <Link to={`plant/${plantCaseEntity.plant.id}`}>{plantCaseEntity.plant.id}</Link> : ''}</dd>
        </dl>
       
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
                <span id="postcode">Address: <span className="customerResult">{plantCaseEntity.plant.customer.address}</span></span>
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
                <span id="phoneNo">Contact No: <span className="customerResult">{plantCaseEntity.plant.customer.phoneNo}</span></span>
              </dt>
              
            </dl>

          </div>

        ):(<div> No Customer Refrence Found </div>)) : (<div> No Plant Refrence Found </div>)}
        </div>
      </Col>
    </Row>
    </Container>
    </div>
  );
};

const mapStateToProps = ({ plantCase, authentication, userManagement }: IRootState) => ({
  plantCaseEntity: plantCase.entity,
  account: authentication.account,
  isEmployee: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.EMPLOYEE])
});

const mapDispatchToProps = { getEntity, updateEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PlantCaseDetail);
