import React, { useEffect, PureComponent } from "react";
import { FaFire } from "react-icons/fa";
import { CiApple } from "react-icons/ci";
import useFetch from "../hooks/useFetch";
import Cookies from "js-cookie";
import DashboardCard from "../components/DashboardCard.jsx";
import { PieChart, Pie, Cell, Label } from "recharts";
import Lunch from "../assets/Lunch.png";
import Breakfast from "../assets/Breakfast.png";
import Snack from "../assets/Snack.png";
import { IoAddCircle } from "react-icons/io5";
// import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Dashboard = () => {
  const datainfo = JSON.parse(localStorage.getItem("userinfo"));
  console.log(datainfo);
  const data = [
    { name: "Category A", value: 100 },
    { name: "Category B", value: 60 * 2 },
  ];
  const COLORS = ["#8884d8", "#E99630"];
  const calories = 1200;
  return (
    <div className="w-full h-auto px-4 pt-1">
      <div>
        <div className=" bg-gray-100 rounded-2xl p-2 pb-0">
          <div className=" flex justify-between">
            <div>
              <div className=" border-l-4 border-blue-400 m-2">
                <h3 className="px-4 pt-">Calories</h3>
                <h1 className="text-2xl font-semibold px-2" id="streak">
                  <CiApple className=" inline text-blue-400" />
                  1200<span className=" font-light text-sm"> kcal</span>
                </h1>
              </div>
              <div className=" border-l-4 border-orange-400 m-2">
                <h3 className="px-4 pt-">Streaks</h3>
                <h1 className="text-2xl font-semibold px-2" id="streak">
                  <FaFire className=" inline text-orange-400" />1
                  <span className=" font-light text-sm"> days</span>
                </h1>
              </div>
            </div>

            <div className="">
              <PieChart width={150} height={160}>
                <Pie
                  data={data}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={60}
                  fill="#8884d8"
                  paddingAngle={5}
                  startAngle={-180}
                  endAngle={180}
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                  <Label value={`${calories}kcal left`} position="center" />
                </Pie>
              </PieChart>
            </div>
          </div>
          <div className=" flex justify-between mx-4 border-t-2">
            <div className=" flex-col ">
              <div className=" border-b-2 border-b-yellow-600">BMI</div>
              <div className=" font-light text-xs text-center">
                {datainfo.personalInformation.bmi}g
              </div>
            </div>
            <div className=" flex-col ">
              <div className=" border-b-2 border-b-pink-400">Weight</div>
              <div className=" font-light text-xs text-center">
                {datainfo.personalInformation.weight}Kg{" "}
              </div>
            </div>
            <div className=" flex-col ">
              <div className=" border-b-2 border-b-blue-400">BodyFat</div>
              <div className=" font-light text-xs text-center">
                {datainfo.personalInformation.bodyFat}
              </div>
            </div>
          </div>
        </div>
        <h2 className=" my-2 ">Meals today</h2>
        <div>
          <div className="box-content overflow-auto">
            <div className="flex gap-2 justify-between">
              {/* Card for Breakfast */}
              <div className="bg-orange-400 border-r-0 rounded-tr-full m-1 ">
                <div
                  className="flex flex-col justify-center align-middle items-start border-b-0 border-2 rounded-tr-2xl p-4"
                  key="breakfast"
                >
                  <div className="rounded-full h-full w-[60px] mb-2">
                    <img src={Breakfast} alt="Breakfast" className="h-full" />
                  </div>
                  <div className="text-gray-600 font-bold capitalize pl-3">
                    Breakfast
                  </div>
                  <div className="text-gray-600 pl-3">
                    Description for breakfast
                  </div>
                </div>
              </div>

              {/* Card for Lunch */}
              <div className="bg-violet-400 border-r-0 rounded-tr-full m-1 ">
                <div
                  className="flex flex-col justify-center align-middle items-start border-b-0 border-2 rounded-tr-2xl p-4 "
                  key="lunch"
                >
                  <div className=" rounded-full h-full w-[60px] mb-2 ">
                    <img src={Lunch} alt="Lunch" className="h-full" />
                  </div>
                  <div className="text-gray-600 font-bold capitalize pl-3">
                    Lunch
                  </div>
                  <div className="text-gray-600 pl-3">
                    Description for lunch
                  </div>
                </div>
              </div>

              <div className="bg-pink-400 border-r-0 rounded-tr-full m-1 relative ">
                <div
                  className="flex flex-col justify-center align-middle items-start border-b-0 border-r-0 border-2 rounded-tr-2xl p-2 overflow-hidden"
                  key="lunch"
                >
                  <div className=" rounded-full h-full w-[60px] mb-1 ">
                    <img src={Snack} alt="Lunch" className="h-full" />
                  </div>
                  <div className="text-gray-600 font-bold capitalize pl-3">
                    Lunch
                  </div>
                  <div className="text-gray-600 pl-3">
                    Description for lunch
                  </div>
                  <div className="absolute -bottom-1 right-10 rounded-full cursor-pointer">
                  <Link to={`/AddFood`}> <button className="text-white text-3xl" ><IoAddCircle /></button></Link>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};

export default Dashboard;
