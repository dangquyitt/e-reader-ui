import { Admin, CustomRoutes, Resource } from "react-admin";
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
import BookShowLayout from "./pages/Reader/Reader";
import { AppLayout } from "./AppLayout";
import Pricing from "./pages/Pricing/Pricing";
import { favoriteResource } from "./resource/favorite";
import { collectionResource } from "./resource/collection";
import { userResource } from "./resource/user";
const App = () => (
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <Admin
      layout={AppLayout}
      loginPage={Login}
      dataProvider={dataProvider}
      authProvider={authProvider}
      requireAuth
    >
      <Resource {...bookResource} />
      <Resource {...favoriteResource} />
      <Resource {...collectionResource} />
      <Resource {...userResource} />

      {/* Start add the public routes */}
      <CustomRoutes noLayout>
        <Route path="/register" element={<Register />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/emailVerification" element={<EmailVerification />} />
        <Route path="/detail" element={<BookShowLayout />} />
      </CustomRoutes>
      {/* End add the public routes*/}

      {/* Start add the private routes */}
      <CustomRoutes>
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/reader" element={<Reader />} />
      </CustomRoutes>
      {/* End add the private routes */}
    </Admin>
  </GoogleOAuthProvider>
);

export default App;
