import { LoadOrganizationCardSelector } from "@/components/LoadOrganizationCardSelector/LoadOrganizationCardSelector";
import { LoadTimeSeriesChart } from "@/components/LoadTimeSeriesChart/LoadTimeSeriesChart";
import { QueryStateDataParam } from "@/types";
import { getQueryState } from "@/utils";
import Link from "next/link";

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
      <div className="flex items-center justify-between">
        <h1>Pen Sales From Leading Pen Manufacturers this Month</h1>
        <Link
          href={"https://nicholasrussellconsulting.com"}
          className="hover:underline hover:text-blue-400 text-blue-700 text-sm hidden md:block"
        >
          Who made this pretty site?
        </Link>
      </div>
      <LoadOrganizationCardSelector queryState={queryState} />
      <LoadTimeSeriesChart queryState={queryState} />
      <Link
        href={"https://nicholasrussellconsulting.com"}
        className="hover:underline hover:text-blue-400 text-blue-700 text-sm block md:hidden"
      >
        Who made this pretty site?
      </Link>
    </div>
  );
}
