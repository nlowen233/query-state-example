"use client";

import { COLORS, COMPARISON_COLORS, QUALITIES, SIZES } from "@/constants";
import { ComparisonNode, Organization } from "@/types";
import { cx } from "class-variance-authority";
import { MdDelete } from "react-icons/md";
import { Button } from "./ui/button";
import { capitalize } from "@/utils";
import { useQueryStateUpdate } from "./QueryStateProvider/QueryStateContext";
import { FaChevronDown } from "react-icons/fa";
import { useState } from "react";

export function OrganizationCard({
  node,
  index,
  isLoading,
}: {
  node: ComparisonNode;
  index: number;
  isLoading?: boolean;
}) {
  const { dispatch } = useQueryStateUpdate();
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cx(
        "border border-gray-100 rounded-lg shadow-md p-4 overflow-hidden transition-all duration-200",
        {
          "animate-pulse": isLoading,
          "h-16": !open,
          "h-[17.5rem]": open,
        }
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex gap-x-2 items-center">
          <div
            className="p-2 rounded-full"
            style={{ backgroundColor: COMPARISON_COLORS[index] || "black" }}
          />
          <h3>{node.organizationName}</h3>
          <Button
            variant={"ghost"}
            onClick={() =>
              dispatch({
                type: "remove",
                payload: { organizationName: node.organizationName },
              })
            }
            disabled={isLoading}
          >
            <MdDelete className="text-red-900" />
          </Button>
        </div>
        <Button variant={"ghost"} onClick={() => setOpen((b) => !b)}>
          <FaChevronDown
            className={cx({
              "rotate-180 transition duration-100": open,
            })}
          />
        </Button>
      </div>
      <div className="p-4">
        <div>
          <h4>Size</h4>
          <div className="gap-2 flex flex-wrap">
            {SIZES.map((size) => (
              <Button
                key={size}
                variant={node.size === size ? "default" : "ghost"}
                disabled={isLoading}
                onClick={() =>
                  dispatch({
                    type: "choose-filter",
                    payload: {
                      filterType: "size",
                      value: size,
                      organizationName: node.organizationName,
                    },
                  })
                }
              >
                {capitalize(size)}
              </Button>
            ))}
          </div>
        </div>
        <div>
          <h4>Color</h4>
          <div className="gap-2 flex flex-wrap">
            {COLORS.map((col) => (
              <Button
                key={col}
                variant={node.color === col ? "default" : "ghost"}
                disabled={isLoading}
                onClick={() =>
                  dispatch({
                    type: "choose-filter",
                    payload: {
                      filterType: "color",
                      value: col,
                      organizationName: node.organizationName,
                    },
                  })
                }
              >
                {capitalize(col)}
              </Button>
            ))}
          </div>
        </div>
        <div>
          <h4>Quality</h4>
          <div className="gap-2 flex flex-wrap">
            {QUALITIES.map((qual) => (
              <Button
                variant={node.quality === qual ? "default" : "ghost"}
                key={qual}
                disabled={isLoading}
                onClick={() =>
                  dispatch({
                    type: "choose-filter",
                    payload: {
                      filterType: "quality",
                      value: qual,
                      organizationName: node.organizationName,
                    },
                  })
                }
              >
                {capitalize(qual)}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
