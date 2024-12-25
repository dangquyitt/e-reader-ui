import PriceChangeIcon from "@mui/icons-material/PriceChange";
import { PriceList } from "./list";
import { CreatePrice } from "./create";
export const priceResource = {
  name: "prices",
  list: PriceList,
  create: CreatePrice,
  icon: PriceChangeIcon,
};
