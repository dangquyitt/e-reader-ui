import {
  AutocompleteArrayInput,
  EditBase,
  FileField,
  FileInput,
  ImageField,
  ImageInput,
  NumberInput,
  ReferenceArrayInput,
  SimpleForm,
  TextInput,
  Title,
} from "react-admin";
import { Card, CardContent, Container } from "@mui/material";

export const BookEdit = () => {
  const handleCreateTag = async (name) => {
    try {
      const resp = await dataProvider.create("tags", { data: { name } });
      return resp.data;
    } catch (error) {
      notify(error.response.data.message, { type: "error" });
    }
  };
  return (
    <EditBase mutationMode="optimistic">
      <Container>
        <Title title="Book Edition" />
        <Card>
          <CardContent>
            <SimpleForm>
              <TextInput source="title" />
              <TextInput source="description" />
              <NumberInput source="totalPage" />
              <NumberInput source="publishedYear" />
              <FileInput
                source="fileBook"
                label="File book"
                accept={{ "application/epub+zip": [".epub"] }}
              >
                <FileField source="src" title="title" />
              </FileInput>
              <ImageInput
                source="fileCoverImage"
                label="Cover image"
                accept={{ "image/*": [".png", ".jpg"] }}
              >
                <ImageField source="src" title="title" />
              </ImageInput>
              <ReferenceArrayInput source="tagIds" reference="tags">
                <AutocompleteArrayInput
                  createItemLabel="Add a new tag: %{item}"
                  onCreate={handleCreateTag}
                  filterToQuery={(searchText) => ({ name: searchText })}
                />
              </ReferenceArrayInput>
            </SimpleForm>
          </CardContent>
        </Card>
      </Container>
    </EditBase>
  );
};
