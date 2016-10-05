import React, {Component} from 'react'
import {Editor, EditorState, RichUtils, Entity} from 'draft-js'
import {
  Form,
  ButtonGroup,
  Button,
  InputGroup,
  FormGroup,
  FormControl
} from 'react-bootstrap'
import FA from 'react-fontawesome'
import {InlineStyleControls} from './buttons'
import someDecorator from './someDecorator'
import SimpleDecorator from 'draft-js-simpledecorator'
import MultiDecorator from 'draft-js-multidecorators'

const findLinkEntities = (contentBlock, cb) => {
  contentBlock.findEntityRanges(char => {
    let key = char.getEntity()
    return key !== null && Entity.get(key).getType() === 'LINK'
  }, cb)
}

const Link = props => {
  let {url} = Entity.get(props.entityKey).getData()
  return (
    <a href="{url}">{props.children}</a>
  )
}

const linkDecorator = new SimpleDecorator(findLinkEntities, Link)

export default class MyEditor extends Component {


  constructor(...args) {
    super(...args)
    const decorators = new MultiDecorator([
      someDecorator(this),
      linkDecorator
    ])

    this.state = {
      editorState: EditorState.createEmpty(decorators),
      showLinkInput: false,
      linkInput: ''
    }
  }

  handleLinkInputChange = ({target: {value}}) => this.setState({linkInput: value})

  onChange = (editorState, cb = () => {
  }) => {
    this.setState({editorState}, cb)
  }

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

  onLinkButtonClick = () => {
    let {state: {editorState, showLinkInput}} = this,
        selection = editorState.getSelection()

    if (selection.isCollapsed()) {
      return
    }

    this.setState({
      showLinkInput: !showLinkInput
    })

  }

  applyLink = () => {
    let {state: {editorState, linkInput}} = this,
        entityKey = Entity.create('LINK', 'MUTABLE', {url: linkInput})

    console.log('lv', linkInput)
    this.setState({
      editorState: RichUtils.toggleLink(
        editorState, editorState.getSelection(), entityKey
      ),
      linkInput: '',
      showLinkInput: false
    })
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
          state: {editorState, showLinkInput, linkInput},
          onChange, handleKeyCommand,
          toggleInlineStyle, onTab, onLinkButtonClick, handleLinkInputChange, applyLink
        } = this
    return (
      <div>
        <div style={{marginBottom: '1rem'}}>
          <Form inline onSubmit={e => e.preventDefault()}>
            <FormGroup bsSize="sm">
              <ButtonGroup>
                <InlineStyleControls onToggle={toggleInlineStyle}
                                     editorState={editorState}/>
              </ButtonGroup>&nbsp;
            </FormGroup>

            <FormGroup bsSize="sm">
              <ButtonGroup>
                <Button bsSize="sm" onClick={onLinkButtonClick}>
                  <FA name="link"/>
                </Button>
              </ButtonGroup>
            </FormGroup>

            {
              showLinkInput && (
                <FormGroup bsSize="sm">
                  &nbsp;
                  <InputGroup>
                    <FormControl value={linkInput}
                                 onChange={handleLinkInputChange}/>
                    <InputGroup.Button onClick={applyLink}>
                      <Button bsSize="sm">Apply</Button>
                    </InputGroup.Button>
                  </InputGroup>
                </FormGroup>
              )
            }
          </Form>


        </div>
        <div style={{padding: '2rem', border: '1px solid gray'}}>

          <Editor
            editorState={editorState}
            onChange={onChange}
            handleKeyCommand={handleKeyCommand}
          />
        </div>
      </div>
    )
  }
}
