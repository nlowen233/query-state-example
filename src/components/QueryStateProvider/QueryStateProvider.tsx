"use client";

import {
  QueryStateAction,
  QueryStateDataParam,
  QueryStringState,
} from "@/types";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import { QueryStateContext } from "./QueryStateContext";
import { queryStateReducer } from "@/queryStateReducer";

const INIT: QueryStringState = {
  organizations: [],
};

export function QueryStateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, startTransition] = useTransition();

  function dispatch(action: QueryStateAction) {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const encodedStateString = urlParams.get(QueryStateDataParam.Data);
      const currentState = encodedStateString
        ? JSON.parse(atob(decodeURIComponent(encodedStateString)))
        : INIT;

      const mergedState = queryStateReducer(currentState, action);
      const newStringifiedState = JSON.stringify(mergedState);
      const base64Encoded = btoa(newStringifiedState);
      const urlEncoded = encodeURIComponent(base64Encoded);

      startTransition(() => {
        router.replace(
          `${pathname}?${QueryStateDataParam.Data}=${urlEncoded}`,
          { scroll: false }
        );
      });
    } catch (e) {
      console.error(`Error updating state: ${(e as Error).message}`);
    }
  }

  return (
    <QueryStateContext value={{ isLoading, dispatch }}>
      {children}
    </QueryStateContext>
  );
}
