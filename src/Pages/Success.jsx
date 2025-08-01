import React from "react";
import bgReg from "../assets/bgReg.png";
import { useNavigate } from "react-router-dom";
const Success = () => {
  const navigate = useNavigate();
  return (
    <div
      className="min-h-screen flex items-center w-full justify-center "
      style={{
        backgroundImage: `url(${bgReg})`,
        backgroundSize: "cover",
      }}
    >
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-lg border-t-4 border-green-700 flex flex-col items-center justify-center p-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-center mb-4 text-black">
          THANK YOU!
        </h1>
        <p className="text-center text-gray-700 mb-4">
          Your Registration Has Been Submitted Successfully
          <br />
          <span className="text-sm text-gray-500">
            A Confirmation Email With Your Event Details Will Be Sent To You
            Shortly. Please Check Your Inbox (and Spam folder).
          </span>
        </p>
        <button
          className="bg-green-700 text-white px-6 py-2 rounded font-bold mt-2"
          onClick={() => navigate("/")}
        >
          Return to Homepage
        </button>
      </div>
    </div>
  );
};

export default Success;
