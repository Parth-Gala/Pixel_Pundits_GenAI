import React, { useEffect } from "react";
import { FaFire } from "react-icons/fa";
import { CiApple } from "react-icons/ci";
import useFetch from "../hooks/useFetch";
import Cookies from "js-cookie";
import DashboardCard from "../components/DashboardCard.jsx";
const Dashboard = () => {
  const datainfo = JSON.parse(localStorage.getItem("userinfo"));
  // console.log(datainfo.personalInformation);
  // const { data, loading, error, reFetch } = useFetch(`http://localhost:5000/api/users/${datainfo.username}`);

  return (
    <div
      className="w-full h-auto px-4 pt-1"
    >
      <div> 
        <div className=" bg-gray-100 rounded-2xl p-2">
          <div>

         
          <div className=" border-l-4 border-blue-400 m-2">
            <h3 className="px-4 pt-">Calories</h3>
            <h1 className="text-2xl font-semibold px-2" id="streak">
              <CiApple className=" inline text-blue-400" />1200<span className=" font-light text-sm"> kcal</span>
            </h1>
          </div>
          <div className=" border-l-4 border-orange-400 m-2">
            <h3 className="px-4 pt-">Streaks</h3>
            <h1 className="text-2xl font-semibold px-2" id="streak">
              <FaFire className=" inline text-orange-400" />1<span className=" font-light text-sm"> days</span>
            </h1>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
