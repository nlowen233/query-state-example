import { LoadOrganizationCardSelector } from "@/components/LoadOrganizationCardSelector/LoadOrganizationCardSelector";
import { LoadTimeSeriesChart } from "@/components/LoadTimeSeriesChart/LoadTimeSeriesChart";
import { QueryStateDataParam } from "@/types";
import { getQueryState } from "@/utils";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    [QueryStateDataParam.Data]: string;
  }>;
}) {
  const { data } = await searchParams;
  const queryState = getQueryState(data);
  return (
    <div className="p-4 space-y-4">
      <h1>Pen Sales From Leading Pen Manufacturers this Month</h1>
      <LoadOrganizationCardSelector queryState={queryState} />
      <LoadTimeSeriesChart queryState={queryState} />
    </div>
  );
}
