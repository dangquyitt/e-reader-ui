import {
  ArrayInput,
  CreateBase,
  DateInput,
  NumberInput,
  ReferenceArrayInput,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  SimpleFormIterator,
  TextInput,
} from "react-admin";

export const CreatePrice = () => (
  <CreateBase>
    <SimpleForm>
      <NumberInput source="amount" label="Amount" />

      <ReferenceInput source="planId" />
      <NumberInput source="duration" />
      <DateInput source="effectiveDate" />
      <SelectInput
        source="durationUnit"
        choices={[
          { id: "DAY", name: "DAY" },
          { id: "YEAR", name: "YEAR" },
        ]}
      />
      <ArrayInput source="metadata" label="Metadata">
        <SimpleFormIterator>
          <TextInput source="key" label="Key" />
          <TextInput source="value" label="Value" />
        </SimpleFormIterator>
      </ArrayInput>
      <ArrayInput source="features" label="Features">
        <SimpleFormIterator>
          <TextInput />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </CreateBase>
);
