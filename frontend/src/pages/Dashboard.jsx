import React, { useEffect } from "react";
import useFetch from "../hooks/useFetch";
import Cookies from "js-cookie";
import DashboardCard from "../components/DashboardCard.jsx";
const Dashboard = () => {
  const datainfo = JSON.parse(localStorage.getItem("userinfo"));
  console.log(datainfo.personalInformation);
  // const { data, loading, error, reFetch } = useFetch(`http://localhost:5000/api/users/${datainfo.username}`);

  return (
    <div>
      <div>
        <div className=" bg-gray-100 ">

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
