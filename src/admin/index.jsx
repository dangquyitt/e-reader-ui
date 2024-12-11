import { Admin, Resource, ListGuesser, ShowGuesser } from "react-admin";
import authProvider from "../authProvider";
import dataProvider from "../dataProvider";
import { bookResource } from "../resource/book";

const App = () => (
  <Admin dataProvider={dataProvider} authProvider={authProvider} requireAuth>
    <Resource {...bookResource} />
    <Resource name="roles" list={ListGuesser} show={ShowGuesser} />
  </Admin>
);

export default App;
