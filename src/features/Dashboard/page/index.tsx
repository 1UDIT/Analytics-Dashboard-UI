import KpiCard from "@/components/ui/KpiCard";
import BarChart from "@/components/ui/BarChart";
import { Users, DollarSign, ShoppingCart, RotateCcw } from "lucide-react";
import { useMemo, useState } from "react";
import PieChart from "@/components/ui/PieChart";
import { useQuery } from "@tanstack/react-query";

const monthlyData = [
  { Month: "Jan", Revenue: 160000, GrossMargin: 40000 },
  { Month: "Feb", Revenue: 29000, GrossMargin: 8000 },
  { Month: "Mar", Revenue: 130000, GrossMargin: 35000 },
];

const pieData = [
  { label: "Marketing", value: 400, color: "#22c55e" },
  { label: "Sales", value: 300, color: "#3b82f6" },
  { label: "Development", value: 200, color: "#f59e0b" },
  { label: "Support", value: 100, color: "#ef4444" },
];

export default function Index() {
  const [monthsToShow, setMonthsToShow] = useState<number | "all">(5);

  const { data } = useQuery({
    queryKey: ["uploadedData"],
    queryFn: () => Promise.resolve(null), // won't run if cache exists
    enabled: false,
  });

  console.log(data);

  const visibleData = useMemo(() => {
    if (monthsToShow === "all") return monthlyData;
    return monthlyData.slice(-monthsToShow);
  }, [monthlyData, monthsToShow]);

  return (
    <>
      {data ? (
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <KpiCard
              title="Total Customers"
              value="567,899"
              change={2.5}
              icon={<Users size={18} />}
            />

            <KpiCard
              title="Total Revenue"
              value="3,465"
              suffix=" M"
              prefix="$"
              change={0.5}
              icon={<DollarSign size={18} />}
            />

            <KpiCard
              title="Total Orders"
              value="1,136"
              suffix=" M"
              change={-0.2}
              icon={<ShoppingCart size={18} />}
            />

            <KpiCard
              title="Total Returns"
              value="1,789"
              change={0.12}
              icon={<RotateCcw size={18} />}
            />
          </div>
          <div className="my-8">
            <div className="bg-white rounded-2xl shadow-sm p-6 border-slate-400 border-2">
              <h2 className="text-lg font-semibold mb-4">Product Sales</h2>

              <div className="h-99">
                <BarChart data={visibleData} setMonthsToShow={setMonthsToShow} monthsToShow={monthsToShow} />
              </div>
            </div>
          </div>
          <div className="my-8">
            <div className="flex flex-row gap-6">
              <div className="bg-white rounded-2xl shadow-sm p-6 border-slate-400 border-2 ">
                <h2 className="text-lg font-semibold mb-4">Revenue Distribution</h2>
                <div className="h-70">
                  <PieChart data={pieData} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>No data available</p>
      )}
    </>
  )
}
