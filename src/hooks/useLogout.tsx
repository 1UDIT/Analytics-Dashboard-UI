import { useNavigate } from "react-router-dom"; 

export const useLogout = () => {
  const navigate = useNavigate();

  return () => {
    sessionStorage.clear();
    navigate("/", { replace: true });
  };
};