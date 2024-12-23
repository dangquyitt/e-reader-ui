import { Show, TabbedShowLayout, TextField } from "react-admin";

export const CommentShow = () => {
  return (
    <>
      <Show>
        <TabbedShowLayout>
          <TabbedShowLayout.Tab label="Infomation">
            <TextField source="id" sx={{ fontSize: "16px" }} />
            <TextField source="email" />
            <TextField source="name" />
          </TabbedShowLayout.Tab>
        </TabbedShowLayout>
      </Show>
    </>
  );
};
