import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table, Container, Jumbotron, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { ICrudGetAllAction, TextFormat, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './plant-case.reducer';
import { IPlantCase } from 'app/shared/model/plant-case.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IPlantCaseProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const PlantCase = (props: IPlantCaseProps) => {
  const [paginationState, setPaginationState] = useState(getSortState(props.location, ITEMS_PER_PAGE));

  const getAllEntities = () => {
    props.getEntities(paginationState.activePage - 1, paginationState.itemsPerPage, `${paginationState.sort},${paginationState.order}`);
  };

  const sortEntities = () => {
    getAllEntities();
    props.history.push(
      `${props.location.pathname}?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`
    );
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === 'asc' ? 'desc' : 'asc',
      sort: p
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage
    });

    const [searchVal, setSearchVal] = useState("");
  const updateSearchVal = (event) => setSearchVal(event.target.value);

  const searchByValue =(arrayTosearch, string) =>
  {
     //return array.filter(o => { return Object.keys(o).some(k => { if(typeof o[k] === 'string') return o[k].toLowerCase().includes(string.toLowerCase()); }); });
     return arrayTosearch.filter((data) =>  JSON.stringify(data).toLowerCase().includes(string.toLowerCase())); 
     
  }
  const { plantCaseList, match, loading, totalItems } = props;
  return (
    <div>
      <Container> 
      <Jumbotron>
               <h2>Plant Cases</h2>
               <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                  <FontAwesomeIcon icon="plus" />
                   &nbsp; Create new Plant Case
                </Link>
      </Jumbotron>

      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>Search Cases</InputGroupText>
        </InputGroupAddon>
        <Input value = {searchVal} onChange = {updateSearchVal} />
      </InputGroup>

      <div className="table-responsive">
        {plantCaseList && plantCaseList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  ID <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('needsAttention')}>
                  Needs Attention <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('timeOpened')}>
                  Time Opened <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('timeClosed')}>
                  Time Closed <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('status')}>
                  Status <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('caseNotes')}>
                  Case Notes <FontAwesomeIcon icon="sort" />
                </th>
                <th  className="hand" onClick={sort('user')}>
                  User <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Plant <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {searchByValue(plantCaseList, searchVal).map((plantCase, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${plantCase.id}`} color="link" size="sm">
                      {plantCase.id}
                    </Button>
                  </td>
                  <td>{plantCase.needsAttention}</td>
                  <td>
                    <TextFormat type="date" value={plantCase.timeOpened} format={APP_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={plantCase.timeClosed} format={APP_DATE_FORMAT} />
                  </td>
                  <td>{plantCase.status}</td>
                  <td>{plantCase.caseNotes}</td>
              <td>{plantCase.user ? (<div> {plantCase.user.firstName} {" "} {plantCase.user.lastName}</div>) : ''}</td>
                  <td>{plantCase.plant ? <Link to={`plant/${plantCase.plant.id}`}>{plantCase.plant.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${plantCase.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${plantCase.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${plantCase.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
        ) : (
          !loading && <div className="alert alert-warning">No Plant Cases found</div>
        )}
      </div>
      <div className={plantCaseList && plantCaseList.length > 0 ? '' : 'd-none'}>
        <Row className="justify-content-center">
          <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} />
        </Row>
        <Row className="justify-content-center">
          <JhiPagination
            activePage={paginationState.activePage}
            onSelect={handlePagination}
            maxButtons={5}
            itemsPerPage={paginationState.itemsPerPage}
            totalItems={props.totalItems}
          />
        </Row>
      </div>
      </Container>
    </div>
  );
};

const mapStateToProps = ({ plantCase }: IRootState) => ({
  plantCaseList: plantCase.entities,
  loading: plantCase.loading,
  totalItems: plantCase.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PlantCase);
