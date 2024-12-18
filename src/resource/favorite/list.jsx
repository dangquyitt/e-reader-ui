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
const PostListActions = () => (
  <TopToolbar>
    {/* Nút Create */}
    {/* Bạn có thể thêm các nút khác ở đây */}
    <EditButton />
    {/* <Button>Custom Action</Button> */}
  </TopToolbar>
);
export const FavoriteList = (props) => {
  return (
    <>
      <List
        actions={<PostListActions />}
        pagination={<Pagination />}
        filters={bookFilters}
      >
        <Datagrid
          rowClick={(id, resource, record) => {
            return `/books/${record.bookId}/show`;
          }}
        >
          <ReferenceField source="bookId" reference="books">
            <ImageField source="coverImageUrl" />
            <TextField source="title" />
          </ReferenceField>
          <DeleteButton />
        </Datagrid>
      </List>
    </>
  );
};
