import React, {Component} from 'react'
import {Grid, Row, Col} from 'react-bootstrap'
import Editor from './editor/Editor'

export default class Home extends Component {
  render() {
    return (
      <Row>
        <h1 className="col-sm-12">home</h1>
        <Col sm={12}>
          <Editor/>
        </Col>
      </Row>
    )
  }
}
