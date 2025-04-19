import { ORGANIZATIONS, PENS } from "./constants";
import {
  ComparisonNode,
  Organization,
  Pen,
  QueryStringState,
  TimeSeriesEntry,
} from "./types";
import { getAllAprilDates, getRandomTimeInterval } from "./utils";

async function getAllOrganizations(): Promise<Organization[]> {
  return new Promise((res) =>
    setTimeout(() => res(ORGANIZATIONS), getRandomTimeInterval())
  );
}

async function getTimeSeriesData(
  queryState: QueryStringState
): Promise<TimeSeriesEntry[]> {
  return new Promise((res) =>
    setTimeout(() => {
      const selectedOrgs = ORGANIZATIONS.filter((org) =>
        queryState.organizations.some(
          (_org) => org.name === _org.organizationName
        )
      );

      const filteredPenSales = selectedOrgs.map((org) => {
        return {
          orgName: org.name,
          sales: org.penSales.filter((ps) => {
            const pen = PENS.find((pen) => pen.id === ps.penId) as Pen;
            const node = queryState.organizations.find(
              (node) => node.organizationName === org.name
            ) as ComparisonNode;

            const removeForSize = node.size && node.size === pen.size;
            const removeForColor = node.color && node.color === pen.color;
            const removeForQuality =
              node.quality && node.quality === pen.quality;

            return !(removeForSize || removeForQuality || removeForColor);
          }),
        };
      });

      const dateMap: Map<string, TimeSeriesEntry> = new Map();

      for (const date of getAllAprilDates()) {
        const entry: TimeSeriesEntry = { time: date };
        for (const org of selectedOrgs) {
          entry[org.name] = 0;
        }
        dateMap.set(date, entry);
      }

      for (const { orgName, sales } of filteredPenSales) {
        for (const sale of sales) {
          const entry = dateMap.get(sale.date);
          if (entry) {
            entry[orgName] = (entry[orgName] as number) + 1;
          }
        }
      }

      const timeSeries: TimeSeriesEntry[] = Array.from(dateMap.values());
      res(timeSeries);
    }, getRandomTimeInterval())
  );
}

export const API = {
  getAllOrganizations,
  getTimeSeriesData,
};
