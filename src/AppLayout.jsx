import { AppBar, Layout, Logout, UserMenu } from "react-admin";
import { Menu } from "react-admin";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import KeyIcon from "@mui/icons-material/Key";

const CustomAppBar = () => {
  return (
    <AppBar
      userMenu={
        <UserMenu>
          <Logout />
        </UserMenu>
      }
    />
  );
};

const AppMenu = () => (
  <Menu>
    <Menu.ResourceItems />
    <Menu.Item
      to="/pricing"
      primaryText="Pricing"
      leftIcon={<AttachMoneyIcon />}
    />
    <Menu.Item to="/reader" primaryText="Reader" leftIcon={<MenuBookIcon />} />
    <Menu.Item
      to="/changePassword"
      primaryText="Change password"
      leftIcon={<KeyIcon />}
    />
  </Menu>
);

export const AppLayout = ({ children }) => (
  <Layout appBar={CustomAppBar} menu={AppMenu}>
    {children}
  </Layout>
);
