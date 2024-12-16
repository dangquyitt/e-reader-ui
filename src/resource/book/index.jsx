import { BookCreate } from "./create";
import { BookList } from "./list";
import { BookShow } from "./show";

export const bookResource = {
  name: "books",
  list: BookList,
  show: BookShow,
  create: BookCreate,
};
