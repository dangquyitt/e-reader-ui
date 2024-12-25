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
  ChipField,
  SimpleList,
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
      <List pagination={<Pagination />} filters={filters}>
        <Datagrid bulkActionButtons={false}>
          <TextField source="id" />
          <DateField source="effectiveDate" />
          <NumberField source="amount" />
          <TextField source="currency" />
          <ReferenceField source="planId" reference="plans" />
          <ArrayField source="features">
            <SingleFieldList>
              <FunctionField
                render={(record) => {
                  console.log(record);
                }}
              />
            </SingleFieldList>
          </ArrayField>
        </Datagrid>
      </List>
    </>
  );
};
