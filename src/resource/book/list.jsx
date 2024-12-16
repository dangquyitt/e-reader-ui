import {
  CreateButton,
  Datagrid,
  ImageField,
  List,
  NumberField,
  Pagination,
  TextField,
  TopToolbar,
} from "react-admin";
const PostListActions = () => (
  <TopToolbar>
    {/* Nút Create */}
    <CreateButton />
    {/* Bạn có thể thêm các nút khác ở đây */}
    {/* <Button>Custom Action</Button> */}
  </TopToolbar>
);
export const BookList = (props) => {
  return (
    <>
      <List actions={<PostListActions />} pagination={<Pagination />}>
        <Datagrid>
          <TextField source="id" />
          <TextField source="title" />
          <TextField source="description" />
          <TextField source="totalPage" />
          <TextField source="rating" />
          <NumberField source="publishedYear" />
          <ImageField source="coverImageUrl" />
        </Datagrid>
      </List>
    </>
  );
};
