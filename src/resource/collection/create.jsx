import * as React from "react";
import { CreateBase, SimpleForm, TextInput, Title } from "react-admin";
import { Card } from "@mui/material";

export const CollectionCreate = () => (
  <CreateBase>
    <div>
      <Title title="Book Creation" />
      <Card>
        <SimpleForm>
          <TextInput source="name" />
        </SimpleForm>
      </Card>
    </div>
  </CreateBase>
);
