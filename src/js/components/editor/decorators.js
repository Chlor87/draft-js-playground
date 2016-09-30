import React, {Component} from 'react'
import {CompositeDecorator} from 'draft-js'

const HANDLE_RE = /@\w+/g

const handleSpan = props => {
  return (
    <span style={{backgroundColor: 'lightblue'}}>
      {props.children}
    </span>
  )
}

function handleStrategy(contentBlock, cb) {
  findWithRegex(HANDLE_RE, contentBlock, cb)
}

function findWithRegex(regex, contentBlock, callback) {
  const text = contentBlock.getText()
  let matchArr, start
  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index
    callback(start, start + matchArr[0].length)
  }
}

export default new CompositeDecorator([
  {
    strategy: handleStrategy,
    component: handleSpan
  }
])
