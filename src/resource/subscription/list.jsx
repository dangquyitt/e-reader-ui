import { Datagrid, DateField, List, TextField } from "react-admin";

export const SubscriptionList = (props) => {
  return (
    <List sort={{ field: "createdAt", order: "DESC" }}>
      <Datagrid bulkActionButtons={false}>
        <TextField source="id" />
        <DateField source="createdAt" />
        <DateField source="startTime" showTime />
        <DateField source="endTime" showTime />
      </Datagrid>
    </List>
  );
};
