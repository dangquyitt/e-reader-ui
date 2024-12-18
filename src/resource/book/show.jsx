import {
  Show,
  TabbedShowLayout,
  TextField,
  SimpleForm,
  TextInput,
  NumberField,
  ImageField,
  ArrayField,
  Datagrid,
} from "react-admin";
import React, { useState, useEffect } from "react";
import { useDataProvider } from "react-admin";
import { AddToFavoritesButton } from "../../components/AddToFavorite/AddToFavoritesButton";
const mockBookData = {
  id: 1,
  title: "The Great Book",
  description: "A fascinating journey through time and space.",
  totalPage: 350,
  rating: 4.5,
  publishedYear: 2022,
  coverImageUrl: "https://via.placeholder.com/150",
  comments: [
    { id: 1, text: "Amazing read! The plot twists were incredible." },
    { id: 2, text: "I couldn't put it down! A must-read for sci-fi fans." },
    {
      id: 3,
      text: "The book started slow but picked up pace towards the end.",
    },
    { id: 4, text: "Interesting characters, but the ending felt rushed." },
    {
      id: 5,
      text: "A wonderful exploration of human nature. Highly recommend!",
    },
  ],
};
export const BookShow = () => {
  const dataProvider = useDataProvider();
  const [comments, setComments] = useState([]);
  const fetchComments = async () => {
    try {
      const { data } = await dataProvider.getList("comments", {
        pagination: { page: 1, perPage: 10 },
        sort: { field: "createdAt", order: "DESC" },
        filter: {},
      });
      setComments(data); // Cập nhật danh sách bình luận
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  // Gọi API lấy danh sách bình luận khi component được render
  useEffect(() => {
    fetchComments();
  }, []);
  const handleSave = async (values) => {
    try {
      await dataProvider.create("comments", { data: values });
      alert("Comment added successfully!");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };
  return (
    <>
      <Show>
        <TabbedShowLayout>
          <TabbedShowLayout.Tab label="Infomation">
            <TextField source="id" sx={{ fontSize: "16px" }} />
            <AddToFavoritesButton />

            <TextField source="title" />
            <TextField source="description" />
            <TextField source="totalPage" />
            <TextField source="rating" />
            <NumberField source="publishedYear" />
            <ImageField source="coverImageUrl" />
          </TabbedShowLayout.Tab>
          <TabbedShowLayout.Tab label="Comments" path="body">
            <ArrayField source="comments" record={mockBookData}>
              <Datagrid bulkActionButtons={false}>
                <TextField source="id" />
                <TextField source="text" />
              </Datagrid>
            </ArrayField>
            <SimpleForm onSubmit={handleSave}>
              <TextInput source="comment" label="Add a Comment" fullWidth />
              {/* You can add other fields like rating for the comment, etc. */}
            </SimpleForm>
          </TabbedShowLayout.Tab>
        </TabbedShowLayout>
      </Show>
    </>
  );
};
