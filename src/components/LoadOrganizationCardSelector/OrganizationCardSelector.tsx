"use client";

import { Organization, QueryStringState } from "@/types";
import { OrganizationCard } from "../OrganizationCard";
import { Button } from "../ui/button";
import { use, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useQueryStateUpdate } from "../QueryStateProvider/QueryStateContext";
import { cx } from "class-variance-authority";
import { MdAdd, MdDelete } from "react-icons/md";

export function OrganizationCardSelector({
  organizationsPromise,
  isError,
  isSkeleton,
  queryState,
}: {
  organizationsPromise?: Promise<Organization[]>;
  isSkeleton?: boolean;
  isError?: boolean;
  queryState?: QueryStringState;
}) {
  const [open, setOpen] = useState(false);
  const { dispatch, isLoading } = useQueryStateUpdate();
  const allOrganizations = organizationsPromise
    ? use(organizationsPromise)
    : undefined;
  const unaddedOrgs = allOrganizations?.filter(
    (org) =>
      !queryState?.organizations?.some(
        (_org) => _org.organizationName === org.name
      )
  );
  const cannotAdd =
    allOrganizations?.length === queryState?.organizations?.length;
  const _isLoading = isSkeleton || isLoading;
  return (
    <>
      {isError && (
        <span className="text-red-500">
          There was an error loading this component, please refresh
        </span>
      )}
      <div className="flex gap-2 flex-wrap">
        {queryState?.organizations?.map((q, i) => (
          <OrganizationCard
            index={i}
            node={q}
            isLoading={_isLoading}
            key={q.organizationName}
          />
        ))}
        <div>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant={"ghost"}
                disabled={cannotAdd || _isLoading}
                className={cx({ "animate-pulse": _isLoading })}
              >
                <span>Add Organization</span>
                <MdAdd />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <>
                {unaddedOrgs?.map((org) => (
                  <div key={org.name}>
                    <Button
                      className={cx({
                        "animate-pulse": _isLoading,
                      })}
                      variant={"ghost"}
                      disabled={_isLoading}
                      onClick={() => {
                        dispatch({
                          type: "add",
                          payload: { organizationName: org.name },
                        });
                        setOpen(false);
                      }}
                    >
                      <span> Add {org.name}</span>
                      <MdAdd />
                    </Button>
                  </div>
                ))}
              </>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </>
  );
}
