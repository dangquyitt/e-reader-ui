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
} from "react-admin";
import Rating from "@mui/material/Rating";

const postFilters = [
  <SearchInput source="q" alwaysOn />,
  <TextInput label="Title" source="title" alwaysOn />,
  <SelectInput source="category" />,
];

export const BookList = (props) => {
  return (
    <>
      <List filters={postFilters}>
        <Datagrid bulkActionButtons={false}>
          <ImageField source="coverImageUrl" />
          <TextField source="id" />
          <TextField source="title" />
          <RichTextField source="description" />
          <TextField source="totalPage" />
          <FunctionField
            source="rating"
            render={(record) => (
              <Rating defaultValue={record.rating} precision={0.1} readOnly />
            )}
          />
          <TextField source="publishedYear" />
        </Datagrid>
      </List>
    </>
  );
};
