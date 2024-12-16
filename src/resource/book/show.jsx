import { Show, TabbedShowLayout, TextField, useShowContext } from "react-admin";

export const BookShow = () => {
  <Show>
    <TabbedShowLayout>
      <TabbedShowLayout.Tab label="Infomation">
        <TextField source="id" />
      </TabbedShowLayout.Tab>
      <TabbedShowLayout.Tab label="Comments" path="body">
        <TextField source="id" />
        <TextField source="title" />
        <TextField source="description" />
      </TabbedShowLayout.Tab>
    </TabbedShowLayout>
  </Show>;
};
