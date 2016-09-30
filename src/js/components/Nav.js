import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'mobx-connect'
import routes from '../routes'

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


@connect
export default class Nav extends Component {

  state = {
    activeKey: 1
  }

  onSelect = activeKey => {
    this.setState({activeKey})
  }

  /**
   * set proper activeKey for curr navigation path
   */
  componentDidMount() {

    let {props: {location: {pathname}}} = this

    Array.from(ReactDOM.findDOMNode(this.refs.nav).querySelectorAll('[href]')).forEach(elem => {
      let href = elem.getAttribute('href').substr(1)
      if (!href) {
        return
      }
      for (let [topIdx, {nav, path: topPath, childRoutes}] of routes.childRoutes.entries()) {
        if (!nav) {
          continue
        }
        if (childRoutes) {
          for (let [idx, {nav, path}] of childRoutes.entries()) {
            if (!nav) {
              continue
            }
            let curr = `${topPath}/${path}`,
                s = new Set([href, curr, pathname])
            if (s.size === 1) {
              this.setState({activeKey: parseFloat(`${topIdx}.${idx}`)})
            }
          }
        } else {
          if (new Set([href, topPath, pathname]).size === 1) {
            this.setState({activeKey: parseFloat(topIdx)})
          }
        }
      }
    })
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
              <FA name="home"/>&nbsp;draft-js playground
            </Link>
          </Navbar.Brand>
        </Navbar.Header>

        <BSNav onSelect={onSelect} activeKey={activeKey} ref="nav">
          {
            routes.childRoutes.map(({nav, label, path: topPath, childRoutes}, topIdx) => {
              if (!nav) {
                return null
              }
              return childRoutes ? (
                <NavDropdown title={label} eventKey={topIdx} id={label} key={topIdx}>
                  {
                    childRoutes.map(({nav, label, path}, idx) => {
                      if (!nav) {
                        return null
                      }
                      return (
                        <LinkContainer to={`${topPath}/${path}`} key={idx}>
                          <MenuItem eventKey={parseFloat(`${topIdx}.${idx}`)}>
                            {label}
                          </MenuItem>
                        </LinkContainer>
                      )
                    })
                  }
                </NavDropdown>
              ) : (
                <LinkContainer to={topPath} key={topIdx}>
                  <NavItem eventKey={topIdx}>
                    {label}
                  </NavItem>
                </LinkContainer>
              )
            })
          }
        </BSNav>
      </Navbar>
    )

  }

}
