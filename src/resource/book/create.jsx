import * as React from "react";
import {
  CreateBase,
  SimpleForm,
  TextInput,
  SelectInput,
  Title,
  FileInput,
  FileField,
  ImageInput,
  ImageField,
  ReferenceArrayInput,
  AutocompleteArrayInput,
  useNotify,
  useDataProvider,
} from "react-admin";
import { Card } from "@mui/material";
import { useState } from "react";
import { EpubView } from "react-reader";
import Epub from "epubjs";

export const BookCreate = () => {
  const notify = useNotify();
  const dataProvider = useDataProvider();
  const [title, setTitle] = useState("");
  const [totalPages, setTotalPages] = useState("");
  const [coverImage, setCoverImage] = useState("");

  const handleFileUpload = async (file) => {
    const url = window.URL.createObjectURL(file);
    const book = Epub(url);

    // Đọc metadata
    const metadata = await book.loaded.metadata;
    setTitle(metadata.title);

    // Đọc ảnh bìa
    const coverBlob = await book.coverUrl();
    if (coverBlob) {
      setCoverImage(coverBlob);
    }

    // Loop qua các phần nội dung để đếm "trang ảo"
    await book.locations.generate(1000); // Tạo 1000 điểm tham chiếu
    const totalVirtualPages = book.locations.length();
    setTotalPages(totalVirtualPages.toString());

    // Duyệt qua nội dung từng trang nếu cần
    book.rendition.hooks.render.register((sectionRender) => {
      console.log("Section Rendered:", sectionRender);
    });

    // Xóa URL tạm
    URL.revokeObjectURL(url);
  };

  const handleCreateTag = async (name) => {
    console.log(name);

    try {
      const resp = await dataProvider.create("tags", { data: { name } });
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
            <TextInput source="total page" />
            <TextInput source="rating" />
            <TextInput source="published year" />
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
        </Card>
      </div>
    </CreateBase>
  );
};
