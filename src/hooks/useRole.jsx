import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import API_BASE_URL from "../config/api";

const useRole = () => {
  const { user, loading } = useContext(AuthContext);
  const [role, setRole] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    if (!loading && user?.email) {
      setRoleLoading(true);
      fetch(`${API_BASE_URL}/users/role/${user.email}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            // If 401/403/404/500, throw to catch block to set default role
            throw new Error(`Role fetch error: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          setRole(data.role || "user"); // Fallback if role is missing in data
          setRoleLoading(false);
        })
        .catch((err) => {
          console.error("Role fetch failed, defaulting to user:", err);
          setRole("user"); // Default to user on error
          setRoleLoading(false);
        });
    } else if (!loading && !user) {
      setRole(null);
      setRoleLoading(false);
    }
  }, [user, loading]);

  return [role, roleLoading];
};

export default useRole;
