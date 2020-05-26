import React from 'react';

import { NavItem, NavLink, NavbarBrand } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import appConfig from 'app/config/constants';

export const BrandIcon = props => (
  <div {...props} className="brand-icon">
    <img src="content/images/logo-jhipster.png" alt="Logo" />
  </div>
);

export const Brand = props => (
  <NavbarBrand tag={Link} to="/" className="brand-logo">
    <BrandIcon />
    <span className="brand-title">SmartPlant</span>
    <span className="navbar-version">{appConfig.VERSION}</span>
  </NavbarBrand>
);

export const Home = props => (
  <NavItem>
    <NavLink tag={Link} to="/dashboard" className="d-flex align-items-center">
      <FontAwesomeIcon icon="home" />
      <span>DashBoard</span>
    </NavLink>
  </NavItem>
);

export const Customers = props => (
<NavItem>
    <NavLink tag={Link} to="/customer" className="d-flex align-items-center">
      <FontAwesomeIcon icon="list" />
      <span>Customers</span>
    </NavLink>
  </NavItem>

);

export const Cases = props => (
  <NavItem>
      <NavLink tag={Link} to="/plant-case" className="d-flex align-items-center">
        <FontAwesomeIcon icon="book" />
        <span>Cases</span>
      </NavLink>
    </NavItem>
  
  );

  export const Plants = props => (
    <NavItem>
        <NavLink tag={Link} to="/plant" className="d-flex align-items-center">
          <FontAwesomeIcon icon="leaf" />
          <span>Plants</span>
        </NavLink>
      </NavItem>
    
    );

  export const Thresholds = props => (
    <NavItem>
        <NavLink tag={Link} to="/plant-thresholds" className="d-flex align-items-center">
          <FontAwesomeIcon icon="chart-line" />
          <span>Thresholds</span>
        </NavLink>
      </NavItem>
  );
  


