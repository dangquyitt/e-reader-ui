import { Datagrid, List, TextField } from "react-admin";

export const FavoriteList = (props) => {
  return (
    <List>
      <Datagrid>
        <TextField source="id" />
      </Datagrid>
    </List>
  );
};
