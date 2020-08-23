import React from 'react';
import Table from '@material-ui/core/Table';
import NoteTableBody from './NoteTableBody'
import NoteTableHeader from './NoteTableHeader';

const NoteTable = (props) => {
  const tableHeaderNames = ["#", "Note Title", "Last Modified"]

  return (
    <Table>
      <NoteTableHeader names={tableHeaderNames} style={{width: '100%'}}/>
      <NoteTableBody data={props} style={{width: '100%'}}/>
    </Table>
  )
}

export default NoteTable;