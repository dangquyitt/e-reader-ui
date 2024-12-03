import { Admin, Resource, ListGuesser, ShowGuesser } from "react-admin";
import authProvider from "../authProvider";
import dataProvider from "../dataProvider";

const App = () => (
  <Admin dataProvider={dataProvider} authProvider={authProvider} requireAuth>
    <Resource name="books" list={ListGuesser} show={ShowGuesser} />
    <Resource name="roles" list={ListGuesser} show={ShowGuesser} />
  </Admin>
);

export default App;
