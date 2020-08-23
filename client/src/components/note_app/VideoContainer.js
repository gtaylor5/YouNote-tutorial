import React, {useState, useEffect} from 'react';
import { Grid, TextField, Card } from '@material-ui/core';
import YouTube from 'react-youtube';

const VideoContainer = (props) => {
  const [videoLink, setVideoLink] = useState("");
  const [videoTimestamp, setVideoTimestamp] = useState(0);

  const onChange = (e) => {
    props.setVideoLink(e.target.value);
    setVideoLink(e.target.value);
    console.log(e.target.value);
  }

  const getVideoId = () => {
    if(videoLink === "" || videoLink === undefined) return "";
    // www.youtube.com/watch?v=ID&...
    let splitVideoLink = videoLink.split("v=")[1]
    let ampersandLocation = splitVideoLink.indexOf("&");
    if(ampersandLocation !== -1) {
      return splitVideoLink.substring(0, ampersandLocation);
    }
    return splitVideoLink;
  }

  useEffect(() => {
    if(props.history.location.state) {
      const { note } = props.history.location.state;
      setVideoLink(note.videoLink);
      setVideoTimestamp(note.videoTimestamp);
      props.setVideoLink(note.videoLink);
    } else if(props.videoLink) {
      setVideoLink(props.videoLink)
      setVideoTimestamp(props.videoTimestamp)
      props.setVideoLink(props.videoLink);
    }
  }, [props]);

  return (
    <Grid container direction='column' justify='center' alignItems='center' component={Card} item xs={12} md={6} elevation={5}>
      <Grid container spacing={2} direction='column' justify='space-between' alignItems='stretch' style={{padding: '10px', height: '100%'}}>
      <Grid item xs={12}>
        <TextField 
          style={{width: '100%'}}
           value={videoLink}
           name='videoLink'
           placeholder='Enter a YouTube URL'
           variant='outlined'
           onChange={(e) => onChange(e)}
        />
      </Grid>
      <Grid item xs={12}>
        <YouTube
          ref={props.videoRef}
          videoId={getVideoId()}
          opts={{
            width: '100%',
            playerVars: {
              start: parseInt(videoTimestamp)
            }
          }}
        />
      </Grid>
      </Grid>
    </Grid>
  );
}

export default VideoContainer;