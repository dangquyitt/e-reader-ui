import {
  EditBase,
  SelectInput,
  SimpleForm,
  TextInput,
  Title,
} from "react-admin";
import { Card, CardContent, Container } from "@mui/material";

export const BookEdit = () => (
  <EditBase>
    <Container>
      <Title title="Book Edition" />
      <Card>
        <CardContent>
          <SimpleForm>
            <TextInput source="id" />
            <TextInput source="title" />
            <TextInput source="description" />
            <TextInput source="totalPage" />
            <TextInput source="rating" />
            <TextInput source="publishedYear" />
            <TextInput source="coverImageUrl" />
          </SimpleForm>
        </CardContent>
      </Card>
    </Container>
  </EditBase>
);
