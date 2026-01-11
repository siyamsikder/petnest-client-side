import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

const useRole = () => {
    const { user, loading } = useContext(AuthContext);
    const [role, setRole] = useState(null);
    const [roleLoading, setRoleLoading] = useState(true);

    useEffect(() => {
        if (!loading && user?.email) {
            setRoleLoading(true);
            fetch(`https://petnest-one.vercel.app/users/role/${user.email}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('access-token')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    setRole(data.role);
                    setRoleLoading(false);
                })
                .catch(() => {
                    setRole('user'); // Default to user on error
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
