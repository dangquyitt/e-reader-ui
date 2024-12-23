import { ChipField, Datagrid, List, TextField, TextInput } from "react-admin";
const filters = [<TextInput label="Name" source="name" alwaysOn />];
export const TagList = (props) => {
  return (
    <List
      filters={filters}
      empty={false}
      sort={{ field: "createdAt", order: "DESC" }}
    >
      <Datagrid
        bulkActionButtons={false}
        rowClick={(id) => `/books?filter=${JSON.stringify({ tagIds: [id] })}`}
      >
        <ChipField source="name" />
      </Datagrid>
    </List>
  );
};
