import 'rc-datetime-picker/dist/picker.css';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Container, Jumbotron, Table} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';
import { getEntity, getAllDataReading } from './plant.reducer';
import { APP_DATE_FORMAT } from 'app/config/constants';
import { LineGraph } from 'app/shared/graphing/line-graph-gradient';
import moment from 'moment';
import { DatetimePickerTrigger } from 'rc-datetime-picker';
import { TextFormat } from 'react-jhipster';

export interface IPlantDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}
export interface IDataReadingDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PlantDetail = (props: IPlantDetailProps) => {

  const { plantEntity, dataReadings, loading} = props;
  const temps = [];
  const humids = [];
  const lights = [];
  const moist = [];

  const [fromDate, setFromDate] = useState(moment().subtract(4, 'weeks'));
  const [toDate, setToDate] = useState(moment());

  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  useEffect (() => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    getDataReadingsRange();
  }, [fromDate, toDate]);

  const getDataReadingsRange = () => {
    props.getAllDataReading(props.match.params.id, fromDate.format(), toDate.format());
  }

  const onChangeFromDate = (date) => {
    setFromDate(date);
  }

  const onChangeToDate = (date) => {
    setToDate(date);
  }

  // Map data reading values into individual arrays
  // of timestamps and values
  dataReadings.map((dataReading, i) => {
    temps.push(
      {"time": dataReading.time, 
      "value": dataReading.temp}
    );
    humids.push(
      {"time": dataReading.time, 
      "value": dataReading.humidity}
    );
    lights.push(
      {"time": dataReading.time, 
      "value": dataReading.light}
    );
    moist.push(
      {"time": dataReading.time, 
      "value": dataReading.moisture}
    );     
  });

  return (
    <Container> 
    <Jumbotron>
      <Row>
      <Col> <h2>Plant Details</h2>
        <hr></hr>
        <h4>
          Plant ID:  [<b>{plantEntity.id}</b>]
        </h4>
      </Col>
      <Col> 
     
        <dl className="jh-entity-details">
          <dt>
            <span id="name">Name</span>
          </dt>
          <dd>{plantEntity.name}</dd>
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{plantEntity.description}</dd>
          <dt>
            <span id="location">Location</span>
          </dt>
          <dd>{plantEntity.location}</dd>
          <dt>
            <span id="sensorID">Sensor ID</span>
          </dt>
          <dd>{plantEntity.sensorID}</dd>
          <dt>Plantthresholds</dt>
          <dd>{plantEntity.plantthresholds ? (<div> 
              <Link to = {`/plant-thresholds/${plantEntity.plantthresholds.id}`}>
                {plantEntity.plantthresholds.id}
                 </Link>

          </div>) : ''}</dd>
          <dt>Customer</dt>
          <dd>{plantEntity.customer ? (
          <div>
            <Link to={`/customer/${plantEntity.customer.id}`} >
            
            {plantEntity.customer.user.firstName}
                </Link>
            
          </div>) : ''}</dd>
        </dl>
        <Button onClick={props.history.goBack} replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/plant/${plantEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      
      </Col>

      </Row>
             
             
    </Jumbotron>
    <h3>Plant Analytics</h3>
    <hr></hr>
    <Row>
      <Col md="3">
        <span>Data Readings From</span>
        <DatetimePickerTrigger
          moment={fromDate}
          onChange={onChangeFromDate}
          appendToBody="true">
          <input type="text" value={fromDate.format('YYYY-MM-DD HH:mm')} readOnly />
          <Button size="sm" color="info">
            <FontAwesomeIcon icon="calendar" />
          </Button>
        </DatetimePickerTrigger>
        <span>To</span>
        <DatetimePickerTrigger
          moment={toDate}
          onChange={onChangeToDate}
          appendToBody="true">
          <input type="text" value={toDate.format('YYYY-MM-DD HH:mm')} readOnly />
          <Button size="sm" color="info">
            <FontAwesomeIcon icon="calendar" />
          </Button>
        </DatetimePickerTrigger>
        <hr></hr>
        {(plantEntity.avgHumidity && plantEntity.avgTemp && 
        plantEntity.avgMoisture && plantEntity.avgLight) ? (
          <div>
            <Row>
              <Col md="12">
                <h4>Latest Average Data Readings:</h4>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <p>{Math.trunc(plantEntity.avgHumidity * 100)}% Humidity</p>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <p>{plantEntity.avgLight} Lux</p>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <p>{Math.trunc(plantEntity.avgMoisture * 100)}% Moisture Content</p>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <p>{plantEntity.avgTemp} Degrees Celcius</p>
              </Col>
            </Row>
          </div>
        ) : ('')}
      </Col>
      <Col md="9">
      {dataReadings && dataReadings.length > 0 ? (
        <div>
          <Row>
            <Col md="6">
              <LineGraph data={temps} labels={["Temperature", "Time"]} size={[450, 250]} margin={[50, 10, 10, 25]}/>
            </Col>
            <Col md="6">
              <LineGraph data={humids} labels={["Humidity", "Time"]} size={[450, 250]} margin={[50, 10, 10, 25]}/>
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <LineGraph data={lights} labels={["Light", "Time"]} size={[450, 250]} margin={[60, 10, 10, 25]}/>
            </Col>
            <Col md="6">
              <LineGraph data={moist} labels={["Moisture", "Time"]} size={[450, 250]} margin={[50, 10, 10, 25]}/>
            </Col>
          </Row>
        </div>
      ) : (
        !loading && <div className="alert alert-warning">No Data Readings found</div>
      )}
      </Col>
    </Row>
    
    <Row>
    <div>
    
    {plantEntity.plantcases && plantEntity.plantcases.length > 0 ? (
          
           
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
               <th />
             </tr>
           </thead>
           <tbody>
           
             { plantEntity.plantcases.map((plantCases, i) => (
               <tr key={`entity-${i}`}>
                 
                 <td>{plantCases.needsAttention}</td>
                 <td>
                   <TextFormat type="date" value={plantCases.timeOpened} format={APP_DATE_FORMAT} />
                 </td>
                
                 <td>{plantCases.status}</td>
                 <td>{plantCases.plant ? <Link to={`plant/${plantCases.plant.id}`}>{plantCases.plant.id}</Link> : ''}</td>
                 <td> 
   
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
            <div className="alert alert-warning">No Plant Cases found</div>
         )}
      
         </div>
         </Row>
      
    </Container> 
  );
};




const mapStateToProps = ({ plant }: IRootState) => ({
  plantEntity: plant.entity,
  dataReadings: plant.dataReadings,
  loading: plant.loading
});

const mapDispatchToProps = { getEntity, getAllDataReading };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PlantDetail);
