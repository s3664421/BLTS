import './header.scss';

import React, { useState } from 'react';
import { Navbar, Nav, NavbarToggler, Collapse } from 'reactstrap';
import LoadingBar from 'react-redux-loading-bar';
import { Home, Brand, Customers, Cases, Plants } from './header-components';
import { AdminMenu, EntitiesMenu, AccountMenu } from '../menus';

export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  isManager: boolean;
  isEmployee: boolean;
  ribbonEnv: string;
  isInProduction: boolean;
  isSwaggerEnabled: boolean;
}

const Header = (props: IHeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const renderDevRibbon = () =>
    props.isInProduction === false ? (
      <div className="ribbon dev">
        <a href="">Development</a>
      </div>
    ) : null;

  const toggleMenu = () => setMenuOpen(!menuOpen);

  /* jhipster-needle-add-element-to-menu - JHipster will add new menu items here */

  return (
    <div id="app-header">
      {renderDevRibbon()}
      <LoadingBar className="loading-bar" />
      <Navbar dark expand="sm" fixed="top" className="bg-primary">
        <NavbarToggler aria-label="Menu" onClick={toggleMenu} />
        <Brand />
        
        <Collapse isOpen={menuOpen} navbar>
          <Nav id="header-tabs" className="ml-auto" navbar>
            {props.isAuthenticated &&<Home />}
            {props.isAuthenticated && props.isAdmin && <EntitiesMenu />}
            {props.isAuthenticated && props.isManager && <Customers/>}
            {props.isAuthenticated && props.isManager && <Plants/>}
            {props.isAuthenticated && props.isManager && <Cases/>}
            {props.isAuthenticated && props.isAdmin && (
              <AdminMenu showSwagger={props.isSwaggerEnabled} showDatabase={!props.isInProduction} />
            )}
            <AccountMenu isAuthenticated={props.isAuthenticated} />
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
