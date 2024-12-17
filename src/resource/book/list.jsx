import {
  CreateButton,
  Datagrid,
  ImageField,
  List,
  NumberField,
  Pagination,
  TextField,
  TopToolbar,
  SearchInput,
  TextInput,
  SelectInput,
  SortButton,
  EditButton,
} from "react-admin";
const postFilters = [
  <SearchInput source="q" alwaysOn />,
  <TextInput label="Title" source="title" defaultValue="Hello, World!" />,
  <SelectInput source="category" />,
];
const PostListActions = () => (
  <TopToolbar>
    {/* Nút Create */}

    <CreateButton />
    {/* Bạn có thể thêm các nút khác ở đây */}
    <EditButton />
    {/* <Button>Custom Action</Button> */}
  </TopToolbar>
);
export const BookList = (props) => {
  return (
    <>
      <List
        actions={<PostListActions />}
        pagination={<Pagination />}
        filters={postFilters}
      >
        <Datagrid>
          <TextField source="id" />
          <TextField source="title" />
          <TextField source="description" />
          <TextField source="totalPage" />
          <TextField source="rating" />
          <NumberField source="publishedYear" />
          <ImageField source="coverImageUrl" />
          <EditButton />
        </Datagrid>
      </List>
    </>
  );
};
