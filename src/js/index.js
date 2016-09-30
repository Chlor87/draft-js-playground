/**
 * @flow
 */

import 'bootstrap-css-only/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import '../css/style.scss'

import React from 'react'
import ReactDOM from 'react-dom'
import {Router, RouterContext, browserHistory} from 'react-router'
import 'mobx-react-devtools'

import ContextProvider  from './ContextProvider'
import state from './state'
import routes from './routes'

const context = {
  state,
  store: {}
}

const createElement = props => {
  return <ContextProvider context={context}>
    <RouterContext {...props}/>
  </ContextProvider>
}


ReactDOM.render(
  <Router history={browserHistory} routes={routes}
          render={createElement}/>,
  document.querySelector('#mount-point')
)

