import { Datagrid, List, TextField, TextInput, DateField } from "react-admin";

const filters = [<TextInput label="Name" source="name" alwaysOn />];

export const AuthorList = (props) => {
  return (
    <>
      <List filters={filters}>
        <Datagrid
          bulkActionButtons={false}
          rowClick={(id) =>
            `/books?filter=${JSON.stringify({ authorIds: [id] })}`
          }
        >
          <TextField source="id" />
          <DateField source="createdAt" />
          <DateField source="updatedAt" />
          <TextField source="name" />
        </Datagrid>
      </List>
    </>
  );
};
