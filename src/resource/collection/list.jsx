import { Datagrid, List, TextField } from "react-admin";

export const CollectionList = (props) => {
  return (
    <List>
      <Datagrid bulkActionButtons={false}>
        <TextField source="name" />
      </Datagrid>
    </List>
  );
};
