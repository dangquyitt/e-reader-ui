import { Admin, ListGuesser, Resource, ShowGuesser } from "react-admin";
import Login from "./pages/login/Login";
import { bookResource } from "./resource/book";
import dataProvider from "./resource/dataProvider";
import authProvider from "./resource/authProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";

const App = () => (
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <Admin
      loginPage={Login}
      dataProvider={dataProvider}
      authProvider={authProvider}
      requireAuth
    >
      <Resource {...bookResource} />
      <Resource name="roles" list={ListGuesser} show={ShowGuesser} />
    </Admin>
  </GoogleOAuthProvider>
);

export default App;
