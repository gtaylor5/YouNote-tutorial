import React from 'react';
import TableBody from '@material-ui/core/TableBody';
import NoteTableRow from './NoteTableRow';

const NoteTableBody = (props) => {
  let counter = 0;
  const { data } = props;
  return (
    <TableBody>
      { data ? Object.keys(data).map(key => {
        let note = data[key];
        if(!note.title) return null;
        return (
          <NoteTableRow key={++counter} itemNumber={counter} note={note}/>
        );
      }) : null}
    </TableBody>
  ) 
}

export default NoteTableBody;