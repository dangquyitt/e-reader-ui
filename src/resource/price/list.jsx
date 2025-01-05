import { Chip, Typography } from "@mui/material";
import {
  Datagrid,
  List,
  Pagination,
  TextField,
  ReferenceField,
  DateField,
  NumberField,
  ReferenceArrayInput,
  AutocompleteArrayInput,
  ArrayField,
  SingleFieldList,
  FunctionField,
} from "react-admin";
const filters = [
  <ReferenceArrayInput source="planIds" reference="plans" alwaysOn>
    <AutocompleteArrayInput
      filterToQuery={(searchText) => ({ name: searchText })}
    />
  </ReferenceArrayInput>,
];

export const PriceList = (props) => {
  return (
    <>
      <List
        pagination={<Pagination />}
        filters={filters}
        sort={{ field: "effectiveDate", order: "DESC" }}
      >
        <Datagrid bulkActionButtons={false}>
          <TextField source="id" />
          <DateField source="effectiveDate" showTime />
          <NumberField source="amount" />
          <TextField source="currency" />
          <FunctionField
            label="Duration"
            render={(record) => {
              return (
                <Typography
                  component="span"
                  variant="body2"
                >{`${record.duration} ${record.durationUnit}`}</Typography>
              );
            }}
          />
          <ReferenceField source="planId" reference="plans" />
          <ArrayField source="features">
            <SingleFieldList>
              <FunctionField
                render={(record) => {
                  return <Chip label={record} />;
                }}
              />
            </SingleFieldList>
          </ArrayField>
        </Datagrid>
      </List>
    </>
  );
};
