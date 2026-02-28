import React from "react";

type MonthlyData = {
  Month: string;
  Revenue: number;
  GrossMargin: number;
};

type ChartProps = {
  data: MonthlyData[];
  setMonthsToShow: React.Dispatch<React.SetStateAction<number | "all">>;
  monthsToShow: number | "all";
};

const Chart: React.FC<ChartProps> = ({ data, setMonthsToShow,monthsToShow }) => {
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  

  const maxValue = Math.max(
    ...data.flatMap((d) => [d.Revenue, d.GrossMargin]),
    1
  );

  const steps = 5;
  const yAxisValues = Array.from({ length: steps + 1 }, (_, i) =>
    Math.round((maxValue / steps) * i)
  );

  return (
    <div className="bg-white"><div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-semibold">Revenue vs Gross Margin</h2>

      <select
        value={monthsToShow}
        onChange={(e) =>
          setMonthsToShow(
            e.target.value === "all" ? "all" : Number(e.target.value)
          )
        }
        className="border border-gray-300 rounded-lg px-3 py-1 text-sm"
      >
        <option value={1}>Last 1 Months</option>
        <option value={5}>Last 5 Months</option>
        <option value={6}>Last 6 Months</option>
        <option value={12}>Last 12 Months</option>
        <option value="all">All</option>
      </select>
    </div>

      <div className="flex  w-full overflow-x-auto ">

        {/* Y Axis */}
        <div className="flex flex-col justify-between h-52 sm:h-64 md:h-72 pr-4 text-xs text-gray-500">
          {yAxisValues.slice().reverse().map((value, index) => (
            <span key={index}>{value.toLocaleString()}</span>
          ))}
        </div>

        {/* Chart Section */}
        <div className="flex-1">

          {/* Chart Area */}
          <div className="relative h-52 sm:h-64 md:h-72">

            {/* Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between">
              {yAxisValues.map((_, index) => (
                <div
                  key={index}
                  className="border-t border-gray-200 w-full"
                />
              ))}
            </div>

            {/* Bars */}
            <div className="relative flex items-end h-full min-w-[500px]">
              {data.map((item, index) => {
                const revenueHeight =
                  (item.Revenue / maxValue) * 100;
                const marginHeight =
                  (item.GrossMargin / maxValue) * 100;

                return (
                  <div
                    key={index}
                    className="flex flex-col items-center flex-1"
                  >
                    <div className="flex items-end gap-2 h-full">

                      <div className="flex items-end gap-2 h-64">

                        <div
                          className="w-6 bg-green-500 rounded"
                          style={{ height: `${revenueHeight}%` }}
                        />

                        <div
                          className="w-6 bg-blue-500 rounded"
                          style={{ height: `${marginHeight}%` }}
                        />

                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* X Axis (Months BELOW grid) */}
          <div className="flex justify-between mt-2">
            {data.map((item, index) => (
              <span
                key={index}
                className="flex-1 text-center text-xs text-gray-600"
              >
                {item.Month}
              </span>
            ))}
          </div>

        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-6 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-sm" />
          Revenue
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-sm" />
          Gross Margin
        </div>
      </div>
    </div>
  );
};

export default Chart;


