import * as React from "react";
import {
  CreateBase,
  SimpleForm,
  TextInput,
  Title,
  FileInput,
  FileField,
  ImageInput,
  ImageField,
  ReferenceArrayInput,
  AutocompleteArrayInput,
  useNotify,
  useDataProvider,
  NumberInput,
} from "react-admin";
import { Card } from "@mui/material";

export const BookCreate = () => {
  const notify = useNotify();
  const dataProvider = useDataProvider();

  const handleCreateTag = async (name) => {
    try {
      const resp = await dataProvider.create("tags", { data: { name } });
      return resp.data;
    } catch (error) {
      notify(error.response.data.message, { type: "error" });
    }
  };

  const handleCreateAuthor = async (name) => {
    try {
      const resp = await dataProvider.create("authors", { data: { name } });
      return resp.data;
    } catch (error) {
      notify(error.response.data.message, { type: "error" });
    }
  };
  return (
    <CreateBase>
      <div>
        <Title title="Book Creation" />
        <Card>
          <SimpleForm>
            <TextInput source="title" />
            <TextInput source="description" />
            <NumberInput source="totalPage" />
            <NumberInput source="published year" />
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
            <ReferenceArrayInput source="authorIds" reference="authors">
              <AutocompleteArrayInput
                createItemLabel="Add a new author: %{item}"
                onCreate={handleCreateAuthor}
                filterToQuery={(searchText) => ({ name: searchText })}
              />
            </ReferenceArrayInput>
            <ReferenceArrayInput source="tagIds" reference="tags">
              <AutocompleteArrayInput
                createItemLabel="Add a new tag: %{item}"
                onCreate={handleCreateTag}
                filterToQuery={(searchText) => ({ name: searchText })}
              />
            </ReferenceArrayInput>
          </SimpleForm>
        </Card>
      </div>
    </CreateBase>
  );
};
