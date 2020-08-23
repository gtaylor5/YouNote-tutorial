import React, {Fragment} from 'react';
import TableCell from '@material-ui/core/TableCell';

const NoteTableHeader = ({names}) => {
  return (
    <Fragment>
      {names.map(text => {
        return (
          <TableCell key={text} align='left' variant='head'>
            {text}
          </TableCell>
        )
      })}
    </Fragment>
  )
}

export default NoteTableHeader;