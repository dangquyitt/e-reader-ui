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
          <TextInput source="author" />
          <SelectInput
            source="availability"
            choices={[
              { id: "in_stock", name: "In stock" },
              { id: "out_of_stock", name: "Out of stock" },
              { id: "out_of_print", name: "Out of print" },
            ]}
          />
          <FileInput source="attachments">
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
