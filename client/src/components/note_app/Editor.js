import React, { useMemo, useState, useCallback, useEffect } from "react";
import { Editable, withReact, useSlate, Slate } from 'slate-react'
import { Editor, Transforms, createEditor } from 'slate'
import { withHistory } from 'slate-history'
import { Toolbar } from "./Toolbar";
import { FormatBold, FormatItalic, FormatUnderlined, Code, FormatListBulleted, FormatListNumbered, FormatQuote, LooksTwo, Looks3 } from '@material-ui/icons'
import { TextField, Button, Grid } from "@material-ui/core";
import { Btn } from "./Button";
import { useAuth } from "../auth/auth";

const LIST_TYPES = ['numbered-list', 'bulleted-list'];

const NotePad = (props) => {
  const initialValue = [
    {
      children: [{text: ''}]
    }
  ];

  const { username } = useAuth();
  const [id, setId] = useState("")
  const [value, setValue] = useState(initialValue)
  const [title, setTitle] = useState("");
  const [author] = useState(username); // will get from user.
  const [isNewNote, setIsNewNote] = useState(true)

  // SLATE BOILERPLATE.
  const renderElement = useCallback(props => <Element {...props} />, [])
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])

  const buttonClick = () => {
    if(title === ''){
      alert("You Must Provide a Title for Your Note.");
      return;
    }

    let note = {
      id: id, 
      title: title,
      body: JSON.stringify(value),
      author: author,
      type: isNewNote ? "POST" : "PUT"
    }

    props.handleSave(note);
    setValue(value);
  }

  useEffect(() => {
    let note = null;
    if(props.note) {
      note = props.note;
      setTitle(note.title);
      setValue(note.body);
      setId(note._id);
      setIsNewNote(false);
    } else if(props.history.location.state) {
      note = props.history.location.state.note;
      setTitle(note.title);
      setValue(note.body);
      setId(note._id);
      setIsNewNote(false);
    }
  }, [props]);

  return (
    <Grid container direction='column' >
      <Grid container direction='column' justify='center'>
        <Grid item xs={12}>
          <TextField
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            style={{
              marginBottom: '20px',
              width: '100%'}}/>
        </Grid>
      </Grid>
      <Slate 
        className="notepad" 
        editor={editor} 
        value={value} 
        onChange={newValue => {
          setValue(newValue)
          }} style={{position: 'absolute', overflow: 'hidden'}}>
        <Toolbar >
          <MarkButton format="bold" icon={<FormatBold/>} />
          <MarkButton format="italic" icon={<FormatItalic />} />
          <MarkButton format="underline" icon={<FormatUnderlined />} />
          <MarkButton format="code" icon={<Code />} />
          <BlockButton format="heading-one" icon={<LooksTwo />} />
          <BlockButton format="heading-two" icon={<Looks3 />} />
          <BlockButton format="block-quote" icon={<FormatQuote />} />
          <BlockButton format="numbered-list" icon={<FormatListNumbered />} />
          <BlockButton format="bulleted-list" icon={<FormatListBulleted />} />
        </Toolbar>
        <Editable
          style={{ 
            padding: '0px 10px 0px 10px', 
            marginBottom: '15px', 
            height: '200px',
            overflow: 'auto'}}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Enter your notes"
          spellCheck
          autoFocus/>
      </Slate>
      <Button
        variant='contained'
        color='primary'
        onClick={() => buttonClick()}>Save</Button>
    </Grid>
  )
}

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format)
  const isList = LIST_TYPES.includes(format)

  Transforms.unwrapNodes(editor, {
    match: n => LIST_TYPES.includes(n.type),
    split: true,
  })

  Transforms.setNodes(editor, {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  })

  if (!isActive && isList) {
    const block = { type: format, children: [] }
    Transforms.wrapNodes(editor, block)
  }
}

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: n => n.type === format,
  })

  return !!match
}

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}

const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>
    case 'heading-one':
      return <h1 {...attributes}>{children}</h1>
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>
    case 'list-item':
      return <li {...attributes}>{children}</li>
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>
    default:
      return <p {...attributes}>{children}</p>
  }
}

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.code) {
    children = <code>{children}</code>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  return <span {...attributes}>{children}</span>
}

const BlockButton = ({ format, icon }) => {
  const editor = useSlate()
  return (
    <Btn
      active={isBlockActive(editor, format)}
      onMouseDown={event => {
        event.preventDefault()
        toggleBlock(editor, format)
      }}
    >
      {icon}
    </Btn>
  )
}

const MarkButton = ({ format, icon }) => {
  const editor = useSlate()
  return (
    <Btn
      active={isMarkActive(editor, format)}
      onMouseDown={event => {
        event.preventDefault()
        toggleMark(editor, format)
      }}
    >
      {icon}
    </Btn>
  )
}

export default NotePad;