import {
  Datagrid,
  ImageField,
  List,
  TextField,
  EditButton,
  RichTextField,
  ReferenceField,
  DeleteButton,
} from "react-admin";

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
