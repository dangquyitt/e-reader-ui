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
import BookShowLayout from "./pages/Reader/Reader";
import { AppLayout } from "./AppLayout";
import Pricing from "./pages/Pricing/Pricing";
import { favoriteResource } from "./resource/favorite";
import { collectionResource } from "./resource/collection";
import { commentResource } from "./resource/comment";
import { subscriptionResource } from "./resource/subscription";
import { tagResource } from "./resource/tag";
import { authorResource } from "./resource/author";
import { priceResource } from "./resource/price";
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
      <Resource {...tagResource} />
      <Resource {...priceResource} />
      <Resource {...tagResource} />
      <Resource {...subscriptionResource} />
      <Resource {...commentResource} />
      <Resource {...authorResource} />
      {/* <Resource {...userResource} /> */}

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
      </CustomRoutes>
      {/* End add the private routes */}
    </Admin>
  </GoogleOAuthProvider>
);

export default App;
