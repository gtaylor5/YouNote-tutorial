import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import VideoContainer from './VideoContainer';
import NoteContainer from './NoteContainer';
import { withRouter } from 'react-router-dom';

const VideoNoteContainer = (props) => {
  const [videoLink, setVideoLink] = useState("");
  const [note, setNote] = useState(null);
  const videoRef = React.createRef();

  let urlBase = '/api/notes/';

  const save = async (note) => {
    const { id, title, body, author, type } = note;
    
    let url = urlBase;
    if(type === 'PUT') {
      url += id;
    }

    const time = await videoRef.current.internalPlayer.getCurrentTime();
    let reqBody = JSON.stringify({
      title: title,
      body: body,
      author: author,
      videoLink: videoLink,
      videoTimestamp: time
    });

    console.log(reqBody);

    const response = await fetch(url, {
      method: type,
      headers: {
        'content-type': 'application/json',
        'x-auth-token': localStorage.getItem('token')
      },
      body: reqBody
    });

    const json = await response.json();
    setNote(json);
  }

  return (
    <>
      <Grid 
        container 
        direction='row' 
        justify='space-around' 
        alignItems='center' 
        style={{maxHeight: '100%', height: '100%', padding: '10px'}}>
          <VideoContainer videoRef={videoRef} setVideoLink={setVideoLink} {...props}/>
          <NoteContainer note={note} {...props} handleSave={(note) => save(note)}/>
      </Grid>
    </>
  )

}

export default withRouter(VideoNoteContainer);