import { useContext } from "react";

import { cacheContext } from "./cacheContext";

export const useAppCache = () => {
  const cache = useContext(cacheContext);
  return cache;
};
