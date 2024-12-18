import { UserList } from "./list.jsx";
import { UserShow } from "./show.jsx";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
export const userResource = {
  name: "users",
  list: UserList,
  show: UserShow,
  icon: AccountCircleIcon,
};
