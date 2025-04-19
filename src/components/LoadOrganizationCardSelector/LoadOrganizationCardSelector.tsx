import { API } from "@/API";
import { Suspense } from "react";
import { OrganizationCardSelector } from "./OrganizationCardSelector";
import { ErrorBoundary } from "react-error-boundary";
import { QueryStringState } from "@/types";

export function LoadOrganizationCardSelector({
  queryState,
}: {
  queryState?: QueryStringState;
}) {
  const organizationPromise = API.getAllOrganizations();
  return (
    <ErrorBoundary
      fallback={<OrganizationCardSelector isError queryState={queryState} />}
    >
      <Suspense
        fallback={
          <OrganizationCardSelector isSkeleton queryState={queryState} />
        }
      >
        <OrganizationCardSelector
          organizationsPromise={organizationPromise}
          queryState={queryState}
        />
      </Suspense>
    </ErrorBoundary>
  );
}
