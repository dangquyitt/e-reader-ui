import { CollectionCreate } from "./create";
import { CollectionList } from "./list";
import CollectionsIcon from "@mui/icons-material/Collections";
export const collectionResource = {
  name: "collections",
  list: CollectionList,
  create: CollectionCreate,
  icon: CollectionsIcon,
};
