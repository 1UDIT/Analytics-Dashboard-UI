import { Navigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
  role: string;
};

export default function RoleGuard({ children, role }: Props) {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== role) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}