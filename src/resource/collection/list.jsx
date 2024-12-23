import { Datagrid, List, TextField, TextInput } from "react-admin";

const filters = [<TextInput label="Name" source="name" alwaysOn />];
export const CollectionList = (props) => {
  return (
    <List filters={filters}>
      <Datagrid
        bulkActionButtons={false}
        rowClick={(id) =>
          `/books?filter=${JSON.stringify({ collectionIds: [id] })}`
        }
      >
        <TextField source="name" />
      </Datagrid>
    </List>
  );
};
