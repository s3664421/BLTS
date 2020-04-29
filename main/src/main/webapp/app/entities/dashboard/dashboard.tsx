import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table, Alert, Container, Label, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { ICrudGetAllAction, TextFormat, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { updateEntity } from '../plant-case/plant-case.reducer';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { CaseStatus } from 'app/shared/model/enumerations/case-status.model';
import { IRootState } from 'app/shared/reducers';
import { getEntities, getUnassignedCases, getCaseForEmployee, getAllActiveCases} from './dashboard.reducer';
import { IDashboard } from 'app/shared/model/dashboard.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT, AUTHORITIES } from 'app/config/constants';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import plant from '../plant/plant';
import { EventEmitter } from 'events';

export interface IDashboardProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}
export interface IPlantCaseProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Dashboard = (props: IDashboardProps) => {

  const { dashboardList, match, loading, loadingPlantCase, isAdmin, isManager, isCustomer, isEmployee, account, unassignedCases, employeeCases, users, assignedCases } = props;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);

  useEffect(() => {
    props.getUnassignedCases(props.account);
    props.getAllActiveCases(props.account);
    props.getUsers();
    props.getCaseForEmployee(props.account.id);
  }, []);

  const handleClick = (event) => {
   
    if(event.target.value === "-1")
    {
      alert("nope");
      return;
    
    }

   
   const entitys = {
     ...unassignedCases[event.target.options[event.target.selectedIndex].dataset.plant]
   };
   const userfilt = users.filter(function(user) {
    return user.authorities.includes(AUTHORITIES.EMPLOYEE);
   });

   entitys.user = userfilt[event.target.value];
   entitys.status = CaseStatus.ASSIGNED;
   if(props.updateEntity(entitys))
   {
    props.getUnassignedCases(props.account);
    props.getAllActiveCases(props.account);
    window.location.reload();
    
   }
  };

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
 
  return (
    <div>
      <h2 id="dashboard-heading">
        Dashboard 
      </h2>
      { isManager ? (
         <div> 
           <p> Manager Dashboard</p>
           <Alert color="success">Welcome {account.login}.</Alert> 
           <div>

           <Container>
              <Row>
                <h2> New cases</h2>
              </Row>
              <Row>
                <Col>
                   {(unassignedCases.length > 0)? ( 
                      <Alert color="danger">Action Needed: There are {unassignedCases.length} new cases that need your attention.</Alert>
                    ):(
                       <Alert color="success">There are no unassigned cases.</Alert>
                     )}
                </Col>
                </Row>
               
                <Row>
                  <Col>
                

          
           {unassignedCases && unassignedCases.length > 0 ? (
          
           
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
            
              { unassignedCases.map((plantCases, i) => (
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
              ))}
            </tbody>

          </Table>
          ): (
            !loadingPlantCase && <div className="alert alert-warning">No Plant Cases found</div>
          )}
          
          </Col>
                </Row>
            <Row> 
                <Col>
                <h2> Assigned cases</h2>
                   {(employeeCases.length > 0)? ( 
                      <Alert color="warning">There are {employeeCases.length} assigned cases in progress.</Alert>
                    ):(
                       <Alert color="success">All employee assigned cases are complete.</Alert>
                     )}
                </Col>
                </Row>
          <Row>
            <Col>
            {/* Show list of employees */}

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
            

            
            </Col>
          </Row>
            </Container>
               </div>
         </div>):(
           isEmployee ? (
            <div>
              <div>Employee Dashboard </div>
              <div>
              {(assignedCases.length > 0)? ( 
                      <Alert color="danger">Action Needed: There are {assignedCases.length} new cases that need your attention.</Alert>
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
                       tag={Link}
                       to={`plant-case/${plantCases.id}`}
                       color="primary"
                       size="sm"
                     >
                       <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                     </Button>
                     <Button 
                       onClick = {()=> completeCase(i)}
                       color="secondary"
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
           (
            <div>
              User Dashboard
            </div>
           )
           
           )
         
        )}


    
    </div>
  );
};

const mapStateToProps = ({ userManagement, dashboard, authentication }: IRootState) => ({
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
  assignedCases: dashboard.assignedCases
  
});

const mapDispatchToProps = {
  getEntities, 
  getUnassignedCases,
  getAllActiveCases,
  getUsers, 
  updateEntity,
  getCaseForEmployee
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
