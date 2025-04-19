import { QueryStateAction } from "@/types";
import { createContext, useContext } from "react";

export type QueryStateContextShape = {
  isLoading: boolean;
  dispatch: (data: QueryStateAction) => void;
};

export const QueryStateContext = createContext<QueryStateContextShape>({
  isLoading: false,
  dispatch: () => {},
});

export function useQueryStateUpdate() {
  const context = useContext(QueryStateContext);
  if (!context) {
    throw new Error(
      "useQueryStateUpdate was called outside proper context provider"
    );
  }
  return context;
}
