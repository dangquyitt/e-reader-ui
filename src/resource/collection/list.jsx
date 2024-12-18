import { Datagrid, List, TextField } from "react-admin";

export const CollectionList = (props) => {
  return (
    <List>
      <Datagrid>
        <TextField source="user_id" />
        <TextField source="name" />
      </Datagrid>
    </List>
  );
};
