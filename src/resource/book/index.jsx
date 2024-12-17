import { BookCreate } from "./create";
import { BookList } from "./list";
import { BookShow } from "./show";
import { BookEdit } from "./edit";

export const bookResource = {
  name: "books",
  list: BookList,
  show: BookShow,
  edit: BookEdit,
  create: BookCreate,
};
