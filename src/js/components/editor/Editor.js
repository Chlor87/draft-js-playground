import React, {Component} from 'react'
import {Editor, EditorState, RichUtils} from 'draft-js'
import {ButtonGroup} from 'react-bootstrap'
import {InlineStyleControls} from './buttons'
import compositeDecorator from './decorators'

export default class MyEditor extends Component {

  state = {
    editorState: EditorState.createEmpty(compositeDecorator)
  }

  constructor(...args) {
    super(...args)
  }

  onChange = editorState => this.setState({editorState})

  onTab = e => {
    const maxDepth = 4
    let {onChange, state: {editorState}} = this
    onChange(RichUtils.onTab(e, editorState, maxDepth))
  }

  handleKeyCommand = command => {
    let {state: {editorState}, onChange} = this,
        newState = RichUtils.handleKeyCommand(editorState, command)

    newState && onChange(newState)
  }

  toggleInlineStyle = style => {
    let {
          refs: {editor},
          state: {editorState},
          onChange
          } = this
    onChange(RichUtils.toggleInlineStyle(editorState, style))

  }

  render() {
    let {
          state: {editorState},
          onChange, handleKeyCommand,
          toggleInlineStyle, onTab
          } = this
    return (
      <div>
        <div style={{marginBottom: '1rem'}}>
          <ButtonGroup>
            <InlineStyleControls onToggle={toggleInlineStyle}
                                 editorState={editorState}/>
          </ButtonGroup>

        </div>
        <div style={{padding: '2rem', border: '1px solid gray'}}
             onClick={() => this.refs.editor.focus()}>
          <Editor
            ref="editor"
            editorState={editorState}
            onChange={onChange}
            onTab={onTab}
            textAlignment="center"
            handleKeyCommand={handleKeyCommand}
          />
        </div>
      </div>
    )
  }
}
