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
      const url = new URL(window.location.href);
      const params = new URLSearchParams(url.search);
      const encodedStateString = params.get(QueryStateDataParam.Data);
      const currentState = encodedStateString
        ? JSON.parse(atob(decodeURIComponent(encodedStateString)))
        : INIT;

      const mergedState = queryStateReducer(currentState, action);
      const newStringifiedState = JSON.stringify(mergedState);
      const base64Encoded = btoa(newStringifiedState);
      const urlEncoded = encodeURIComponent(base64Encoded);

      params.set(QueryStateDataParam.Data, urlEncoded);

      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
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
