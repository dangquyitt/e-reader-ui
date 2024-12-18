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
} from "react-admin";
import { Card } from "@mui/material";

export const BookCreate = () => (
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
            source="attachments"
            onChange={(files) => {
              console.log(files);
              const file = files.rawFile;
              console.log(file); // file cần được lấy từ files[0]
              const url = URL.createObjectURL(file);
              setFileUrl(url);
            }}
          >
            <FileField source="src" title="title" />
          </FileInput>
          <ImageInput source="pictures" label="Related pictures">
            <ImageField source="src" title="title" />
          </ImageInput>
        </SimpleForm>
      </Card>
    </div>
  </CreateBase>
);
