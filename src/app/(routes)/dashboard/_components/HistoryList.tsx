import React from "react";

const HistoryList = () => {
  return (
    <div>
      <ul className="p-4 space-y-2">
        <li className="hover:bg-gray-700 p-2 cursor-pointer">Home</li>
        <li className="hover:bg-gray-700 p-2 cursor-pointer">Profile</li>
        <li className="hover:bg-gray-700 p-2 cursor-pointer">Settings</li>
      </ul>
    </div>
  );
};

export default HistoryList;
