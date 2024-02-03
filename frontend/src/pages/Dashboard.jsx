import React, { useEffect } from "react";
import useFetch from "../hooks/useFetch";

const Dashboard = () => {
  const { data, loading, error, reFetch } = useFetch("http://localhost:5000/api/users/Parth"); // Replace "/api/getuser" with the actual endpoint URL

  useEffect(() => {
    // Call the reFetch function when needed (e.g., when the component mounts)
    reFetch();
  }, []);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <div>
          <h2>User Data</h2>
          <p>Username: {data.username}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
