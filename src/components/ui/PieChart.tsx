import React from "react";

type PieData = {
  label: string;
  value: number;
  color: string;
};

type PieChartProps = {
  data: PieData[];
  size?: number;
};

const PieChart: React.FC<PieChartProps> = ({ data, size = 250 }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  let cumulativePercent = 0;

  const getCoordinatesForPercent = (percent: number) => {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-8">
      <svg
        viewBox="-1 -1 2 2"
        style={{ width: size, height: size }}
        className="rotate-[-90deg]"
      >
        {data.map((slice, index) => {
          const percent = slice.value / total;
          const [startX, startY] = getCoordinatesForPercent(cumulativePercent);
          cumulativePercent += percent;
          const [endX, endY] = getCoordinatesForPercent(cumulativePercent);

          const largeArcFlag = percent > 0.5 ? 1 : 0;

          const pathData = `
            M ${startX} ${startY}
            A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}
            L 0 0
          `;

          return (
            <path
              key={index}
              d={pathData}
              fill={slice.color}
              className="transition-all duration-300 hover:opacity-80 cursor-pointer"
            />
          );
        })}
      </svg>

      {/* Legend */}
      <div className="space-y-2">
        {data.map((item, index) => {
          const percent = ((item.value / total) * 100).toFixed(1);
          return (
            <div key={index} className="flex items-center gap-3 text-sm">
              <div
                className="w-4 h-4 rounded-sm"
                style={{ backgroundColor: item.color }}
              />
              <span className="font-medium">{item.label}</span>
              <span className="text-gray-500">{percent}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PieChart;