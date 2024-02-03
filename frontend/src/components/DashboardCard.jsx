// DashboardCard.jsx

import React from "react";

const DashboardCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <span className="text-xl text-blue-500 mr-3">{icon}</span>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-gray-600">{value}</p>
    </div>
  );
};

export default DashboardCard;
