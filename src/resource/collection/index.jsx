import { CollectionCreate } from "./create";
import { CollectionList } from "./list";
import CollectionsIcon from "@mui/icons-material/Collections";
import { CollectionShow } from "./show";
export const collectionResource = {
  name: "collections",
  list: CollectionList,
  create: CollectionCreate,
  show: CollectionShow,
  icon: CollectionsIcon,
};
