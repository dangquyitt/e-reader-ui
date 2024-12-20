import {
  Show,
  TabbedShowLayout,
  TextField,
  SimpleForm,
  NumberField,
  ImageField,
  ArrayField,
  Datagrid,
  Button,
  ReferenceArrayInput,
  ChipField,
  useShowController,
  DeleteButton,
  Toolbar,
  SaveButton,
  AutocompleteArrayInput,
  useNotify,
} from "react-admin";
import React, { useState, useEffect } from "react";
import { useDataProvider } from "react-admin";
import { AddToFavoritesButton } from "../../components/AddToFavorite/AddToFavoritesButton";
import { createBookCollection } from "../../services/bookCollection";

const CustomToolbar = (props) => (
  <Toolbar {...props}>
    <SaveButton /> {/* Không thêm DeleteButton */}
  </Toolbar>
);

export const BookShow = (props) => {
  const notify = useNotify();
  const { record } = useShowController();
  const dataProvider = useDataProvider();

  const handleAddBookToCollections = async (data) => {
    for (const collectionId of data?.collectionIds || []) {
      try {
        await createBookCollection(bookId, collectionId);
      } catch (error) {}
    }
  };

  const handleDeleteBookCollection = (data) => {};

  const handleCreateCollection = async (name) => {
    try {
      const resp = await dataProvider.create("collections", { data: { name } });
      return resp.data.name;
    } catch (error) {}
  };

  return (
    <Show>
      <TabbedShowLayout>
        <TabbedShowLayout.Tab label="Infomation">
          <TextField source="id" sx={{ fontSize: "16px" }} />
          <AddToFavoritesButton />
          <Button
            label="Go to Detail"
            onClick={(e) => {
              e.stopPropagation(); // Ngăn sự kiện click lan ra ngoài
            }}
          />
          <TextField source="title" />
          <TextField source="description" />
          <TextField source="totalPage" />
          <TextField source="rating" />
          <NumberField source="publishedYear" />
          <ImageField source="coverImageUrl" />
        </TabbedShowLayout.Tab>
        {/* <TabbedShowLayout.Tab label="Comments" path="body">
            <ArrayField source="comments">
              <Datagrid bulkActionButtons={false}>
                <TextField source="id" />
                <TextField source="content" />
              </Datagrid>
            </ArrayField>
            <SimpleForm onSubmit={handleSave}>
              <TextInput source="comment" label="Add a Comment" fullWidth />
            </SimpleForm>
          </TabbedShowLayout.Tab> */}
        <TabbedShowLayout.Tab label="Collections" path="body">
          <ArrayField source="collections">
            <Datagrid bulkActionButtons={false} rowClick>
              <ChipField source="name" label="Name" />
              <DeleteButton
                onClick={(data) => {
                  console.log(data);
                }}
              />
            </Datagrid>
          </ArrayField>
          <SimpleForm
            toolbar={<CustomToolbar />}
            onSubmit={handleAddBookToCollections}
          >
            <ReferenceArrayInput source="collectionIds" reference="collections">
              <AutocompleteArrayInput
                createItemLabel="Add a new collection: %{item}"
                onCreate={handleCreateCollection}
                filterToQuery={(searchText) => ({ name: searchText })}
              />
            </ReferenceArrayInput>
          </SimpleForm>
        </TabbedShowLayout.Tab>
      </TabbedShowLayout>
    </Show>
  );
};
