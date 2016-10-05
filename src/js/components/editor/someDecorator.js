import React, {Component} from 'react'
import {
  CompositeDecorator,
  Entity,
  Modifier,
  SelectionState,
  EditorState,
  ContentState
} from 'draft-js'
import SimpleDecorator from 'draft-js-simpledecorator'

import {findWithRegex} from './utils'

const HANDLE_RE = /@\w+/g

const handleSpan = props => {
  return <span style={{backgroundColor: 'lightblue'}}>{props.children}</span>
}

const handleStrategy = props => (contentBlock, cb) => {
  for (let [start, end] of findWithRegex(HANDLE_RE, contentBlock)) {
    cb(start, end, {...props, start, contentBlock})
  }
}

export default props => {
  return new SimpleDecorator(handleStrategy(props), handleSpan)
}
