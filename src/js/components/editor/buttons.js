import React, {Component} from 'react'

import {RichUtils} from 'draft-js'
import {Button, ButtonGroup} from 'react-bootstrap'
import FA from 'react-fontawesome'

export const InlineStyleControls = props => {
  let {onToggle, editorState} = props,
      currentStyle = editorState.getCurrentInlineStyle();
  return (
    <ButtonGroup>
      {
        inlineStyleButtons.map(({style, icon}, idx) => {
          return (
            <Button key={idx}
                    onClick={() => onToggle(style)}
              {...currentStyle.has(style) ? {bsStyle: 'primary'} : {}}>
              <FA name={icon}/>
            </Button>
          )
        })
      }
    </ButtonGroup>
  )
}

const inlineStyleButtons = [
  {
    style: 'BOLD',
    icon: 'bold'
  },
  {
    style: 'UNDERLINE',
    icon: 'underline'
  },
  {
    style: 'ITALIC',
    icon: 'italic'
  },
  {
    style: 'CODE',
    icon: 'code'
  }
]
