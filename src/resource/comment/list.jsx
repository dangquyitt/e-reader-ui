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
  EditButton,
  FunctionField,
  ChipField,
  RichTextField,
  ReferenceField,
  DeleteButton,
} from "react-admin";
import Rating from "@mui/material/Rating";

export const CommentList = (props) => {
  return (
    <>
      <List sort={{ field: "createdAt", order: "DESC" }}>
        <Datagrid bulkActionButtons={false}>
          <ReferenceField source="bookId" reference="books">
            <ImageField source="coverImageUrl" />
            <TextField source="title" />
          </ReferenceField>
          <RichTextField source="content" />
          <EditButton />
          <DeleteButton />
        </Datagrid>
      </List>
    </>
  );
};
