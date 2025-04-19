import { QueryStringState } from "@/types";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { TimeSeriesChart } from "./TimeSeriesChart";
import { API } from "@/API";

export function LoadTimeSeriesChart({
  queryState,
}: {
  queryState?: QueryStringState;
}) {
  const timeSeriesPromise = queryState
    ? API.getTimeSeriesData(queryState)
    : undefined;
  return (
    <ErrorBoundary fallback={<TimeSeriesChart isError />}>
      <Suspense fallback={<TimeSeriesChart isSkeleton />}>
        <TimeSeriesChart timeSeriesPromise={timeSeriesPromise} />
      </Suspense>
    </ErrorBoundary>
  );
}
