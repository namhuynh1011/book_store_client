import { useQuery } from "@tanstack/react-query";
import {getCategoriesAPI, getProductsAPI} from "./request"
import {optionsUseQuery} from "utils/common";


export const useGetCategoriesUS = (option) => {
  return useQuery({
    queryKey: ["GetCategoriesAPI"],
    queryFn: () => getCategoriesAPI(),
    optionsUseQuery,
    ...option
  });
};

export const useGetProductsUS = (option) => {
  return useQuery({
    queryKey: ["getProductsAPI"],
    queryFn: () => getProductsAPI(),
    optionsUseQuery,
    ...option
  });
};
