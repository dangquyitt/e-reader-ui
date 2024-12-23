import {
  Datagrid,
  List,
  Pagination,
  TextField,
  TopToolbar,
  SearchInput,
  TextInput,
  SelectInput,
  EditButton,
  ReferenceField,
  ImageField,
  DeleteButton,
} from "react-admin";
const bookFilters = [
  <SearchInput source="q" alwaysOn />,
  <TextInput label="Title" source="title" defaultValue="Hello, World!" />,
  <SelectInput source="category" />,
];

export const PriceList = (props) => {
  return (
    <>
      <List pagination={<Pagination />} filters={bookFilters}>
        <Datagrid
          bulkActionButtons={false}
          rowClick={(id, resource, record) => {
            return `/books/${record.bookId}/show`;
          }}
        >
          <ReferenceField source="bookId" reference="books">
            <ImageField source="coverImageUrl" />
            <TextField source="title" />
          </ReferenceField>
          <DeleteButton mutationMode="optimistic" />
        </Datagrid>
      </List>
    </>
  );
};
