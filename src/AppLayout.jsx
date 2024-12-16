import { Layout } from "react-admin";
import { AppMenu } from "./AppMenu";

export const AppLayout = ({ children }) => (
  <Layout menu={AppMenu}>{children}</Layout>
);
