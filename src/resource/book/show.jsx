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
  ReferenceField,
  Button,
} from "react-admin";
import React, { useState, useEffect } from "react";
import { useDataProvider, WithRecord } from "react-admin";
import { AddToFavoritesButton } from "../../components/AddToFavorite/AddToFavoritesButton";
import { useNavigate } from "react-router-dom";
import { useStore, useRecordContext } from "react-admin";

export const BookShow = () => {
  const dataProvider = useDataProvider();
  const [comments, setComments] = useState([]);
  const BookAuthor = () => {
    const record = useRecordContext();
    const [, setFileUrl] = useStore("fileUrl", null); // useStore(key, initialValue)

    useEffect(() => {
      if (record && record.fileUrl) {
        setFileUrl(record.fileUrl); // Lưu fileUrl vào store chỉ khi record thay đổi
      }
    }, [record, setFileUrl]); // Lưu fileUrl vào store

    console.log(record.fileUrl);
    return null;
  };

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
            <BookAuthor />
          </TabbedShowLayout.Tab>
          <TabbedShowLayout.Tab label="Comments" path="body">
            <ArrayField source="comments">
              <Datagrid bulkActionButtons={false}>
                <TextField source="id" />
                <TextField source="content" />
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
