import {
  Datagrid,
  ImageField,
  List,
  TextField,
  TextInput,
  FunctionField,
  RichTextField,
  ReferenceArrayInput,
  AutocompleteArrayInput,
} from "react-admin";
import Rating from "@mui/material/Rating";

const filters = [
  // <TextInput label="Search" source="q" alwaysOn />,
  <TextInput label="Title" source="title" alwaysOn />,
  <ReferenceArrayInput source="collectionIds" reference="collections" alwaysOn>
    <AutocompleteArrayInput
      filterToQuery={(searchText) => ({ name: searchText })}
    />
  </ReferenceArrayInput>,
  <ReferenceArrayInput source="tagIds" reference="tags" alwaysOn>
    <AutocompleteArrayInput
      filterToQuery={(searchText) => ({ name: searchText })}
    />
  </ReferenceArrayInput>,
  <ReferenceArrayInput source="authorIds" reference="authors" alwaysOn>
    <AutocompleteArrayInput
      filterToQuery={(searchText) => ({ name: searchText })}
    />
  </ReferenceArrayInput>,
];

export const BookList = (props) => {
  return (
    <List filters={filters}>
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
  );
};
