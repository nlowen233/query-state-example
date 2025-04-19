"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { cn } from "@/lib/utils";
import { TimeSeriesEntry } from "@/types";
import { COMPARISON_COLORS } from "@/constants";
import { use } from "react";
import { useQueryStateUpdate } from "../QueryStateProvider/QueryStateContext";
import { getAllAprilDates } from "@/utils";

export function TimeSeriesChart({
  timeSeriesPromise,
  isError,
  isSkeleton,
}: {
  timeSeriesPromise?: Promise<TimeSeriesEntry[]>;
  isSkeleton?: boolean;
  isError?: boolean;
}) {
  const { isLoading } = useQueryStateUpdate();
  const data = !isSkeleton
    ? timeSeriesPromise
      ? use(timeSeriesPromise)
      : undefined
    : getAllAprilDates().map((d) => ({
        time: d,
        skeleton: Math.floor(Math.random() * 10),
      }));
  return (
    <>
      {isError && (
        <span className="text-red-500">
          There was an error loading your chart
        </span>
      )}
      <ResponsiveContainer
        width="100%"
        height={300}
        className={cn({ "animate-pulse": isSkeleton || isLoading })}
      >
        <LineChart
          margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
          data={data}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" vertical={false} />
          <XAxis
            dataKey="time"
            minTickGap={20}
            tick={({ x, y, payload }) => {
              const originalDate = new Date(payload.value);
              const adjustedDate = new Date(originalDate);
              adjustedDate.setDate(adjustedDate.getDate() + 1);

              const dateStr = adjustedDate.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
              });

              return (
                <text
                  x={x}
                  y={y + 10}
                  fontSize={10}
                  textAnchor="middle"
                  fill="#666"
                >
                  {dateStr}
                </text>
              );
            }}
          />
          <YAxis
            width={20}
            domain={[0, 10]}
            tick={{ fontSize: 10, fill: "#666" }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (!active || !payload || payload.length === 0) return null;

              const [year, month, day] = label.split("-").map(Number);
              const date = new Date(year, month - 1, day).toLocaleDateString(
                "en-GB",
                {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }
              );

              return (
                <div className="bg-white border border-gray-300 rounded-lg p-3 text-sm shadow-md">
                  <strong className="block mb-2">{date}</strong>
                  {payload.map(({ name, value, color }) => (
                    <div key={name} className="mb-1" style={{ color }}>
                      {capitalize(name?.toString())}: <strong>{value}</strong>
                    </div>
                  ))}
                </div>
              );
            }}
          />
          {data?.length &&
            (isSkeleton
              ? [
                  <Line
                    key="skeleton"
                    type="monotone"
                    dataKey="skeleton"
                    stroke="#ccc"
                    strokeWidth={2}
                    dot={false}
                    isAnimationActive={false}
                  />,
                ]
              : Object.keys(data[0])
                  .filter((key) => key !== "time")
                  .map((key, i) => (
                    <Line
                      key={key}
                      type="monotone"
                      dataKey={key}
                      stroke={COMPARISON_COLORS[i]}
                      strokeWidth={2}
                      dot={false}
                    />
                  )))}
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}

function capitalize(str?: string) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}
