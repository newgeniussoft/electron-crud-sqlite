import React from 'react';
import './ItemList.css';
import { Button, Table, IconButton } from 'rsuite';
import { mockUsers } from './mock';
import EditIcon from '@rsuite/icons/Edit';
import 'rsuite/dist/rsuite.min.css';

const { Column, HeaderCell, Cell } = Table;
const data = mockUsers(20);

const ItemList = ({ items, onEdit, onDelete }) => {
  return (
    <div className="items-container">
      
    <Table
      height={400}
      data={items}
      onRowClick={rowData => {
        console.log(rowData);
      }}
    >
      <Column width={60} align="center" fixed resizable>
        <HeaderCell>Id</HeaderCell>
        <Cell dataKey="id" />
      </Column>

      <Column width={150} resizable>
        <HeaderCell>Titre</HeaderCell>
        <Cell dataKey="title" />
      </Column>

      <Column flexGrow={1} resizable>
        <HeaderCell>Description</HeaderCell>
        <Cell dataKey="description" />
      </Column>

      <Column  width={300} fixed="right">
        <HeaderCell>...</HeaderCell>

        <Cell style={{ padding: '6px' }}>
          {rowData => (
             <>
            <IconButton onClick={() => onEdit(rowData)} icon={<EditIcon />}>Modifier</IconButton>
            <Button color="red" appearance="primary" onClick={() => onDelete(rowData.id)}>
              Supprimer
            </Button>
            </>
          )}
        </Cell>
      </Column>
    </Table>
    </div>
  );
};

export default ItemList;
