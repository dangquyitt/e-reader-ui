import {
  Datagrid,
  ImageField,
  List,
  NumberField,
  TextField,
} from "react-admin";

export const BookList = (props) => {
  return (
    <List>
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
  );
};
