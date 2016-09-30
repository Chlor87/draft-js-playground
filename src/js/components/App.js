import React, {Component} from 'react'
import {connect} from 'mobx-connect'

import {Grid} from 'react-bootstrap'
import Nav from './Nav'

export default class App extends Component {


  renderDevTools() {
    const isDevelopement = process.env.NODE_ENV
    if (!isDevelopement) {
      return null
    }
    const DevTools = require('mobx-react-devtools').default
    return <DevTools/>
  }

  render() {


    let {renderDevTools, props} = this
    return (
      <div>
        <Nav {...props}/>
        {
            <Grid fluid>{this.props.children}</Grid>
        }

        {renderDevTools()}
      </div>
    )
  }
}
