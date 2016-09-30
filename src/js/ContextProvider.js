import React, {Component} from 'react'
import {contextTypes} from 'mobx-connect'

export default class ContextProvider extends Component {

  static childContextTypes = contextTypes

  getChildContext() {
    return this.props.context
  }

  render() {
    return this.props.children
  }
}
