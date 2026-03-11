import { Navigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
  role: string;
};

export default function RoleGuard({ children }: Props) {
  const user = sessionStorage.getItem("role");
 

  if (user !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}