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
          </SimpleForm>
        </CardContent>
      </Card>
    </Container>
  </EditBase>
);
