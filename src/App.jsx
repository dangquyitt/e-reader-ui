import {
  Admin,
  CustomRoutes,
  ListGuesser,
  Resource,
  ShowGuesser,
} from "react-admin";
import Login from "./pages/login/Login";
import { bookResource } from "./resource/book";
import dataProvider from "./resource/dataProvider";
import authProvider from "./resource/authProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Route } from "react-router-dom";
import Register from "./pages/Register/Register";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import EmailVerification from "./pages/EmailVerification/EmailVerification";
import Reader from "./pages/Reader/Reader";

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

      {/* Start add the public routes */}
      <CustomRoutes noLayout>
        <Route path="/register" element={<Register />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/emailVerification" element={<EmailVerification />} />
      </CustomRoutes>
      {/* End add the public routes*/}

      {/* Start add the private routes */}
      <CustomRoutes noLayout>
        <Route path="/reader" element={<Reader />} />
      </CustomRoutes>
      {/* End add the private routes */}
    </Admin>
  </GoogleOAuthProvider>
);

export default App;
