
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

function AdminRoute({ children }) {

  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {

    checkAdmin();

  }, []);

  const checkAdmin = async () => {

    try {

      const response = await API.get("/current-user/");

      setIsAdmin(response.data.is_staff);

    } catch {

      setIsAdmin(false);

    }

    setLoading(false);
  };

  if (loading) {

    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  }

  if (!isAdmin) {

    return <Navigate to="/dashboard" />;

  }

  return children;
}

export default AdminRoute;

