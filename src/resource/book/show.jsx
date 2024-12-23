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
  useRefresh,
  ReferenceField,
  FunctionField,
  useStore,
  TextInput,
  SingleFieldList,
  DateField,
} from "react-admin";
import React, { useState, useEffect } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDataProvider } from "react-admin";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  createBookCollection,
  deleteBookCollection,
} from "../../services/bookCollection";
import { Box, IconButton, Rating, useTheme } from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { createFavorite, deleteFavorite } from "../../services/favorite";
import { useNavigate } from "react-router-dom";

const CustomToolbar = (props) => (
  <Toolbar {...props}>
    <SaveButton />
  </Toolbar>
);

export const BookShow = (props) => {
  const notify = useNotify();
  const { record } = useShowController();
  const dataProvider = useDataProvider();
  const refresh = useRefresh();
  const navigate = useNavigate();
  const [bookId, setBookId] = useState(null);
  const [currentReadingBook, setCurrentReadingBook] = useStore(
    "currentReadingBook",
    {}
  );

  useEffect(() => {
    if (record) {
      setBookId(record.id);
    }
  }, [record]);

  const handleClickRead = (e) => {
    setCurrentReadingBook(record);
    navigate("/reader");
  };

  const handleAddBookToCollections = async (data) => {
    for (const collectionId of data?.collectionIds || []) {
      try {
        await createBookCollection(bookId, collectionId);
      } catch (error) {
        notify(error.response.data.message, { type: "error" });
      }
    }
    refresh();
  };

  const handleCreateComment = async (data) => {
    try {
      const resp = await dataProvider.create("comments", {
        data: {
          content: data.comment,
          bookId: bookId,
        },
      });
      notify(resp.message, { type: "success" });
    } catch (error) {
      notify(error.response.data.message, { type: "error" });
    }
    refresh();
  };

  const handleLikeUnlikeBook = async () => {
    try {
      if (record.isFavorite) {
        const resp = await deleteFavorite(bookId);
        notify(resp.message, { type: "success" });
        return;
      }
      const resp = await createFavorite(bookId);
      notify(resp.message, { type: "success" });
    } catch (error) {
      notify(error.response.data.message, { type: "error" });
    }
  };

  const handleDeleteBookCollection = async (collectionId) => {
    try {
      const resp = await deleteBookCollection(bookId, collectionId);
      notify(resp.message, { type: "success" });
    } catch (error) {
      notify(error.response.data.message, { type: "error" });
    }
  };

  const handleCreateCollection = async (name) => {
    try {
      const resp = await dataProvider.create("collections", { data: { name } });
      return resp.data;
    } catch (error) {
      notify(error.response.data.message, { type: "error" });
    }
  };

  return (
    <Show>
      <TabbedShowLayout>
        <TabbedShowLayout.Tab label="Infomation">
          <FunctionField
            render={(rc) => {
              return (
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Box>
                    <FunctionField
                      render={(record) => (
                        <Rating
                          defaultValue={record.rating}
                          precision={0.1}
                          readOnly
                        />
                      )}
                    />
                  </Box>
                  <Box>
                    <Button
                      onClick={() => {
                        handleLikeUnlikeBook();
                        refresh();
                      }}
                      label={"Like"}
                      startIcon={
                        <FavoriteIcon
                          style={{
                            color: rc.isFavorite ? "red" : "gray",
                            transition: "color 0.3s ease",
                          }}
                        />
                      }
                    />
                    <Button
                      label={"Read"}
                      onClick={handleClickRead}
                      startIcon={
                        <MenuBookIcon
                          sx={{
                            color: "primary.main",
                          }}
                          style={{
                            transition: "color 0.3s ease",
                          }}
                        />
                      }
                    />
                  </Box>
                </Box>
              );
            }}
          />{" "}
          <ImageField source="coverImageUrl" />
          <ArrayField source="tags">
            <SingleFieldList linkType={false}>
              <ChipField source="name" size="small" />
            </SingleFieldList>
          </ArrayField>
          <TextField source="id" sx={{ fontSize: "16px" }} />
          <TextField source="title" />
          <TextField source="description" />
          <TextField source="totalPage" />
          <NumberField source="publishedYear" />
        </TabbedShowLayout.Tab>

        <TabbedShowLayout.Tab label="Comments" path="comments">
          <ArrayField source="comments">
            <Datagrid bulkActionButtons={false}>
              <TextField source="content" />
              <DateField source="createdAt" showTime />
            </Datagrid>
          </ArrayField>
          <SimpleForm
            toolbar={<CustomToolbar />}
            onSubmit={handleCreateComment}
          >
            <TextInput source="comment" label="Add a Comment" fullWidth />
          </SimpleForm>
        </TabbedShowLayout.Tab>

        <TabbedShowLayout.Tab label="Collections" path="collections">
          <ArrayField source="collections">
            <Datagrid bulkActionButtons={false} rowClick>
              <ChipField source="name" />
              <FunctionField
                render={(rc) => (
                  <IconButton>
                    <RemoveIcon
                      sx={{ color: "error.main" }}
                      onClick={() => {
                        handleDeleteBookCollection(rc.id);
                        refresh();
                      }}
                    />
                  </IconButton>
                )}
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
                filterToQuery={(searchText) => ({
                  name: searchText,
                  bookIdNe: bookId,
                })}
              />
            </ReferenceArrayInput>
          </SimpleForm>
        </TabbedShowLayout.Tab>
      </TabbedShowLayout>
    </Show>
  );
};
