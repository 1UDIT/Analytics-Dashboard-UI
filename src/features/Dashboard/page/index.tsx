import KpiCard from "@/components/ui/KpiCard";
import BarChart from "@/components/ui/BarChart";
import { Users, DollarSign, ShoppingCart, RotateCcw } from "lucide-react";
import { useMemo, useState } from "react";
import PieChart from "@/components/ui/PieChart";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import FileFolderTree from "@/components/ui/FileFolderTree";
import { fetchData } from "../api";





export default function Index() {
  const [monthsToShow, setMonthsToShow] = useState<number | "all">(5);
  const userName = sessionStorage.getItem("userName")
  const userRole = sessionStorage.getItem("role")
  const queryClient = useQueryClient();
  const [datasetId, setDatasetId] = useState(
    () => sessionStorage.getItem("datasetId")
  );


  const { data: dataset } = useQuery({
    queryKey: ["dataset", datasetId],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:8000/analytics/data/${datasetId}`
      );
      return res.json();
    },
    enabled: !!datasetId,
  });

  const deleteMutation = useMutation({
    mutationFn: async ({
      datasetId,
      username,
      role,
    }: {
      datasetId: string;
      username: string;
      role: string;
    }) => {
      const res = await fetch(
        `http://localhost:8000/analytics/delete/${datasetId}?username=${username}&role=${role}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to delete");
      }

      return res.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dataFolder"] });
    },
  });



  const handleDelete = (file: any) => {
    if (!confirm("Are you sure you want to delete this file?")) return;

    deleteMutation.mutate({
      datasetId: file._id,
      username: file.username,
      role: file.role,
    });
  };

  const dataFolder = useQuery({
    queryKey: ["dataFolder", userName, userRole],
    queryFn: ({ signal }) =>
      fetchData(
        `http://localhost:8000/login/files?username=${userName}&role=${userRole}`,
        "GET",
        undefined,
        signal
      ),
    enabled: !!userName && !!userRole,
    networkMode: "always",
    retry: false,
    refetchOnWindowFocus: false,
  });


  // const visibleData = useMemo(() => {
  //   if (monthsToShow === "all") return monthlyData;
  //   return monthlyData.slice(-monthsToShow);
  // }, [monthlyData, monthsToShow]);

  const onOpen = (file: any) => {
    if (!confirm("Are you sure you want to open this file?")) return;
    
    sessionStorage.setItem("datasetId", file._id);
    setDatasetId(file._id);
  };

  console.log(dataset, "data")

  return (
    <>
      {dataset ? (
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
              value={dataset.total_revenue}
              suffix=" M"
              prefix="$"
              change={0.5}
              icon={<DollarSign size={18} />}
            />

            <KpiCard
              title="Total Orders"
              value={dataset.total_orders}
              suffix=" M"
              change={-0.2}
              icon={<ShoppingCart size={18} />}
            />

            <KpiCard
              title="Total Order"
              value={dataset.total_orders}
              change={0.12}
              icon={<RotateCcw size={18} />}
            />
          </div>
          <div className="my-8">
            <div className="bg-white rounded-2xl shadow-sm p-6 border-slate-400 border-2">
              <h2 className="text-lg font-semibold mb-4">Product Sales</h2>

              <div className="h-99">
                <BarChart data={dataset.monthly_sales} setMonthsToShow={setMonthsToShow} monthsToShow={monthsToShow} />
              </div>
            </div>
          </div>
          <div className="my-8">
            <div className="flex flex-row gap-6">
              <div className="bg-white rounded-2xl shadow-sm p-6 border-slate-400 border-2 ">
                <h2 className="text-lg font-semibold mb-4">Revenue Distribution</h2>
                <div className="h-70">
                  <PieChart data={dataset.top_products} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-10 items-center flex justify-center h-full">
          {dataFolder?.data?.length >= 1 ? <FileFolderTree data={dataFolder?.data} onDelete={handleDelete} onOpen={onOpen} /> : "No data available"}
        </div>
      )}
    </>
  )
}
