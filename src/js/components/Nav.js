import React, {Component} from 'react'

import {
  Nav as BSNav,
  Navbar,
  NavItem,
  NavDropdown,
  MenuItem
} from 'react-bootstrap'
import {Link} from 'react-router'
import {LinkContainer} from 'react-router-bootstrap'
import FA from 'react-fontawesome'
import {toJS} from 'mobx'

export default class Nav extends Component {

  state = {
    activeKey: 1
  }

  onSelect = activeKey => {
    this.setState({activeKey})
  }

  render() {

    let {
          state: {activeKey},
          onSelect
          } = this

    return (
      <Navbar staticTop inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to='/'>
              <FA name="home"/>
            </Link>
          </Navbar.Brand>
        </Navbar.Header>
        <BSNav activeKey={activeKey} onSelect={onSelect}>
          <NavDropdown title="Pageset" eventKey={1} id="pageset">
            <LinkContainer to="/pageset/list">
              <MenuItem eventKey={1.1}>
                List
              </MenuItem>
            </LinkContainer>
            <LinkContainer to="/pageset/add">
              <MenuItem eventKey={1.2}>
                Add...
              </MenuItem>
            </LinkContainer>
          </NavDropdown>

          <NavDropdown title="Custom Elements" eventKey={2}
                       id="custom-elements">
            <LinkContainer to="custom-element/list">
              <MenuItem eventKey={2.1}>
                List
              </MenuItem>
            </LinkContainer>

            <LinkContainer to="custom-element/add">
              <MenuItem eventKey={2.2}>
                Add...
              </MenuItem>
            </LinkContainer>
          </NavDropdown>

          <NavDropdown title="Layout" eventKey={3} id="layout">
            <LinkContainer to="/layout/list">
              <MenuItem eventKey={3.1}>
                List
              </MenuItem>
            </LinkContainer>
            <LinkContainer to="/layout/add">
              <MenuItem eventKey={3.2}>
                Add...
              </MenuItem>
            </LinkContainer>
          </NavDropdown>

          <NavDropdown title="Theme" eventKey={4} id="theme">
            <LinkContainer to="theme/list">
              <MenuItem eventKey={4.1}>
                List
              </MenuItem>
            </LinkContainer>
            <LinkContainer to="theme/add">
              <MenuItem eventKey={4.2}>
                Add...
              </MenuItem>
            </LinkContainer>
          </NavDropdown>



        </BSNav>
      </Navbar>
    )

  }

}
