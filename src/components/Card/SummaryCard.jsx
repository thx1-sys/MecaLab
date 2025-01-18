import React from "react";
import Points from "./Icons/Dots";

const SummaryCard = () => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md h-full flex flex-col justify-between items-start">
      <div className="flex justify-between items-start w-full">
        <div>
          <h2 className="text-lg font-bold">Resumen</h2>
          <p>Ultimos datos</p>
        </div>
        <button className="border border-[#0B192C] text-[#0B192C] fill-[#0B192C] w-12 h-12 rounded-lg flex items-center justify-center hover:shadow-xl hover:bg-[#0B192C] hover:text-white hover:fill-white transform transition duration-500">
          <Points />
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4 mt-4 w-full h-full">
        <div className="bg-gray-100 rounded-lg p-4 shadow-md h-full">
          <h3 className="text-md font-bold">Card 1</h3>
          <p>Card 1 content</p>
        </div>
        <div className="bg-gray-100 rounded-lg p-4 shadow-md h-full">
          <h3 className="text-md font-bold">Card 2</h3>
          <p>Card 2 content</p>
        </div>
        <div className="bg-gray-100 rounded-lg p-4 shadow-md h-full">
          <h3 className="text-md font-bold">Card 3</h3>
          <p>Card 3 content</p>
        </div>
        <div className="bg-gray-100 rounded-lg p-4 shadow-md h-full">
          <h3 className="text-md font-bold">Card 4</h3>
          <p>Card 4 content</p>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
