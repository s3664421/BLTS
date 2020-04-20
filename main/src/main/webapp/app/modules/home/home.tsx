import './home.scss';

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { Row, Col, Alert, Container, Jumbotron, Button } from 'reactstrap';

import { IRootState } from 'app/shared/reducers';

export type IHomeProp = StateProps;

export const Home = (props: IHomeProp) => {

  const { account } = props;

  return (
    <Row>
      <Col md="12">
        {account && account.login ? (
          <div>
            <div>
              <Alert color="success">You are logged in as user {account.login}.</Alert> 
            </div>
           
          </div>
        ) : (
          <div>
            
            <div>
      <Jumbotron fluid>
        <Container fluid>
          <h1 className="display-3">Welcome</h1>
          <p className="lead">{"You're not currently logged in..."}</p>
        </Container>
        <Button tag = {Link} to = "/login" color="primary" size="lg">Login</Button>
        <Container>

        </Container>
      </Jumbotron>
    </div>


          </div>
        )}
      </Col>
    </Row>
  );
};

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(Home);
