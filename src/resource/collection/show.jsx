import {
  Show,
  TabbedShowLayout,
  useShowController,
  Toolbar,
  SaveButton,
  useNotify,
  useRefresh,
  TextField,
} from "react-admin";
import React, { useState, useEffect } from "react";
import { useDataProvider } from "react-admin";
const CustomToolbar = (props) => (
  <Toolbar {...props}>
    <SaveButton />
  </Toolbar>
);

export const CollectionShow = (props) => {
  const notify = useNotify();
  const { record } = useShowController();
  const dataProvider = useDataProvider();
  const refresh = useRefresh();

  return (
    <Show>
      <TabbedShowLayout>
        <TabbedShowLayout.Tab label="Collection">
          <TextField source="name" />
        </TabbedShowLayout.Tab>
      </TabbedShowLayout>
    </Show>
  );
};
