import { useQuery } from "@tanstack/react-query";
import { optionUseQuery } from "utils/common";
import { getProductDetailAPI } from "./request";

export const useGetProductDetailUS = (id, option) => {
  return useQuery({
    queryKey: ["GetDetailProductAPI"],
    queryFn: () => getProductDetailAPI(id),
    optionUseQuery,
    ...option,
  });
};
