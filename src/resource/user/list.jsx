import React from "react";
import { Datagrid, List, EditButton, TextField } from "react-admin";
export const UserList = (props) => {
  return (
    <>
      <List>
        <Datagrid>
          <TextField source="id" />
          <TextField source="email" />
          <TextField source="name" />
          <EditButton />
        </Datagrid>
      </List>
    </>
  );
};
