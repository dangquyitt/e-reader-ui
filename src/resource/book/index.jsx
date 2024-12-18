import { BookCreate } from "./create";
import { BookList } from "./list";
import { BookShow } from "./show";
import { BookEdit } from "./edit";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
export const bookResource = {
  name: "books",
  list: BookList,
  show: BookShow,
  edit: BookEdit,
  create: BookCreate,
  icon: ImportContactsIcon,
};
