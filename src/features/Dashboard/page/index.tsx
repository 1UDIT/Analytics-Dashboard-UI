import KpiCard from "@/components/ui/KpiCard";
import BarChart from "@/components/ui/BarChart";
import { Users, DollarSign, ShoppingCart, RotateCcw } from "lucide-react";
import { useState } from "react";
import PieChart from "@/components/ui/PieChart";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import FileFolderTree from "@/components/ui/FileFolderTree";
import { fetchData } from "../api";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store";
import { setDataset } from "@/store/slices/datasetSlice";
import { Alert } from "@/hooks/AlertDialog";



export default function Index() {
  const [monthsToShow, setMonthsToShow] = useState<number | "all">(5);
  const userName = sessionStorage.getItem("userName")
  const userRole = sessionStorage.getItem("role")
  const queryClient = useQueryClient();
  const Dispatch = useDispatch();
  const datasetId = useSelector((state: RootState) => state.dataset.datasetId);
  const API_URL = import.meta.env.VITE_API_URL;
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [actionType, setActionType] = useState<"open" | "delete" | null>(null);

  const { data: dataset } = useQuery({
    queryKey: ["dataset", datasetId],
    queryFn: async () => {
      const res = await fetch(
        `${API_URL}/api/v1/analytics/data/${datasetId}`
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
        `${API_URL}/api/v1/analytics/delete/${datasetId}?username=${username}&role=${role}`,
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



  const dataFolder = useQuery({
    queryKey: ["dataFolder", userName, userRole],
    queryFn: ({ signal }) =>
      fetchData(
        `${API_URL}/api/v1/auth/files?username=${userName}&role=${userRole}`,
        "GET",
        undefined,
        signal
      ),
    enabled: !!userName && !!userRole,
    networkMode: "always",
    retry: false,
    refetchOnWindowFocus: false,
  });

  const onOpen = (file: any) => {
    setSelectedFile(file);
    setActionType("open");
    setOpen(true);
  };

  const handleDelete = (file: any) => {
    setSelectedFile(file);
    setActionType("delete");
    setOpen(true);
  };

  const handleConfirm = () => {
    if (!selectedFile || !actionType) return;

    if (actionType === "open") {
      sessionStorage.setItem("datasetId", selectedFile._id);
      Dispatch(setDataset(selectedFile._id));
    }

    if (actionType === "delete") {
      deleteMutation.mutate({
        datasetId: selectedFile._id,
        username: selectedFile.username,
        role: selectedFile.role,
      });
    }

    setOpen(false);
  };

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

      <Alert
        open={open}
        setOpen={setOpen}
        handleConfirm={handleConfirm}
        description={
          actionType === "delete"
            ? `Are you sure you want to delete "${selectedFile?.name}"?`
            : `Open dataset "${selectedFile?.name}"?`
        }
        title={
          actionType === "delete" ? "Delete Dataset" : "Open Dataset"
        }
        actionType={actionType}
      />
    </>
  )
}
