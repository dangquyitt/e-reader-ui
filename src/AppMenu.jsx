import { Menu } from "react-admin";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MenuBookIcon from "@mui/icons-material/MenuBook";
export const AppMenu = () => (
  <Menu>
    <Menu.ResourceItems />
    <Menu.Item
      to="/pricing"
      primaryText="Pricing"
      leftIcon={<AttachMoneyIcon />}
    />
    <Menu.Item to="/reader" primaryText="Reader" leftIcon={<MenuBookIcon />} />
  </Menu>
);
