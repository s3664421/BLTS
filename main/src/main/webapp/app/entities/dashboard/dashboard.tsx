/* eslint no-console: off */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table, Alert, Container,Jumbotron, Label, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { ICrudGetAllAction, TextFormat, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { updateEntity } from '../plant-case/plant-case.reducer';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { CaseStatus } from 'app/shared/model/enumerations/case-status.model';
import { IRootState } from 'app/shared/reducers';
import { getUnassignedCases, getCaseForEmployee, getAllActiveCases, getAllPlants, getCustomer} from './dashboard.reducer';
import { IDashboard } from 'app/shared/model/dashboard.model';
import { ICustomer } from 'app/shared/model/customer.model'
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT, AUTHORITIES } from 'app/config/constants';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { getEntity } from 'app/entities/customer/customer.reducer';
import plant from '../plant/plant';
import { EventEmitter } from 'events';
import moment from 'moment';

export interface IDashboardProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}
export interface IPlantCaseProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}
export interface ICustomerProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Dashboard = (props: IDashboardProps) => {

  const { dashboardList, match, loading, loadingPlantCase, customerEntity, customer, isAdmin, isManager, isCustomer, isEmployee, account, unassignedCases, employeeCases, users, assignedCases, customerPlants } = props;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showAssignedCases, assignedCasesOpen] = useState(false);
  const [ showUnassignedCases, unassignedCasesOpen] = useState(false);
  const [showUrgentCases, urgentCasesOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);
  const toggleAssignedCases = () => assignedCasesOpen(!showAssignedCases);
  const toggleUnassignedCases = () => unassignedCasesOpen(!showUnassignedCases);
  const toggleUrgentCases = () => urgentCasesOpen(!showUrgentCases);
  const unassignedCasesGrouped = [];
  const urgentCases = [];


  useEffect(() => {
    
    props.getUnassignedCases(props.account);
    props.getAllActiveCases(props.account);
    props.getUsers();
    props.getCaseForEmployee(props.account.id);
    
    if(isCustomer )
    {
      //alert(props.account.id);
     props.getCustomer(props.account.id)
    }
  }, []);

  const handleClick = (event) => { 
    if(event.target.value === "-1")
    {
      alert("nope");
      return;
    
    }
   
   const entitys = {
     ...unassignedCasesGrouped[event.target.options[event.target.selectedIndex].dataset.plant]
   };
   const userfilt = users.filter(function(user) {
    return user.authorities.includes(AUTHORITIES.EMPLOYEE);
   });
   
   if (entitys.needsAttention === "MULTIPLE") {
    const multipleEntities = unassignedCases.filter((unassignedCase) => {
      return unassignedCase.plant.id === entitys.plant.id;
    })
    multipleEntities.forEach((entity) => {
      entity.user = userfilt[event.target.value];
      entity.status = CaseStatus.ASSIGNED;
      if(props.updateEntity(entity))
      {
        props.getUnassignedCases(props.account);
        props.getAllActiveCases(props.account);
        window.location.reload();
        
      }
    })
  } else {
    entitys.user = userfilt[event.target.value];
    entitys.status = CaseStatus.ASSIGNED;
    if(props.updateEntity(entitys))
    {
      props.getUnassignedCases(props.account);
      props.getAllActiveCases(props.account);
      window.location.reload();
      
    }
  }
  };

  const handleUrgentClick = (event) => {
    if(event.target.value === "-1")
    {
      alert("nope");
      return;
    
    }
   
   const urgentEntitys = {
     ...urgentCases[event.target.options[event.target.selectedIndex].dataset.plant]
   };
   const entitys = unassignedCases.find((unassignedCase) => {
    return unassignedCase === urgentEntitys;
  })
   const userfilt = users.filter(function(user) {
    return user.authorities.includes(AUTHORITIES.EMPLOYEE);
   });
   urgentEntitys.user = userfilt[event.target.value];
   urgentEntitys.status = CaseStatus.ASSIGNED;
    if(props.updateEntity(urgentEntitys))
    {
      props.getUnassignedCases(props.account);
      props.getAllActiveCases(props.account);
      window.location.reload();
      
    }
  }

  const completeCase = (index) => {

    const entitys = 
    {
      ...assignedCases[index]
    };

    entitys.status = CaseStatus.CLOSED;
    if(props.updateEntity(entitys))
    {
      window.location.reload();
    }
  };

  unassignedCases.sort((a, b) => {
    return a.plant.id - b.plant.id;
  });
  // console.log("urgentCases: ", urgentCases);
  for (let j=0; j < unassignedCases.length; j++) {
    if (j < unassignedCases.length-1) {
      // console.log("length: ", unassignedCases.length, " , j: ", j);
      if (unassignedCases[j].plant.id === unassignedCases[j+1].plant.id) {
        while (j < unassignedCases.length-1 && unassignedCases[j].plant.id === unassignedCases[j+1].plant.id) {
          // console.log("incrementing");
          j++;
        }
        // console.log("grouping");
        unassignedCasesGrouped.push({
          caseNotes: "",
          id: unassignedCases[j].plant.id,
          needsAttention: "MULTIPLE",
          plant: unassignedCases[j].plant,
          status: "OPEN",
          timeClosed: null,
          timeOpened: unassignedCases[j].timeOpened,
          user: null
          })
      } else {
        // console.log("not grouping");
        unassignedCasesGrouped.push(unassignedCases[j]);
      }
    } else {
      // console.log("Last element");
      unassignedCasesGrouped.push(unassignedCases[j]);
    }
  }
  unassignedCasesGrouped.forEach((unassignedCase, i, obj) => {
    // If case was opened more than 4 days ago
    if (moment().subtract(4, "days").isAfter(unassignedCase.timeOpened)) {
      urgentCases.push(unassignedCase);
    }
  });

  // console.log("unassignedCases: ", unassignedCases);
  // console.log("unassignedCasesGrouped: ", unassignedCasesGrouped);
  // console.log("urgentCases: ", urgentCases);
  
 
  return (
    <div>
      <Container> 
      { isManager ? (
         <div> 
            
           <Jumbotron>
               <h1 className="display-3">Management Dashboard </h1>
              <p className="lead">Welcome {account.firstName}</p>
                <hr className="my-2" />
            </Jumbotron>
           
           <div>

           <Container>
              <Row>
                <Col>
                <h2>Urgent Cases</h2>
                    {(urgentCases.length > 0)? ( 
                      <Alert onClick = {toggleUrgentCases} className="clearfix" color="danger">
                        <FontAwesomeIcon icon = "exclamation"/> {"   "}{" "}
                        Urgent Action Needed: There are {urgentCases.length} cases that have been open for 4 days or longer.
                      <Button className = "float-sm-right" color = "danger" onClick ={toggleUrgentCases} >View</Button>
                      </Alert>
                    ):(
                        <Alert color="success">There are no urgent cases.</Alert>
                      )}
                </Col>
              </Row>

              <Row>
                <Col>
                  

              {showUrgentCases ? (
                <div>
            { urgentCases && urgentCases.length > 0 ? (
            
            
            <Table responsive striped>
            
              <thead>
                <tr>
                  <th className="hand" >
                    Needs Attention 
                  </th>
                  <th className="hand" >
                    Time Opened 
                  </th>
                  <th className="hand" >
                    Status 
                  </th>
                  <th>
                    Plant 
                  </th>
                  <th>
                    Assign To 
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
              
                { urgentCases.map((plantCases, i) => (
                  <tr key={`entity-${i}`}>
                    
                    <td>{plantCases.needsAttention}</td>
                    <td>
                      <TextFormat type="date" value={plantCases.timeOpened} format={APP_DATE_FORMAT} />
                    </td>
                  
                    <td>{plantCases.status}</td>
                    <td>{plantCases.plant ? <Link to={`plant/${plantCases.plant.id}`}>{plantCases.plant.id}</Link> : ''}</td>
                    <td> 
                    <select onChange={(e) =>handleUrgentClick(e)}>
                    <option  key = "-1" value= "-1" ></option>
                      {users
                      ? users.filter(function(user) {
                        return user.authorities.includes(AUTHORITIES.EMPLOYEE);
                      }).map((otherEntity, index) => ( 
                        <option key = {index} value={index} data-plant = {i}  >{otherEntity.firstName}</option>
                      
                        ))
                      : null}
                      </select>
              

                      
                      </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`plant-case/${plantCases.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button
                          tag={Link}
                          to={`plant-case/${plantCases.id}`}
                          color="primary"
                          size="sm"
                        >
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button
                          tag={Link}
                          to={`plant-case/${plantCases.id}/delete`}
                          color="danger"
                          size="sm"
                        >
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>

            </Table>
            ): (
              !loadingPlantCase && <div className="alert alert-warning">No Plant Cases found</div>
            )}
            </div>
            ):(<div> </div>)}
            
            </Col>
          </Row>

              <Row>
                <Col>
                <h2> New cases</h2>
                   {(unassignedCases.length > 0)? ( 
                      <Alert onClick = {toggleAssignedCases} className="clearfix" color="warning">
                        <FontAwesomeIcon icon = "exclamation"/> {"   "}{" "}
                        Action Needed: There are {unassignedCases.length - urgentCases.length} new cases that need your attention.
                      <Button className = "float-sm-right" color = "warning" onClick ={toggleAssignedCases} >View</Button>
                      </Alert>
                    ):(
                       <Alert color="success">There are no unassigned cases.</Alert>
                     )}
                </Col>
                </Row>
               
                <Row>
                  <Col>
                

            {showAssignedCases ? (
              <div>
           {unassignedCasesGrouped && unassignedCasesGrouped.length > 0 ? (
          
           
           <Table responsive striped>
           
            <thead>
              <tr>
                <th className="hand" >
                  Needs Attention 
                </th>
                <th className="hand" >
                  Time Opened 
                </th>
                <th className="hand" >
                  Status 
                </th>
                <th>
                  Plant 
                </th>
                <th>
                  Assign To 
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
            
              { unassignedCasesGrouped.map((plantCases, i) => (
                urgentCases.includes(plantCases) ? (null) : 
                (
                <tr key={`entity-${i}`}>
                  
                  <td>{plantCases.needsAttention}</td>
                  <td>
                    <TextFormat type="date" value={plantCases.timeOpened} format={APP_DATE_FORMAT} />
                  </td>
                 
                  <td>{plantCases.status}</td>
                  <td>{plantCases.plant ? <Link to={`plant/${plantCases.plant.id}`}>{plantCases.plant.id}</Link> : ''}</td>
                  <td> 
                  <select onChange={(e) =>handleClick(e)}>
                  <option  key = "-1" value= "-1" ></option>
                    {users
                    ? users.filter(function(user) {
                      return user.authorities.includes(AUTHORITIES.EMPLOYEE);
                    }).map((otherEntity, index) => ( 
                      <option key = {index} value={index} data-plant = {i}  >{otherEntity.firstName}</option>
                     
                      ))
                    : null}
                    </select>
            

                    
                    </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`plant-case/${plantCases.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`plant-case/${plantCases.id}`}
                        color="primary"
                        size="sm"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`plant-case/${plantCases.id}/delete`}
                        color="danger"
                        size="sm"
                      >
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              )))}
            </tbody>

          </Table>
          ): (
            !loadingPlantCase && <div className="alert alert-warning">No Plant Cases found</div>
          )}
          </div>
          ):(<div> </div>)}
          
          </Col>
                </Row>
            <Row> 
                <Col>
                <h2> Assigned cases</h2>
                   {(employeeCases.length > 0)? ( 
                      <Alert onClick = {toggleUnassignedCases} className="clearfix" color="success">
                       <FontAwesomeIcon icon = "check"/> {"   "}{" "} 
                        There are {employeeCases.length} assigned cases in progress.
                        <Button color = "success" className = "float-sm-right" onClick ={toggleUnassignedCases} >View</Button>
                        </Alert>
                    ):(
                       <Alert color="success">All employee assigned cases are complete.</Alert>
                     )}
                </Col>
                </Row>
          <Row>
            <Col>
            {/* Show list of employees */}
            {showUnassignedCases ? ( 
            <div>
            {employeeCases && employeeCases.length > 0 ? (
          
           
          <Table responsive striped>
          
           <thead>
             <tr>
               <th className="hand" >
                 Needs Attention 
               </th>
               <th className="hand" >
                 Time Opened 
               </th>
               <th className="hand" >
                 Status 
               </th>
               <th>
                 Assigned To 
               </th>
               <th />
             </tr>
           </thead>
           <tbody>
          
             { employeeCases.map((plantCases, i) => (
               <tr key={`entity-${i}`}>
                 
                 <td>{plantCases.needsAttention}</td>
                 <td>
                   <TextFormat type="date" value={plantCases.timeOpened} format={APP_DATE_FORMAT} />
                 </td>
                
                 <td>{plantCases.status}</td>
                 {(plantCases.user)? ( 
                 <td>{plantCases.user.firstName ? <Link to={`/`}>{plantCases.user.firstName}</Link> : ''}</td>
                 ):( <div> No Employee Assigned</div>)}
                 <td className="text-right">
                   <div className="btn-group flex-btn-group-container">
                     <Button tag={Link} to={`plant-case/${plantCases.id}`} color="info" size="sm">
                       <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                     </Button>
                     <Button
                       tag={Link}
                       to={`plant-case/${plantCases.id}`}
                       color="primary"
                       size="sm"
                     >
                       <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                     </Button>
                     <Button
                       tag={Link}
                       to={`plant-case/${plantCases.id}/delete`}
                       color="danger"
                       size="sm"
                     >
                       <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                     </Button>
                   </div>
                 </td>
               </tr>
             ))}
           </tbody>

         </Table>
         ): (
           !loadingPlantCase && <div className="alert alert-warning">No Plant Cases found</div>
         )}
         </div>
         ):(<div></div>)}
            

            
            </Col>
          </Row>
            </Container>
               </div>
         </div>):(
           isEmployee ? (
            <div>
              <Jumbotron>
               <h1>Employee Dashboard</h1>
               <hr></hr>

               <h4> Hello {account.firstName}, look below to see todays workload</h4>
             </Jumbotron>
              <div>
              {(assignedCases.length > 0)? ( 
                      <Alert color="danger"> <FontAwesomeIcon icon = "exclamation"/> {"   "}{" "} Action Needed: There are {assignedCases.length} new cases that need your attention.</Alert>
                    ):(
                       <Alert color="success">There are no unassigned cases.</Alert>
                     )}
              </div>

              
           {assignedCases && assignedCases.length > 0 ? (
          
           
          <Table responsive striped>
          
           <thead>
             <tr>
               <th className="hand" >
                 Needs Attention 
               </th>
               <th className="hand" >
                 Time Opened 
               </th>
               <th className="hand" >
                 Status 
               </th>
               <th>
                 Plant 
               </th>
             
              <th>
                Location
              </th>
               <th />
             </tr>
           </thead>
           <tbody>
           
             { assignedCases.map((plantCases, i) => (
               <tr key={`entity-${i}`}>
                 
                 <td>{plantCases.needsAttention}</td>
                 <td>
                   <TextFormat type="date" value={plantCases.timeOpened} format={APP_DATE_FORMAT} />
                 </td>
                
                 <td>{plantCases.status}</td>
                 <td>{plantCases.plant ? <Link to={`plant/${plantCases.plant.id}`}>{plantCases.plant.id}</Link> : ''}</td>
                {plantCases.plant ? ( 
                <td>{plantCases.plant.customer.address},{plantCases.plant.customer.city}, {plantCases.plant.customer.postcode}</td>
                ):(<td> Missing Plant or Customer Refrence </td>)}
                 <td className="text-right">
                   <div className="btn-group flex-btn-group-container">
                     <Button tag={Link} to={`plant-case/${plantCases.id}`} color="info" size="sm">
                       <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                     </Button>
                    
                     <Button 
                       onClick = {()=> completeCase(i)}
                       color="success"
                       size="sm"
                     >
                       <FontAwesomeIcon icon="check" /> <span className="d-none d-md-inline">Complete</span>
                     </Button>
                   </div>
                 </td>
               </tr>
             ))}
           </tbody>

         </Table>
         ): (
           !loadingPlantCase && <div className="alert alert-warning">No Plant Cases found</div>
         )}


            </div>
            
           ):( isAdmin ? (
            <div>Admin Dashboard


            </div>

           ):
           ( isCustomer ?( 

           (customer ? (
            <div>
           <Jumbotron>
               <h1 className="display-3">Hello {props.account.firstName}</h1>
              <p className="lead">Coming to take a quick look at your plants?</p>
                <hr className="my-2" />
              <p className="lead"> Look below to see all your plants, we will let you know if someones booked to check them out</p>
            </Jumbotron>
          <div className="customer-loinnerbox">
            {customer.plants && customer.plants.length > 0 ? (
              <Table responsive>
                <thead>
                  <tr>
                    <th>Plant Name</th>
                    <th>Location</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {customer.plants.map((plantReading, i) => (
                    <tr key={`entity-${i}`}>
                      <td>
                        <Button tag={Link} to={`/plant/${plantReading.id}`} color="link" size="sm">
                        {plantReading.name}
                        </Button>
                      </td>
                      <td>{plantReading.location}</td>
                      <td>{plantReading.plantcases ? (<b><FontAwesomeIcon icon = "heartbeat"/> Someones on their way to check this one out!</b>): (<FontAwesomeIcon icon = "heart"/>)} </td>
                    </tr>
                  ))}
                </tbody>
              </Table>) : (
              <div className="alert alert-warning">No Data Found</div>
            )}
          
            </div>
            </div>
            ):(<div>No refrence to customer found</div>))
           ):(
           <div>Welcome User</div>))))
           
    
         
        }


    </Container>
    </div>
  );
};

const mapStateToProps = ({ userManagement, dashboard, customer, authentication }: IRootState) => ({
  dashboardList: dashboard.entities,
  loading: dashboard.loading,
  isAdmin: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.ADMIN]),
  isManager: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.MANAGER]),
  isEmployee: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.EMPLOYEE]),
  isCustomer: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.CUSTOMER]),
  account: authentication.account,
  unassignedCases: dashboard.unassignedCases,
  employeeCases: dashboard.employeeCases,
  users : userManagement.users,
  loadingPlantCase: dashboard.loading,
  assignedCases: dashboard.assignedCases,
  customerPlants: dashboard.customerPlants,
  customerEntity : customer.entity,
  customer : dashboard.customer
  
});

const mapDispatchToProps = {
  getEntity, 
  getUnassignedCases,
  getAllActiveCases,
  getUsers, 
  updateEntity,
  getCaseForEmployee,
  getCustomer,
  getAllPlants
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
