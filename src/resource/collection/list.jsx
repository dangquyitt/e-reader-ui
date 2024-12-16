import { Datagrid, List, TextField } from "react-admin";

export const CollectionList = (props) => {
  return (
    <List>
      <Datagrid>
        <TextField source="id" />
      </Datagrid>
    </List>
  );
};
