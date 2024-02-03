import React, { useEffect } from "react";
import useFetch from "../hooks/useFetch";
import Cookies from "js-cookie";
import DashboardCard from "../components/DashboardCard.jsx";
const Dashboard = () => {
  const username = Cookies.get("username");
  const { data, loading, error, reFetch } = useFetch(`http://localhost:5000/api/users/${username}`); // Replace "/api/getuser" with the actual endpoint URL
  useEffect(() => {
    // Call the reFetch function when needed (e.g., when the component mounts)
    reFetch();
  }, []);

  return (
    <div>
      { loading ? (
        "Loading..."
      ):(
        <div>
            <h2 className="text-3xl font-bold mb-6">User Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <DashboardCard title="Username" value={data.username} icon="👤" />
              <DashboardCard title="Email" value={data.email} icon="📧" />
              <DashboardCard title="Height" value={data.personalInformation.height} icon="📏" />
              <DashboardCard title="Weight" value={data.personalInformation.weight} icon="⚖️" />
          <div key={data.id}>
          <h2>User Data</h2>
          <p>Username: {data.username}</p>
          <p>Email: {data.email}</p>
          <p>personal info height: {data.personalInformation.height}</p>
          </div>
            </div>
        </div>
        )}
    </div>
  );
};

export default Dashboard;
