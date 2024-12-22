import { ChipField, Datagrid, DateField, List, TextField } from "react-admin";

export const TagList = (props) => {
  return (
    <List empty={false} sort={{ field: "createdAt", order: "DESC" }}>
      <Datagrid bulkActionButtons={false}>
        <TextField source="id" />
        <ChipField source="name" />
      </Datagrid>
    </List>
  );
};
